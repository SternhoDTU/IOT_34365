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
      const response = await fetch("https://Lucy-app.azurewebsites.net/api/startGame", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "${{ secrets.SECRET}}",
        },
        body: JSON.stringify({ seating: seats }), // Send seat data as JSON
      });

      if (response.ok) {
        const data = await response.json();
        alert("Game started successfully!\n" + JSON.stringify(data, null, 2));
      } else {
        alert("Failed to start the game. Please try again.");
        console.error("Response status:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error starting the game:", error);
      alert("An error occurred. Please try again.");
    }
  });

  // Optional: Function to check game status
  const checkGameStatus = async () => {
    try {
      const response = await fetch("https://Lucy-app.azurewebsites.net/api/getGameStatus");
      if (response.ok) {
        const data = await response.json();
        console.log("Current game status:", data);
        alert("Game status:\n" + JSON.stringify(data, null, 2));
      } else {
        console.error("Failed to fetch game status:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching game status:", error);
    }
  };

  // Optional: Attach to another button if needed
  // document.getElementById("check-status").addEventListener("click", checkGameStatus);
});
