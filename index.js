document.addEventListener('DOMContentLoaded', () => {
    const ball = document.getElementById('ball');
    const gameArea = document.getElementById('gameArea');
    const permissionOverlay = document.getElementById('permissionOverlay');
    const permissionButton = document.getElementById('permissionButton');

    let ballX = gameArea.clientWidth / 2 - ball.clientWidth / 2;
    let ballY = gameArea.clientHeight / 2 - ball.clientHeight / 2;
    console.log(ballX);
    console.log(ballY);

    function updateBallPosition() {
        ball.style.left = `${ballX}px`;
        ball.style.top = `${ballY}px`;
    }

    function handleOrientation(event) {
        const tiltX = event.beta; // Left-to-right tilt in degrees
        const tiltY = event.gamma;  // Front-to-back tilt in degrees

        // Adjust the sensitivity if needed
        const sensitivity = 0.5;

        // Update ball position based on tilt
        ballX += tiltX * sensitivity;
        ballY -= tiltY * sensitivity; // Invert the movement for beta axis

        // Keep the ball within the game area
        ballX = Math.max(0, Math.min(gameArea.clientWidth - ball.clientWidth, ballX));
        ballY = Math.max(0, Math.min(gameArea.clientHeight - ball.clientHeight, ballY));

        updateBallPosition();
    }

    function requestPermission() {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(response => {
                    if (response === 'granted') {
                        window.addEventListener('deviceorientation', handleOrientation);
                        permissionOverlay.style.display = 'none'; // Hide the overlay after permission is granted
                    } else {
                        alert('Permission not granted.');
                    }
                })
                .catch(console.error);
        } else {
            // For non-iOS devices
            window.addEventListener('deviceorientation', handleOrientation);
            permissionOverlay.style.display = 'none'; // Hide the overlay after setting up the listener
        }
    }

    permissionButton.addEventListener('click', requestPermission);

    updateBallPosition();
});
