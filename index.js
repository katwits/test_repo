document.addEventListener('DOMContentLoaded', () => {
    const ball = document.getElementById('ball');
    const gameArea = document.getElementById('gameArea');

    let ballX = gameArea.clientWidth / 2 - ball.clientWidth / 2;
    let ballY = gameArea.clientHeight / 2 - ball.clientHeight / 2;

    function updateBallPosition() {
        ball.style.left = `${ballX}px`;
        ball.style.top = `${ballY}px`;
    }

    window.addEventListener('deviceorientation', (event) => {
        const tiltX = event.gamma; // Left-to-right tilt in degrees
        const tiltY = event.beta;  // Front-to-back tilt in degrees

        // Adjust the sensitivity if needed
        const sensitivity = 0.81;

        // Update ball position based on tilt
        ballX += tiltX * sensitivity;
        ballY += tiltY * sensitivity;

        ballX = Math.max(0, Math.min(gameArea.clientWidth - ball.clientWidth, ballX));
        ballY = Math.max(0, Math.min(gameArea.clientHeight - ball.clientHeight, ballY));

        updateBallPosition();
    });

    updateBallPosition();
});
