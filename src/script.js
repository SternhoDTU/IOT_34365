const seats = {}; // To track seat status

// Add event listeners to all seat buttons
document.querySelectorAll('.seat-btn').forEach(button => {
  button.addEventListener('click', () => {
    const seatNumber = button.getAttribute('data-seat');
    seats[seatNumber] = !seats[seatNumber]; // Toggle seat status
    button.classList.toggle('selected'); // Update button appearance
  });
});

// Add event listener to the "Start Game" button
document.getElementById('start-game').addEventListener('click', async () => {
  try {
    const response = await fetch('/api/start-game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ seats })
    });

    if (response.ok) {
      const data = await response.json();
      alert('Game started successfully!\n' + JSON.stringify(data.seats, null, 2));
    } else {
      alert('Failed to start the game. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const startGameButton = document.getElementById("startGame");

  startGameButton.addEventListener("click", () => {
    // Collect data from the form
    const data = {};
    for (let i = 1; i <= 8; i++) {
      const checkbox = document.getElementById(`spot${i}`);
      data[`spot${i}`] = checkbox.checked; // true if checked, false otherwise
    }

    console.log("Collected Data:", data);

    // Send data to Azure (this step will connect to your Azure API in the next steps)
    sendDataToAzure(data);
  });

  function sendDataToAzure(data) {
    fetch('/api/event', { // Adjust the endpoint as necessary
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          console.log('Data sent successfully!');
        } else {
          console.error('Failed to send data:', response.statusText);
        }
      })
      .catch(error => console.error('Error sending data:', error));
  }
});
