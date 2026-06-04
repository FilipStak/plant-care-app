import {
  getWateringStatus,
  getStatusMessage,
  calculateNextWatering,
} from "./calculations.js";
import { species } from "./species.js";
import { load, save } from "./storage.js";
function clearSection() {
  document.getElementById("today-plants").innerHTML = "";
  document.getElementById("upcoming-plants").innerHTML = "";
  document.getElementById("all-plants").innerHTML = "";
}
function init() {
  clearSection();
  const plants = load();
  for (const plant of plants) {
    const nextWatering = calculateNextWatering(
      new Date(plant.lastWatered),
      species[plant.species].wateringFrequency,
    );
    const status = getWateringStatus(nextWatering);
    const message = getStatusMessage(status, nextWatering);
    const card = buildCard(plant, nextWatering, status, message);
    const section =
      status === "overdue" || status === "today"
        ? document.getElementById("today-plants")
        : document.getElementById("upcoming-plants");
    section.appendChild(card);
    document.getElementById("all-plants").appendChild(card.cloneNode(true)); //clone the card and append it to the allplants section
  }
}
function buildCard(plant, nextWatering, status, message) {
  const card = document.createElement("div");
  card.className = "card p-3 m-2";
  const name = document.createElement("h3");
  name.textContent = plant.name; //set the text content of the name element to the plant's name
  card.appendChild(name); //append the name element to the card
  const nextWateringElement = document.createElement("p");
  nextWateringElement.textContent = `Next Watering: ${message}`;
  card.appendChild(nextWateringElement); //append the next watering element to the card
  const description = document.createElement("p");
  const speciesDescription = species[plant.species]?.description; //look up the species description from the species object
  description.textContent = speciesDescription;
  card.appendChild(description); //append the description element to the card
  const lastWateringElement = document.createElement("p");
  lastWateringElement.textContent = `Last Watering: ${new Date(
    plant.lastWatered,
  ).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}`; //set the text content of the last watering element to the plant's last watering date
  card.appendChild(lastWateringElement); //append the last watering element to the card
  const waterButton = document.createElement("button");
  waterButton.textContent = "Watered Today";
  card.appendChild(waterButton);
  waterButton.addEventListener("click", () => {
    const allPlants = load() || [];
    const index = allPlants.findIndex((p) => p.id === plant.id);
    if (index !== -1) {
      allPlants[index].lastWatered = new Date().toISOString().split("T")[0];
      save(allPlants);
      init();
    }
  });

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove Plant";
  card.appendChild(removeButton);
  removeButton.addEventListener("click", () => {
    const allPlants = load() || [];

    const updatedPlants = allPlants.filter((p) => p.id !== plant.id);

    save(updatedPlants);

    init();
  });

  return card;
}

init();
