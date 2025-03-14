document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("[data-timeframe]");
  let timeframe = "daily"; // Default timeframe

  // Function to format hours correctly
  const formatHours = (hours) => `${hours} ${hours === 1 ? "hr" : "hrs"}`;

  // Function to update the dashboard with data
  const updateDashboard = (data) => {
    data.forEach((item) => {
      const categoryKey = item.title.toLowerCase().replace(/\s+/g, "-"); // Convert spaces to hyphens
      const category = document.querySelector(
        `.category[data-category='${categoryKey}']`
      );

      if (category) {
        const currentHours = item.timeframes[timeframe].current;
        const previousHours = item.timeframes[timeframe].previous;

        category.querySelector(".category__time").textContent =
          formatHours(currentHours);

        // Dynamically set previous time description
        const previousTextMap = {
          daily: "Yesterday",
          weekly: "Last Week",
          monthly: "Last Month",
        };

        const previousTimeText = `${previousTextMap[timeframe]} - ${formatHours(
          previousHours
        )}`;
        category.querySelector(".category__previous-time").textContent =
          previousTimeText;
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
