pegaPokemons(30);

var quantidade = document.getElementById('quantidade');
quantidade.addEventListener('keyup',()=>{
    pegaPokemons(quantidade.value);
});

function pegaPokemons(quantidade){

    fetch('https://pokeapi.co/api/v2/pokemon?limit='+quantidade)
    .then(response => response.json())
    .then(allpokemon => {

        var pokemons = [];

        allpokemon.results.map((val)=>{

            fetch(val.url)
            .then(response => response.json())
            .then(pokemonSingle =>{

                console.log(pokemonSingle);
                pokemons.push({
                    nome:val.name,
                    imagem:pokemonSingle.sprites.front_default,
                    ordem:pokemonSingle.order
                });

                if(pokemons.length == quantidade){ 

                    var pokemonBoxes = document.querySelector('.pokemon-boxes');
                    pokemonBoxes.innerHTML = "";

                    pokemons.map((val)=>{
                        pokemonBoxes.innerHTML += `
                            <div class="pokemon-box">
                                <p>`+val.ordem+`</p>
                                <img src="`+val.imagem+`" />
                                <p>`+val.nome+`</p>
                            </div>
                        `
                    });
                }
            });
        })
    });
}

