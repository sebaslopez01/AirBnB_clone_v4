document.addEventListener('DOMContentLoaded', () => {
  const checkedBoxes = [];
  const amenitiesNames = [];

  const checkBoxes = document.querySelectorAll('.amenities input[type="checkbox"]');
  const amenitiesTitle = document.querySelector('.amenities h4');

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
});
