// array of objects for pokemons
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');


  function getAll() {
    return pokemonList;
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
      showDetails(pokemon);
    })
  }

  // fetch the data from API
  function loadList() {
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    })
  }

  // load details of pokemons
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      item.imageUrl = details.sprites.front_default;
      item.imageUrlBack = details.sprites.back_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function(e) {
      console.error(e)
    });
  }


  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() {
      showModal(item);
    });

    $('[data-toggle="modal"]').on('click', function(){
    let targetSelector = $(this).attr('data-target');
    $(targetSelector).modal('show'); // Bootstrap’s own function to make the modal appear
  });

  // show details of pokemon
  function showModal(item) {
    // creating the variables
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');

    // clear existing content
    //modalHeader.empty();
    modalTitle.empty();
    modalBody.empty();

    //create element for name in modal content
    let namePoke = $('<h1>'+ item.name.toUpperCase() + '</h1>');

    // create element for image in modal content
    let imagePokeFront = $('<img class="modal-img" style="width:80%">');
    imagePokeFront.attr('src', item.imageUrl);
    let imagePokeBack = $('<img class="modal-img" style="width:80%">');
    imagePokeBack.attr('src', item.imageUrlBack);

    // create element for hight in modal content
    let hightPoke = $('<p>'+ 'height: '+item.height+'</p>');

    // create element for height in modal
    let typePoke = $('<p>'+ 'type: ' + item.types + '</p>');

    // create element for abilities in modal
    let abilityPoke = $('<p>' + 'abilities: '+ item.abilities + '</p>');

    modalTitle.append(namePoke);
    modalBody.append(imagePokeFront);
    modalBody.append(imagePokeBack);
    modalBody.append(hightPoke);
    modalBody.append(typePoke);
    modalBody.append(abilityPoke);



    // modalContainer.innerHTML = '';
    //
    // // create the div element
    // let modal = document.createElement('div');
    // modal.classList.add('modal');
    //
    // // add close button
    // let closeButton = document.createElement('button');
    // closeButton.classList.add('modal-close');
    // closeButton.innerText = 'X';
    // closeButton.addEventListener('click', hideModal);
    //
    // // create title part of the modal
    // let titleElement = document.createElement('h1');
    // titleElement.innerText = item.name.toUpperCase();
    //
    // // create content of the modalContainer
    // let heightElement = document.createElement('p');
    // heightElement.innerText = 'height: '+ item.height;
    //
    // // create img tag of the modal
    // let imageElement = document.createElement('img');
    // imageElement.src = item.imageUrl;



    // modal.appendChild(closeButton);
    // modal.appendChild(titleElement);
    // modal.appendChild(heightElement);
    // modal.appendChild(imageElement);
    // modalContainer.appendChild(modal);
    //
    // modalContainer.classList.add('is-visible');
    }

    // function to hide Modal;
    function hideModal() {
      modalContainer.classList.remove('is-visible');
    }

    // hide modal by pressing Esc key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });

    // hide modal by clicking outside the modal box
    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    })




  }

  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    showDetails: showDetails,
    getLength: getLength
  }

})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
