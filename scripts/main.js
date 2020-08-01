console.log("Calling Pokemon API...");

const gridSize = 8; // Set Grid Size
let count = 0;
let compareArray = [];
let totalPokemonPairs = 0;
let pokemonColor = "yellow"; // Default pokemon Grid Color

const form = document.getElementById("IdName");

/* ==========================================================================
   Change pokemon color in grid when dropdown change
   ========================================================================== */
form.addEventListener("change", (submitEvent) => {
  submitEvent.preventDefault();
  pokemonColor = event.srcElement.value;
  let big = document.querySelector(".big");
  big.innerHTML = "";
  big.innerHTML = `<div class="container"></div>`;
  let container = document.querySelector(".container");
  container.innerHTML = "";
  setTimeout(() => {
    loadPokemons(pokemonColor);
  }, 1000);
});

function loadPokemons(color = "yellow") {
  axios
    .get(`https://pokeapi.co/api/v2/pokemon-color/${color}`)
    .then((response) => {
      let pokemonSpecies = response.data.pokemon_species;
      return pokemonSpecies;
    }) // Return all pokemon of specified color
    .then((species) => {
      let myPokemon = []; // Create Pokemon Object

      species.forEach((item) => {
        let pokemonArr = item.url.split("/");
        let pokemonID = pokemonArr[pokemonArr.length - 2]; //Select pokemon id from URL

        myPokemon.push({
          name: item.name,
          url: `https://pokeres.bastionbot.org/images/pokemon/${pokemonID}.png`,
          random: Math.random() * 100,
          id: pokemonID,
        });
      });

      return myPokemon.sort((a, b) => b.random - a.random);
    })

    // Pick out the first pokemons based on grid size
    .then((pokemonSorted) => {
      let myPokemonStarterGrid = [];

      pokemonSorted.forEach((pokemon, index) => {
        if (index < gridSize) {
          myPokemonStarterGrid.push(pokemon);
        }
      });
      return myPokemonStarterGrid;
    })

    // Double up the pokemon so there are 2 of a kind in each grid,
    // and randomize the random property again
    .then((starterGrid) => {
      let myPokemonCompleteGrid = [];
      let starterGrid2 = JSON.parse(JSON.stringify(starterGrid));
      myPokemonCompleteGrid = [].concat(starterGrid, starterGrid2);

      myPokemonCompleteGrid.forEach(
        (pokemon) => (pokemon.random = Math.random() * 100)
      );
      return myPokemonCompleteGrid;
    })

    .then((myPokemonTeam) => {
      let big = document.querySelector(".big");
      if (!big.firstChild) {
        big.innerHTML = `<div class="container"></div>`;
      }
      let container = document.querySelector(".container");
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
                // let deleteContainer = document.querySelector(".container");
                // deleteContainer.innerHTML = "";
                let deleteBig = document.querySelector(".big");
                deleteBig.innerHTML = "";
                deleteBig.innerHTML = `
                <div class="endImage animate__animated animate__zoomIn">
                <img src="../assets/ash.png" alt="" />
              </div>`;
                totalPokemonPairs = 0;
              }
            } else {
              compareArray = [];
              setTimeout(() => {
                a.style.opacity = 0;
              }, 500);
              setTimeout(() => {
                b.style.opacity = 0;
              }, 500);
            }
          }
        });
      });
    });
}

/* ==========================================================================
   Retrieve pokemon colours for dropdown
   ========================================================================== */
axios
  .get(`https://pokeapi.co/api/v2/pokemon-color/`)

  .then((response) => {
    console.log("response", response.data.results);
    return response.data.results;
  })

  .then((results) => {
    let options = document.getElementById("dropdown");
    options.innerHTML += `<option value=""></option>`;
    results.forEach((color, index) => {
      options.innerHTML += `<option value="${color.name}">${color.name}</option>`;
    });
  });

/* ==========================================================================
   Load initial pokemon grid
   ========================================================================== */
loadPokemons(pokemonColor);
