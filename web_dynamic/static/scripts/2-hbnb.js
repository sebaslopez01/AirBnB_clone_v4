document.addEventListener('DOMContentLoaded', () => {
  const checkedBoxes = [];
  const amenitiesNames = [];

  const checkBoxes = document.querySelectorAll('.amenities input[type="checkbox"]');
  const amenitiesTitle = document.querySelector('.amenities h4');
  const apiStatus = document.getElementById('api_status');

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
});
