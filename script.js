let filmCount = 0;



let cclist1;
let cclist2;

let firstdone = false;



// Need to clear form after submit
async function mainEvent() {
  
  const titleform = document.getElementById("titleForm");
  const apiCall = "https://imdb-api.com/en/API/Search/k_ljv5h5vz/";
  
  // Gets the names of the films from the form
  titleform.addEventListener("submit", async (x) => {
    x.preventDefault();
    console.log("Film added");
    const formData = new FormData(x.target); // get the data from the listener target
    const formProps = Object.fromEntries(formData); // Turn it into an object
    console.log(Object.values(formProps));
    filmCount++;


    getFilmTitle(apiCall + Object.values(formProps))
    .then(function(jsonData){
      console.log(jsonData);
      let firstID= JSON.stringify(jsonData.results[0]).substring(7,16);
      console.log("ID: " + firstID);
      cclist1 = cast(firstID); 
       
    });
  });


  
}


    
async function getFilmTitle(name){
  let response = await fetch(name)
  return response.json();
}


/*
getFilmTitle(firstCall)
.then(function(jsonData){
  console.log(jsonData);
  let firstID= JSON.stringify(jsonData.results[0]).substring(7,16);
  console.log("ID: " + firstID);
  cclist1 = cast(firstID); 
   
})
.then(function(){
  getFilmTitle(secondCall)
  .then(function(jsonData){
  console.log(jsonData);
  let secondID= JSON.stringify(jsonData.results[0]).substring(7,16);
  console.log("ID: " + secondID);
  cclist2 = cast(secondID);
  
})

})

*/

function cast(filmID){
  let cast1 = "https://imdb-api.com/en/API/FullCast/k_ljv5h5vz/" + filmID;

  console.log("Cast: " + cast1);
  getFilmTitle(cast1)
  .then(function(jsonData){
    let regex = /name":"([a-zA-z ]* [a-zA-z ]*)/g;
    let response = JSON.stringify(jsonData);
    let matches = response.match(regex).map(x => x.replace('name":"',""));
    if(firstdone == false){
      document.getElementById("data").innerHTML = matches;
    } else{
      document.getElementById("dataa").innerHTML = matches;
      intersect();
    }
    firstdone = true;
    return matches;
    
  })
  
}

function removeDups(arr) {
  return arr.filter((item,
      index) => arr.indexOf(item) === index);
}

async function intersect() {

  const a = document.querySelector("#data").innerHTML;
  const b = document.querySelector("#dataa").innerHTML;

  const y = a.split(',');
  const z = b.split(',');

  const filteredArray = removeDups(y.filter(value => z.includes(value)));
  console.log("In Common: " + filteredArray);
  document.getElementById("h3").innerHTML = "People in common: " + filteredArray;
  document.getElementById("cloud").appendChild(document.createElement('img')).src = "https://quickchart.io/wordcloud?text=" + y + z;
}




document.addEventListener('DOMContentLoaded', async () => mainEvent());