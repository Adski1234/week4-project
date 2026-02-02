const form = document.getElementById("form");
const wallDiv = document.getElementById("wall");

const API_URL = "https://week4-project-server.onrender.com";

async function fetchWall() {
    const response = await fetch(new URL("/wall", API_URL));
    const data = await response.json();
    wallDiv.innerHTML = "";
    data.forEach(addEntryToWall);
    console.log("Wall data:", data);

}
function addEntryToWall(item) {
    const entry = document.createElement("div");
    entry.className= "wall-entry";

    const name = document.createElement("p")
    name.className = "wall-name";
    name.textContent = item.wall_name + ":";

    const year = document.createElement("p")
    year.className = "wall-year";
    year.textContent = item.year;

    entry.appendChild(name);
    entry.appendChild(year);

    wallDiv.appendChild(entry);
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const wall_name =formData.get("wall_name");
    const year = formData.get("year");

    const response = await fetch(new URL("/wall", API_URL), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wall_name, year }),

    });

    const payload = await response.json();
    

    if (!response.ok) {
        console.error(payload);
        alert(payload.error || "Post failed");
        return;
    }

    const newEntry = await response.json();

    addEntryToWall(newEntry); 
    form.reset();
});

fetchWall();