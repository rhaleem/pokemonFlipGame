console.log("Calling Pokemon API...");

let myPokemon = [];
let myPokemonSorted = [];
const gridSize = 8;
let myPokemonStarterGrid = [];
let myPokemonCompleteGrid = [];


const form = document.querySelector(".pokeForm");
let pokemonColor = "yellow";



// form.addEventListener("submit", (submitEvent) => {
//     submitEvent.preventDefault();

//     pokemonColor = event.target.dropdown[event.target.dropdown.selectedIndex].value;

//     console.log("color", pokemonColor);
//     let container = document.querySelector(".container");
//     console.log(container.innerHTML);
//     container.innerHTML = '';
//     console.log(container);
//     loadPokemons(pokemonColor);
//     console.log("myPokemon", myPokemon);
//     console.log("myPokemonSorted", myPokemonSorted);
//     console.log("myPokemonStarterGrid", myPokemonStarterGrid);
//     console.log("myPokemonCompleteGrid", myPokemonCompleteGrid);

// });



function loadPokemons(color = "yellow") {
    axios
        .get(`https://pokeapi.co/api/v2/pokemon-color/${color}`)
        .then((response) => response.data.pokemon_species)
        .then((species) => {
            species.forEach(item => {
                let pokemonArr = item.url.split("/");
                let pokemonID = pokemonArr[pokemonArr.length - 2]
                // console.log(item.name, pokemonID);
                myPokemon.push({
                    name: item.name,
                    url: `https://pokeres.bastionbot.org/images/pokemon/${pokemonID}.png`,
                    random: Math.random() * 100
                })
            })
            return myPokemon.sort((a, b) => b.random - a.random);
        })
        .then((pokemonSorted) => {
            pokemonSorted.forEach((pokemon, index) => {
                if (index < gridSize) {
                    myPokemonStarterGrid.push(pokemon);
                }
            })
            return myPokemonStarterGrid;
        })
        .then((starterGrid) => {
            let starterGrid2 = JSON.parse(JSON.stringify(starterGrid));
            myPokemonCompleteGrid = [].concat(starterGrid, starterGrid2)

            // console.log(myPokemonCompleteGrid);
            myPokemonCompleteGrid.forEach((pokemon) => pokemon.random = Math.random() * 100);
            return myPokemonCompleteGrid;
        })
        .then((myPokemonTeam) => {
            let container = document.querySelector(".container");
            console.log(container);
            console.log(myPokemonTeam);
            myPokemonTeam.sort((a, b) => b.random - a.random)
            myPokemonTeam.forEach((pokemon) => {
                container.innerHTML += `
            <div class="box">
            <img
              src=${pokemon.url}
              alt=""
            />
          </div>
            `
            })

        })

}

loadPokemons(pokemonColor);