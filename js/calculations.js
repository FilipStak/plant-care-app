export function calculateNextWatering(lastWatered, wateringFrequency) {
  const nextWatering = new Date(lastWatered);
  nextWatering.setHours(0, 0, 0, 0);
  nextWatering.setDate(nextWatering.getDate() + wateringFrequency);
  return nextWatering;
}

export function getWateringStatus(nextWatering) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const next = new Date(nextWatering);
  next.setHours(0, 0, 0, 0);

  if (today < next) {
    return "upcoming";
  } else if (today.getTime() === next.getTime()) {
    return "today";
  } else {
    return "overdue";
  }
}

export function getStatusMessage(status, nextWatering) {
  const formattedDate = nextWatering.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (status === "upcoming") {
    return `Watering due ${formattedDate}`;
  } else if (status === "today") {
    return "Watering due today.";
  } else {
    return `Water overdue: ${formattedDate}`;
  }
}
