const form = document.getElementById("form");
const wallDiv = document.getElementById("wall");

const API_URL = "https://week4-project-server.onrender.com";

async function fetchWall() {
    const response = await fetch(`${API_URL}/wall`);
    const data = await response.json();
    console.log("Wall data:", data);

    for (const item of data) {
        addEntryToWall(item);
    }
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

    const response = await fetch(`${API_URL}/wall`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wall_name, year }),

    });

    if (!response.ok) {
        const text = await response.text();
        alert(`Post failed (${response.status}): ${text}`);
        return;
    }

    const newEntry = await response.json();

    addEntryToWall(newEntry); 
    form.reset();
});

fetchWall();