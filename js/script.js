const API_URL = 'https://rickandmortyapi.com/api/character';
const SEARCH_URL = 'https://rickandmortyapi.com/api/character/?name=';

const form = document.getElementById('form');
const buscar = document.getElementById('inputBuscar');
const main = document.getElementById('main');
const logo = document.getElementById('logo');


logo.addEventListener('click', () =>{
    getPersonajes(API_URL);
})

const getPersonajes = (url) => {
    const peticion = fetch(url);
    peticion.then(resp => resp.json())
        .then(data => showPersonajes(data.results))
        .catch(error =>
            Swal.fire({
                title: 'Hubo un error en el servidor',
                text: 'Intente de nuevo más tarde',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              }))
}

getPersonajes(API_URL);

const showPersonajes = (personajes) => {
    main.innerHTML = '';
    personajes.forEach(personaje => {
        const { name, status, species, gender, image} = personaje;
        const divPersonaje = document.createElement('div')
        divPersonaje.classList.add('personaje');
        divPersonaje.innerHTML = `
        <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${image}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <p class="card-text">Gender: ${gender}</p>
              <p class="card-text">Specie: ${species}</p>
              <p class="card-text">Status: ${status}</p>
            </div>
          </div>
        </div>
      </div>
      `
      main.appendChild(divPersonaje);
    })
}

form.addEventListener('submit', e => {
    e.preventDefault()
    const buscarNombre = buscar.value;
    if (buscarNombre && buscarNombre !== ''){
        getPersonajes(SEARCH_URL + buscarNombre)
        buscar.value = "";
    }
    else{
        window.location.reload();
    }
})