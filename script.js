let filmCount = 0;
let filmCC = [];

let firstdone = false;



// Need to clear form after submit
async function mainEvent() {
  
  const titleform = document.getElementById("titleForm");
  const apiCall = "https://imdb-api.com/en/API/Search/k_ljv5h5vz/";
  let currentFilmID = "";
  
  // Gets the names of the films from the form
  titleform.addEventListener("submit", async (x) => {
    x.preventDefault();
    console.log("Film added");
    const formData = new FormData(x.target); // get the data from the listener target
    const formProps = Object.fromEntries(formData); // Turn it into an object
    console.log(Object.values(formProps));
    filmCount++;


    // Gets the ID of the film
    getFilmTitle(apiCall + Object.values(formProps))
    .then(function(jsonData){
      console.log(jsonData);
      currentFilmID= JSON.stringify(jsonData.results[0]).substring(7,16);
      console.log("ID: " + currentFilmID);

      // Adds posters
      getPoster("https://imdb-api.com/en/API/Posters/k_ljv5h5vz/" + currentFilmID)
      .then(function(jsonData){
        const poster = JSON.stringify(jsonData.backdrops[0].link);
        if(firstdone){
          document.getElementById("secondpost").src = poster.slice(1, -1);
        } else {
          document.getElementById("firstpost").src = poster.slice(1, -1);
          
        }
      });
      cast(currentFilmID); 
       
    });


  });


  
}


    
async function getFilmTitle(name){
  let response = await fetch(name)
  return response.json();
}

async function getPoster(name){
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

    // Only calls intersect function if more than 2 films were added
    filmCC.push(matches);
    if(firstdone){
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