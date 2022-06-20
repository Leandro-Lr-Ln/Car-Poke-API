'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const random = getRandomInt(1, 151);
    fetchData(random);
})


const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}
const fetchData = async (id) => {
    try {
        const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await result.json();

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

const paintCard = (pokemon) => {
    const flex = document.getElementById('flex');
    const template = document.getElementById('template-card').content
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();

    clone.querySelector('.card-body-img').setAttribute('src', pokemon.img);
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.name} <span>${pokemon.hp} hp</span>`
    clone.querySelector('.card-body-text').textContent = `${pokemon.experience} Exp`;
    clone.querySelectorAll('.card-footer-statistics h3')[0].textContent = `${pokemon.attack} K`;
    clone.querySelectorAll('.card-footer-statistics h3')[1].textContent = `${pokemon.special} K`;
    clone.querySelectorAll('.card-footer-statistics h3')[2].textContent = `${pokemon.defense} K`;

    fragment.appendChild(clone);
    flex.appendChild(fragment)


}


