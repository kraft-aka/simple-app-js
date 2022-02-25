alert('Hello user. Welcome to the snall app!');

//array of objects for pokemons with 4 items
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

// looping through the array objects to print all items.
for (let i = 0; i < pokemonList.length; i++) {
  document.write('<br>'+'<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') '+ '</p>');
  if (pokemonList[i].height > 1) {
    document.write('<p>'+'- Wow, that\'s big!'+ '</p>');
  }
};
