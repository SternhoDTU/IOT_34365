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
