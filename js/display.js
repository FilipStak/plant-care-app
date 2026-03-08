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
