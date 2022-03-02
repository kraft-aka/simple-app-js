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

  function getLength() {
    return pokemonList.length;
  }

// function to add pokemopn to pokemonList and check the type and object keys
  function addv(pokemon) {
    if (typeof pokemon ==='object' && typeof pokemon!== null && Object.keys(pokemon).every(el =>['name','height', 'type'].includes(el))) {
      pokemonList.push(pokemon);
    } else {
      alert('Invalid data is given.');
    }
  }

//function to filter the pokemons to find the by name
  const input = document.querySelector('#find');
  input.addEventListener('input', updateValue);

  function updateValue(e) {
    let name = e.target.value;
    let filtered = pokemonList.filter(function(pokemon){
    if (pokemon.name.toLowerCase() === name){
      return true;
    } else {
      return false;
    }
  });
  console.log(filtered);
}


  return {
    // add: add,
    addv: addv,
    getAll: getAll,
    getLength: getLength
  }

})();


// looping through the array objects to print all items.

pokemonRepository.getAll().forEach(function(pokemon){
  document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ') '+ '</p>' );
  if (pokemon.height > 1) {
    document.write('<p>' +'+ Wow, that\'s big!' + '</p>');
  }
});



// test
console.log(pokemonRepository.addv({name:'Charmander', height: 0.6, type: ['fire']}));
document.write('<h4>'+'The number of pokemons are: ' + pokemonRepository.getLength() + '</h4>');
