// 
/*
Need to add event listeners: I can add event listeners to the tableheaders, so when clicked
they show the elements in ascending or descending order of that property. 

Allow partial match search results for element names. 
    return all results for elements whose name contains the text at all.
      the order of the results will be displayed by:
        The sooner the substring is found in their name.
(can I get this to update automatically as the user types more?)
*/

let filteredElements = [];   
let lookUp = null; 
let inRange = [];
let rangeStart = document.querySelector('#startValue');
let rangeEnd = document.querySelector('#endValue');
let filterRangeBy = null;
let output = document.querySelector('.output');

document.addEventListener('DOMContentLoaded', function() {
  fetchElements();
});

async function fetchElements() {
  const res = await fetch("http://localhost:3000/elements");
    const elements = await res.json();
    return renderElements(elements);  
}

function renderElements(elements) { 
  const tableBody = document.querySelector('.tableBody');
  const headers = document.getElementsByClassName("tblHeader");

  elements.forEach(element => {
    const tr = document.createElement('tr');
    tr.setAttribute('class', 'rowData');
    tableBody.appendChild(tr);

    for(let i = 0; i < headers.length; i++){ 
      let td = document.createElement("td");
      let key = headers[i].getAttribute('id');
      tr.appendChild(td);
      td.innerHTML = element[`${key}`]; 
    }
  });
}

function filter(){ 
    let key = lookUp; 
    output.textContent = "";

      fetch(`http://localhost:3000/elements/`)
        .then((response) => response.json())
        .then((data) => {   
          let match = false;              
          for (let i =0; i < data.length; i++){
            if (data[i][`${key}`] == document.getElementById("searchText").value){   
              filteredElements.push(data[i]);               
              match = true;
            }         
          } 
          if(match===false){
            output.textContent = "No Match Found";
          } else {
          clearTable();
          
          renderElements(filteredElements); 
          filteredElements = []; 
          }
        });
      };

function clearTable() {
  const rows = document.getElementsByClassName('rowData');
  let size = rows.length;
  for(let i =0; i< size; i++){
    rows[0].remove();
  }
}

function seeAll() {
  clearTable(); 
  fetchElements();
}

function submitForm(event){
   event.preventDefault();
}

let filterOption = document.querySelector('#searchBy');
filterOption.addEventListener("change", function() {
  lookUp = document.querySelector('#searchBy').value;
});

let selectRangeType = document.querySelector('#rangeType');
filterOption.addEventListener("change", function() {
  filterRangeBy = document.querySelector('#rangeType').value;  
});

let tblHeaders = document.getElementsByClassName('tblHeader');
for(let i = 0; i < tblHeaders.length; i++){
  tblHeaders[i].addEventListener('click', function(){
    console.log(tblHeaders[i].getAttribute('id'));

    fetch(`http://localhost:3000/elements/`)
    .then((response) => response.json())
    .then((data) => {   
      // reorder elements by property
      // Need to find out how to compare letters in Javasccript.
    });
  })
}

var form=document.getElementById("filterForm");
form.addEventListener('submit', submitForm);

