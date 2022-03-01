// alert('Hello user. Welcome to the snall app!');

//array of objects for pokemons with 4 items
let pokemonRepository = (function() {
  let pokemonList = [
    {
      name: 'Bulbasaur',
      height: 0.7,
      type: ['grass', 'poison']
    },
    {
      name: 'Wartortle',
      height: 1.0,
      type: ['water']
    },
    {
      name: 'Charizard',
      height: 1.7,
      type: ['fire', 'flying']
    },
    {
      name: 'Pikachu',
      height: 0.4,
      type: ['electric']
    }
  ];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  return {
    add: add,
    getAll: getAll
  }

})();


// looping through the array objects to print all items.

pokemonRepository.getAll().forEach(function(pokemon){
  document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ') '+ '</p>' );
  if (pokemon.height > 1) {
    document.write('<p>' +'+ Wow, that\'s big!' + '</p>');
  }
});
