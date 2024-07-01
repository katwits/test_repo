document.addEventListener('DOMContentLoaded', () => {
    const ball = document.getElementById('ball');
    const gameArea = document.getElementById('gameArea');

    let ballX = gameArea.clientWidth / 2 - ball.clientWidth / 2;
    let ballY = gameArea.clientHeight / 2 - ball.clientHeight / 2;

    function updateBallPosition() {
        ball.style.left = `${ballX}px`;
        ball.style.top = `${ballY}px`;
    }

    function handleMotion(event) {
        const accX = event.accelerationIncludingGravity.x;
        const accY = event.accelerationIncludingGravity.y;

        // Adjust the sensitivity if needed
        const sensitivity = 0.5;

        // Update ball position based on accelerometer data
        ballX -= accX * sensitivity;
        ballY += accY * sensitivity;

        // Keep the ball within the game area
        ballX = Math.max(0, Math.min(gameArea.clientWidth - ball.clientWidth, ballX));
        ballY = Math.max(0, Math.min(gameArea.clientHeight - ball.clientHeight, ballY));

        updateBallPosition();
    }

    function requestMotionPermission() {
        if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
            // iOS 13+ device
            DeviceMotionEvent.requestPermission()
                .then(response => {
                    if (response === 'granted') {
                        window.addEventListener('devicemotion', handleMotion);
                    } else {
                        console.error('Device motion permission not granted');
                    }
                })
                .catch(console.error);
        } else {
            // Non iOS 13+ device
            window.addEventListener('devicemotion', handleMotion);
        }
    }

    // Request permission for device motion
    requestMotionPermission();

    updateBallPosition();
});
