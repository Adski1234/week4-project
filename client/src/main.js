const form = document.getElementById("form");

const API_URL = "http://localhost:9010";

async function fetchWall() {
    const response = await fetch(`${API_URL}/wall`);
    const data = await response.json();
    console.log("Wall data:", data);
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
})