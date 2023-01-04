document.addEventListener('DOMContentLoaded', () => {
  const checkedBoxes = [];
  const amenitiesNames = [];

  const checkBoxes = document.querySelectorAll('.amenities input[type="checkbox"]');
  const amenitiesTitle = document.querySelector('.amenities h4');
  const apiStatus = document.getElementById('api_status');
  const places = document.getElementsByClassName('places')[0];

  checkBoxes.forEach((amenity) => {
    amenity.addEventListener('change', () => {
      if (amenity.checked) {
        checkedBoxes.push(amenity.dataset.id);
        amenitiesNames.push(amenity.dataset.name);
      } else {
        const index = checkedBoxes.indexOf(amenity.dataset.id);
        if (index !== -1) checkedBoxes.splice(index, 1);

        const index2 = amenitiesNames.indexOf(amenity.dataset.name);
        if (index2 !== -1) amenitiesNames.splice(index2, 1);
      }

      let amenities = amenitiesNames.toString().replaceAll(',', ', ');

      if (amenities.length > 32) {
        amenities = amenities.substring(0, 32) + '...';
      } else if (amenities.length === 0) {
        amenities = '&nbsp;';
      }

      amenitiesTitle.innerHTML = amenities;
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
      data.forEach(place => {
        const article = document.createElement('article');
        places.appendChild(article);

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
      });
    });
});
