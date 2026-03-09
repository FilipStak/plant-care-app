import {
  getWateringStatus,
  getStatusMessage,
  calculateNextWatering,
} from "./calculations.js";
import { species } from "./species.js";
import { load } from "./storage.js";
function init() {
  const plants = load();
  for (const plant of plants) {
    const nextWatering = calculateNextWatering(
      plant.lastWatered,
      plant.wateringFrequency,
    );
    const status = getWateringStatus(nextWatering);
    const message = getStatusMessage(status, nextWatering);
    const card = buildCard(plant, nextWatering, status, message);
    const section =
      status === "overdue" || status === "today"
        ? document.getElementById("today")
        : document.getElementById("upcoming");
    section.appendChild(card);
    document.getElementById("allplants").appendChild(card.cloneNode(true));
  }
}
function buildCard(plant, nextWatering, status, message) {
  const card = document.createElement("div");
  card.className = "card";
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
  lastWateringElement.textContent = `Last Watering: ${plant.lastWatered.toLocaleString(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  )}`; //set the text content of the last watering element to the plant's last watering date
  card.appendChild(lastWateringElement); //append the last watering element to the card
  return card;
}
