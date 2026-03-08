//test Date  console.log(today);
export function calculateNextWatering(lastWatered, wateringFrequency) {
  const nextWatering = new Date(lastWatered);
  nextWatering.setHours(0, 0, 0, 0);
  nextWatering.setDate(lastWatered.getDate() + wateringFrequency);
  return nextWatering;
}
/*Test nextWatering
const nextWatering = calculateNextWatering(lastWatered, 3);
console.log(
  nextWatering.toLocaleDateString(
    ("en-GB", { day: "numeric", month: "long", year: "numeric" }),
  ),
  );*/

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
// Future getWateringStatus(new Date("2026-03-20"));
// Today getWateringStatus(new Date("2026-03-07"));
// Past getWateringStatus(new Date("2026-02-01"));
