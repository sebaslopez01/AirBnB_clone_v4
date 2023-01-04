function generatePlace (place, target) {
  const article = document.createElement('article');

  const titleBox = document.createElement('div');
  titleBox.className = 'title_box';
  article.appendChild(titleBox);
  const placeName = document.createElement('h2');
  placeName.innerText = place.name;
  const priceByNight = document.createElement('div');
  priceByNight.className = 'price_by_night';
  priceByNight.innerText = place.price_by_night;
  titleBox.append(placeName, priceByNight);

  const information = document.createElement('div');
  information.className = 'information';
  article.appendChild(information);
  const maxGuest = document.createElement('div');
  maxGuest.className = 'max_guest';
  maxGuest.innerText = `${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}`;
  const numberRooms = document.createElement('div');
  numberRooms.className = 'number_rooms';
  numberRooms.innerText = `${place.number_rooms} Guest${place.number_rooms !== 1 ? 's' : ''}`;
  const numberBathrooms = document.createElement('div');
  numberBathrooms.className = 'number_bathrooms';
  numberBathrooms.innerText = `${place.number_bathrooms} Guest${place.number_bathrooms !== 1 ? 's' : ''}`;
  information.append(maxGuest, numberRooms, numberBathrooms);

  const description = document.createElement('div');
  description.className = 'description';
  article.appendChild(description);
  description.innerHTML = place.description;

  target.appendChild(article);
}

function checkBoxesHandler (data, idArray, nameArray, title, length) {
  if (data.checked) {
    idArray.push(data.dataset.id);
    nameArray.push(data.dataset.name);
  } else {
    const index = idArray.indexOf(data.dataset.id);
    if (index !== -1) idArray.splice(index, 1);

    const index2 = nameArray.indexOf(data.dataset.name);
    if (index2 !== -1) nameArray.splice(index2, 1);
  }

  let names = nameArray.toString().replaceAll(',', ', ');

  if (names.length > length) {
    names = names.substring(0, length) + '...';
  } else if (names.length === 0) {
    names = '&nbsp;';
  }

  title.innerHTML = names;
}

document.addEventListener('DOMContentLoaded', () => {
  const checkedBoxes = [];
  const amenitiesNames = [];
  const statesChecked = [];
  const statesNames = [];
  const citiesChecked = [];
  const citiesNames = [];

  const checkBoxes = document.querySelectorAll('.amenities input[type="checkbox"]');
  const amenitiesTitle = document.querySelector('.amenities h4');
  const statesBoxes = document.querySelectorAll('.state');
  const statesTitle = document.querySelector('.locations h4');
  const citiesBoxes = document.querySelectorAll('.city');
  const apiStatus = document.getElementById('api_status');
  const places = document.querySelector('.places');
  const button = document.querySelector('button');

  statesBoxes.forEach(state => {
    state.addEventListener('change', () => checkBoxesHandler(state, statesChecked, statesNames, statesTitle, 28));
  });

  citiesBoxes.forEach(city => {
    city.addEventListener('change', () => checkBoxesHandler(city, citiesChecked, citiesNames, statesTitle, 28));
  });

  checkBoxes.forEach((amenity) => {
    amenity.addEventListener('change', () => checkBoxesHandler(amenity, checkedBoxes, amenitiesNames, amenitiesTitle, 28));
  });

  button.addEventListener('click', () => {
    fetch('http://127.0.0.1:5001/api/v1/places_search/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ states: statesChecked, cities: citiesChecked, amenities: checkedBoxes })
    })
      .then(res => res.json())
      .then(data => {
        places.textContent = '';
        data.forEach(place => generatePlace(place, places));
      });
  });

  fetch('http://127.0.0.1:5001/api/v1/status/')
    .then(res => res.json())
    .then(data => {
      if (data.status === 'OK') {
        apiStatus.classList.add('available');
      } else {
        apiStatus.classList.remove('available');
      }
    });

  fetch('http://127.0.0.1:5001/api/v1/places_search/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  })
    .then(res => res.json())
    .then(data => {
      data.forEach(place => generatePlace(place, places));
    });
});
