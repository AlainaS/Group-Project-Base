let filmCount = 0;
let filmCC = [];

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



function cast(filmID){
  let cast1 = "https://imdb-api.com/en/API/FullCast/k_ljv5h5vz/" + filmID;

  console.log("Cast: " + cast1);
  getFilmTitle(cast1)
  .then(function(jsonData){
    let regex = /name":"([a-zA-z ]* [a-zA-z ]*)/g;
    let response = JSON.stringify(jsonData);
    let matches = response.match(regex).map(x => x.replace('name":"',""));
    if(firstdone == false){
      filmCC.push(matches);
    } else{
      filmCC.push(matches);
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

  const filteredArray = removeDups(a.filter(value => b.includes(value)));
  console.log("In Common: " + filteredArray);
  //document.getElementById("h3").innerHTML = "People in common: " + filteredArray;
  //document.getElementById("cloud").appendChild(document.createElement('img')).src = "https://quickchart.io/wordcloud?text=" + y + z;
}




document.addEventListener('DOMContentLoaded', async () => mainEvent());