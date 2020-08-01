console.log("Calling Pokemon API...");

// let myPokemonSorted = [];
const gridSize = 8;
let count = 0;
let compareArray = [];
let totalPokemonPairs = 0;
// let myPokemonStarterGrid = [];

const form = document.getElementById("IdName");
console.log(form);
``;
// let dropSelect = document.querySelector(".dropdown");
let pokemonColor = "yellow";

form.addEventListener("change", (submitEvent) => {
  submitEvent.preventDefault();

  pokemonColor = event.srcElement.value;

  console.log("color", pokemonColor);
  let container = document.querySelector(".container");

  container.innerHTML = "";
  console.log(container);

  setTimeout(() => {
    loadPokemons(pokemonColor);
  }, 1000);
});

function loadPokemons(color = "yellow") {
  axios
    .get(`https://pokeapi.co/api/v2/pokemon-color/${color}`)
    .then((response) => response.data.pokemon_species)
    .then((species) => {
      let myPokemon = [];

      species.forEach((item) => {
        let pokemonArr = item.url.split("/");
        let pokemonID = pokemonArr[pokemonArr.length - 2];

        myPokemon.push({
          name: item.name,
          url: `https://pokeres.bastionbot.org/images/pokemon/${pokemonID}.png`,
          random: Math.random() * 100,
          id: pokemonID,
        });
      });
      return myPokemon.sort((a, b) => b.random - a.random);
    })
    .then((pokemonSorted) => {
      let myPokemonStarterGrid = [];

      pokemonSorted.forEach((pokemon, index) => {
        if (index < gridSize) {
          myPokemonStarterGrid.push(pokemon);
        }
      });
      return myPokemonStarterGrid;
    })
    .then((starterGrid) => {
      let myPokemonCompleteGrid = [];
      let starterGrid2 = JSON.parse(JSON.stringify(starterGrid));
      myPokemonCompleteGrid = [].concat(starterGrid, starterGrid2);

      // console.log(myPokemonCompleteGrid);
      myPokemonCompleteGrid.forEach(
        (pokemon) => (pokemon.random = Math.random() * 100)
      );
      return myPokemonCompleteGrid;
    })
    .then((myPokemonTeam) => {
      // let big = document.querySelector(".big");
      let container = document.querySelector(".container");
      // if (container.innerHTML == null) {
      //   big.innerHTML = `<div class="container"></div>`;
      // }
      console.log(container);
      console.log(myPokemonTeam);
      myPokemonTeam.sort((a, b) => b.random - a.random);
      myPokemonTeam.forEach((pokemon, index) => {
        container.innerHTML += `
            <div class="box">
            <img
            class="pokemon-image"
            id="${index}"
              src=${pokemon.url}
              alt="pokemon image"
            />
          </div>
            `;
        // console.log(pokemon, index);
      });
      myPokemonTeam.forEach((pokemon, index) => {
        let arse = document.getElementById(index);
        let myOpacity = 0;
        arse.addEventListener("click", (event) => {
          if (arse.style.opacity != 1 && compareArray.length < 2) {
            compareArray.push(index);
            arse.style.opacity = 1;
          } else if (arse.style.opacity == 1) {
            arse.style.opacity = 0;
            count--;
          }
          console.log(compareArray.length, compareArray);

          if (compareArray.length === 2) {
            let a = document.getElementById(compareArray[0]);
            let aId = a.src
              .split("/")
              [a.src.split("/").length - 1].split(".")[0];
            console.log(aId);
            let b = document.getElementById(compareArray[1]);
            let bId = b.src
              .split("/")
              [b.src.split("/").length - 1].split(".")[0];
            console.log(bId);

            if (aId === bId) {
              // set to true
              a.setAttribute("pokemon", "true");
              b.setAttribute("pokemon", "true");
              compareArray = [];
              totalPokemonPairs++;
              if (totalPokemonPairs === 8) {
                let deleteContainer = document.querySelector(".container");
                deleteContainer.innerHTML = "";
                // let deleteBig = document.querySelector(".big");
                // deleteBig.innerHTML = "";
                totalPokemonPairs = 0;
              }
            } else {
              compareArray = [];
              setTimeout(() => {
                a.style.opacity = 0;
                console.log("holla");
              }, 500);
              setTimeout(() => {
                b.style.opacity = 0;
                console.log("holla");
              }, 500);
            }

            //compare both items
            //if match then set both to true
            //else set both to false
            //clear both items
          }
        });
      });
    });
}

axios
  .get(`https://pokeapi.co/api/v2/pokemon-color/`)
  .then((response) => {
    console.log("response", response.data.results);
    return response.data.results;
  })

  .then((results) => {
    let options = document.getElementById("dropdown");
    results.forEach((color, index) => {
      if (index === 0) {
        options.innerHTML += `<option value="${color.name}">${color.name}</option>`;
      } else {
        options.innerHTML += `<option value="${color.name}">${color.name}</option>`;
      }
    });
  });

loadPokemons(pokemonColor);
