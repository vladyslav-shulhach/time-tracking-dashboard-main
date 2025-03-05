document.addEventListener("DOMContentLoaded", () => {
  const categories = document.querySelectorAll(".category");
  const buttons = document.querySelectorAll("[data-timeframe]");
  let timeframe = "daily"; // Default timeframe

  // Function to update the dashboard with data
  const updateDashboard = (data) => {
    data.forEach((item) => {
      const category = document.querySelector(
        `.category[data-category='${item.title.toLowerCase()}']`
      );
      if (category) {
        category.querySelector(
          ".category__time"
        ).textContent = `${item.timeframes[timeframe].current} hrs`;
        category.querySelector(
          ".category__previous-time"
        ).textContent = `Previous - ${item.timeframes[timeframe].previous} hrs`;
      }
    });
  };

  // Fetch JSON data and update dashboard
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      updateDashboard(data);

      // Event listeners for timeframe buttons
      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          timeframe = button.dataset.timeframe;
          buttons.forEach((btn) => btn.setAttribute("aria-selected", "false"));
          button.setAttribute("aria-selected", "true");
          updateDashboard(data);
        });
      });
    })
    .catch((error) => console.error("Error loading JSON data:", error));
});
