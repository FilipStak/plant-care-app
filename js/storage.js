export function save(plantArray) {
  const plantString = JSON.stringify(plantArray); //JSON.stringify() → converts object to real usable string
  localStorage.setItem("plants", plantString); //localStorage.setItem(key, value) → stores it
}
//localStorage can only store strings.
export function load() {
  const plantString = localStorage.getItem("plants"); //getItem() → retrieves string
  if (!plantString) return [];
  const plantArray = JSON.parse(plantString); //JSON.parse() → converts string back to object
  return plantArray;
}
