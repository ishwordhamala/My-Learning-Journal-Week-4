// =======================================
// Fetch and display reflections.json
// =======================================
const jsonContainer = document.getElementById("json-reflections");
const jsonCount = document.getElementById("json-count");
const filterInput = document.getElementById("filter-week");
const filterButton = document.getElementById("filter-button");
const clearFilterButton = document.getElementById("clear-filter");

async function loadJsonReflections(filterWeek = null) {
  if (!jsonContainer || !jsonCount) return;

  jsonContainer.textContent = "Loading reflections...";

  try {
    const response = await fetch("backend/reflections.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    let data = await response.json();

    // Optional filtering by week
    if (filterWeek) {
      data = data.filter((entry) => entry.week === String(filterWeek));
    }

    jsonContainer.innerHTML = "";

    if (data.length === 0) {
      jsonContainer.textContent = "No reflections found.";
      jsonCount.textContent = "";
      return;
    }

    // Update count
    jsonCount.textContent = `Total reflections loaded: ${data.length}`;

    // Render each reflection
    data.forEach((entry) => {
      const div = document.createElement("div");
      div.className = "entry";

      const title = document.createElement("h4");
      title.textContent = `Week ${entry.week}: ${entry.title}`;

      const date = document.createElement("small");
      if (entry.date) {
        date.textContent = `Saved on: ${new Date(entry.date).toLocaleString()}`;
      }

      const content = document.createElement("p");
      content.textContent = entry.content;

      div.appendChild(title);
      if (entry.date) div.appendChild(date);
      div.appendChild(content);

      jsonContainer.appendChild(div);
    });
  } catch (error) {
    console.error(error);
    jsonContainer.textContent = "Could not load reflections.json.";
    jsonCount.textContent = "";
  }
}

// Load JSON reflections when the page first opens
document.addEventListener("DOMContentLoaded", () => {
  if (jsonContainer) {
    loadJsonReflections();
  }
});

// Filter buttons
if (filterButton && filterInput) {
  filterButton.addEventListener("click", () => {
    const weekValue = filterInput.value;
    if (weekValue) {
      loadJsonReflections(weekValue);
    } else {
      loadJsonReflections();
    }
  });
}

if (clearFilterButton && filterInput) {
  clearFilterButton.addEventListener("click", () => {
    filterInput.value = "";
    loadJsonReflections();
  });
}


