
//array of objects for pokemons
let pokemonRepository = (function() {
   let pokemonList = [];
   let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


  function getAll() {
    return pokemonList;
  }

  // load details of pokemons
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e)
    });
  }

  // fetch the data from API
    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }


// function to display the number of pokemons
  function getLength() {
    return pokemonList.length;
  }

  // function to add pokemoon to pokemonList and check the type and object keys
  function add(pokemon) {
    if (typeof pokemon === 'object' && typeof pokemon !== null && Object.keys(pokemon).every(el => ['name', 'detailsUrl'].includes(el))) {
      pokemonList.push(pokemon);
    } else {
      alert('Invalid Data!');
    }
  }

  // function to filter the pokemons to find the by name ---in progress---
  const input = document.querySelector('#find');
  input.addEventListener('input', updateValue);

  function updateValue(e) {
    let name = e.target.value;
    let filtered = pokemonList.filter(function(pokemon) {
      if (pokemon.name.toLowerCase() === name) {
        return true;
      } else {
        return false;
      }
    });
    console.log(filtered);
  }

  // adding list and buttons to the app
  function addListItem(pokemon) {
    let pokemonArr = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listItem.appendChild(button);
    pokemonArr.appendChild(listItem);

    button.addEventListener('click', function(event) {
      showDetails(pokemon.name);
      console.log(pokemon.name);
    })
  }

 // show details of pokemon
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  // function to add an image URL
  function imgOnload(pokemon) {
    let img = document.createElement('img');
    let div = document.querySelector('.img-class');
    img.innerText += '<img src=" ' + img.src+'"/>';
    img.appendChild(div);
    img.src = pokemon.img;

    console.log(img.src);
  }


  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    getLength: getLength
  }

})();

pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
