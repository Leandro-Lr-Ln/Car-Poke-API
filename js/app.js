'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const random = getRandomInt(1, 151);
    fetchData(random);
})


const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}
// usar async await para que se espere a adquirir los datos para poder ejecutarse el programa
const fetchData = async (id) => {
    try {
        // llamar a la api
        const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        // convertir a json requerido al utilizar fetch
        const data = await result.json();
        console.log(data);

        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            name: data.name,
            hp: data.stats[0].base_stat,
            experience: data.base_experience,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            special: data.stats[3].base_stat,
        }

        paintCard(pokemon);
    } catch (error) {
        console.log(error);
    }
}

const paintCard = (pokemon) =>{
    console.log(pokemon);
    // donde va a ir el template
    const flex = document.getElementById('flex');
    // capturar el template
    const template = document.getElementById('template-card').content
    // recomendable hacer un clone del template
    const clone = template.cloneNode(true);
    // utilizar siempre el fragment en un template
    const fragment = document.createDocumentFragment();

    
    clone.querySelector('.card-body-img').setAttribute('src', pokemon.img);
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.name} <span>${pokemon.hp} hp</span>`
    clone.querySelector('.card-body-text').textContent = `${pokemon.experience} Exp`;
    clone.querySelectorAll('.card-footer-statistics h3')[0].textContent = `${pokemon.attack} K`;
    clone.querySelectorAll('.card-footer-statistics h3')[1].textContent = `${pokemon.special} K`;
    clone.querySelectorAll('.card-footer-statistics h3')[2].textContent = `${pokemon.defense} K`;

    // hay que pasar nuestro clon al fragment
    fragment.appendChild(clone);
    // una ves que esta en el fragment lo pasamos al flex-container
    flex.appendChild(fragment)

    
}


