
// array of objects for pokemon
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');

  function getAll() {
    return pokemonList;
  }

  // function to add pokemoon to pokemonList and check the type and object keys
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      typeof pokemon !== null &&
      Object.keys(pokemon).every((el) => ['name', 'detailsUrl'].includes(el))
    ) {
      pokemonList.push(pokemon);
    } else {
      alert('Invalid Data!');
    }
  }

  // Search-Bar
  // function to filter the pokemons to find the by name in progress
  const input = document.querySelector('#find');
  input.addEventListener('input', findPokemon);

  function findPokemon(e) {
    let name = e.target.value.toLowerCase();
    let filteredPokemons = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(name)
    );
    document.querySelector('.list-group').innerHTML= '';
    filteredPokemons.forEach(pokemon => addListItem(pokemon));
  }

  // adding list and buttons to the app
  function addListItem(pokemon) {
    let pokemonArr = document.querySelector('.list-group');
    let listItem = document.createElement('li');
    listItem.classList.add('group-list-item');
    let button = document.createElement('button');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#exampleModal');
    button.innerText = pokemon.name;
    button.classList.add('btn-warning');
    listItem.appendChild(button);
    pokemonArr.appendChild(listItem);

    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  // fetch the data from API
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // load details of pokemons
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
        item.abilities = details.abilities;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // function to display the details of pokemons
  function showDetails(item) {
    loadDetails(item).then(function () {
      showModal(item);
    });

    // show details of pokemon
    function showModal(item) {
      // creating the variables
      let modalBody = $('.modal-body');
      let modalTitle = $('.modal-title');

      // clear existing content
      modalTitle.empty();
      modalBody.empty();

      //create element for name in modal content
      let nameElement = $('<h1>' + item.name.toUpperCase() + '</h1>');

      // create element for image in modal content
      let imageElementFront = $('<img class="modal-img" style="width:50%">');
      imageElementFront.attr('src', item.imageUrl);
      let imageElementBack = $('<img class="modal-img" style="width:50%">');
      imageElementBack.attr('src', item.imageUrlBack);

      // create element for hight in modal content
      let heightElement = $('<p>' + 'height: ' + item.height + '</p>');

      // create element for weigth in modal content
      let weightElement = $('<p>' + 'weight: ' + item.weight + '</p>');

      // create element for height in modal
      let typeElement = $('<p>' + 'types: ' +
        item.types.map((i) => i.type.name).join(', ') +
        '</p>'
      );

      // create element for abilities in modal
      let abilityElement = $('<p>' + 'abilities: ' +
      item.abilities.map((i) => i.ability.name).join(', ') +
        '</p>'
      );

      modalTitle.append(nameElement);
      modalBody.append(imageElementFront);
      modalBody.append(imageElementBack);
      modalBody.append(heightElement);
      modalBody.append(weightElement);
      modalBody.append(typeElement);
      modalBody.append(abilityElement);
    }

    // Bootstrap’s own function to make the modal appear
    $('[data-toggle="modal"]').on('click', function () {
      let targetSelector = $(this).attr('data-target');
      $(targetSelector).modal('show');
    });

    // function to hide Modal;
    function hideModal() {
      modalContainer.classList.remove('is-visible');
    }

    // hide modal by pressing Esc key
    window.addEventListener('keydown', (e) => {
      if (
        e.key === 'Escape' &&
        modalContainer.classList.contains('is-visible')
      ) {
        hideModal();
      }
    });

    // hide modal by clicking outside the modal box
    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  }

  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
