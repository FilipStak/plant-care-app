import { load, save } from "./storage.js";
const plantForm = document.getElementById("plantForm");
const plantArray = load();

plantForm.addEventListener("submit", (e) => {
  e.preventDefault(); //Prevent form from submitting normally
  //Check if all fields are filled in
  if (
    !plantForm.name.value ||
    !plantForm.species.value ||
    !plantForm.lastWatered.value
  ) {
    alert("Please fill in all fields.");
    return;
  }
  //Create a new plant object
  const plant = {
    id: Date.now(),
    name: plantForm.name.value,
    species: plantForm.species.value,
    lastWatered: plantForm.lastWatered.value,
  };
  plantArray.push(plant); //Add the plant to the array
  save(plantArray); //Save the array to local storage
  window.location.href = "index.html"; //Redirect to the index page
});
