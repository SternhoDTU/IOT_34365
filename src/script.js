document.addEventListener("DOMContentLoaded", () => {
  const seats = {}; // To track seat status dynamically

  // Add event listeners to all seat buttons
  document.querySelectorAll(".seat-btn").forEach(button => {
    const seatNumber = button.getAttribute("data-seat");
    seats[seatNumber] = false; // Initialize seat status as false (unoccupied)

    button.addEventListener("click", () => {
      seats[seatNumber] = !seats[seatNumber]; // Toggle seat status
      button.classList.toggle("selected"); // Update button appearance
    });
  });

  // Handle "Start Game" button click
  const startGameButton = document.getElementById("start-game");
  startGameButton.addEventListener("click", async () => {
    console.log("Sending seating data:", seats); // Debug: log seating data

    try {
      const response = await fetch("https://Lucy-app.azurewebsites.net/startGame", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          // Replace 'YOUR_SECRET_TOKEN' with the correct secret or remove if not required
          'Authorization': 'Bearer YOUR_SECRET_TOKEN',
        },
        body: JSON.stringify({ seating: seats }), // Send seat data as JSON
      });

      if (response.ok) {
        const data = await response.json();
        alert("Game started successfully!\n" + JSON.stringify(data, null, 2));
      } else {
        console.error("Response status:", response.status, response.statusText);
        alert(`Failed to start the game. Status: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error starting the game:", error);
      alert("An error occurred. Please check your internet connection and try again.");
    }
  });
});
