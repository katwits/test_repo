<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Canvas Example</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            background-color: #b9b9b9;
        }
        header {
            background-color: #b9b9b9;
            color: #000;
            padding: 10px;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        #canvasContainer {
            flex: 1;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        #canvas {
            background-color: #fff;
            max-width: 100%;
            max-height: 100%;
        }
        .buttons {
            display: flex;
            gap: 10px;
        }
        .buttons button {
            background-color: #c80000; 
            color: white; 
            padding: 10px 20px;
            border-radius: 5px; 
            font-size: 16px;
            cursor: pointer;
        }
        footer {
            background-color: #b9b9b9;
            color: #000;
            text-align: center;
            padding: 10px;
        }
    </style>
</head>
<body>
    <header>
        <div class="buttons">
            <button id="startButton">Start</button>
            <button id="requestButton">Request Permission</button>
        </div>
    </header>
    <div id="canvasContainer">
        <canvas id="canvas"></canvas>
    </div>
    <footer>
        <div class="output" id="output"></div>
    </footer>

    <script>
        const canvas = document.getElementById('canvas');
        const canvasContainer = document.getElementById('canvasContainer');
        const ctx = canvas.getContext('2d');

        const output = document.getElementById('output');
        const size = Math.min(canvasContainer.offsetWidth, canvasContainer.offsetHeight);

        var gridSize, x, y, EndX, EndY, vector2D, blockSize;

        canvas.width = size;
        canvas.height = size;

        getIntialData();
        
        function getIntialData() {
            gridSize = 20;
            x = 1;
            y = 1;
            EndX = 3;
            EndY = 3;
            vector2D = [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
                [1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
                [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
                [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
                [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ];
            blockSize = size / gridSize;
        }

        function drawSquare(xPos, yPos, color) {
            ctx.fillStyle = color;
            ctx.fillRect(xPos * blockSize, yPos * blockSize, blockSize, blockSize); // Draw a square inside the canvas
        }

        function drawBall(xPos, yPos, color) {
            var centerX = xPos * blockSize + blockSize / 2;
            var centerY = yPos * blockSize + blockSize / 2;
            ctx.beginPath();
            ctx.arc(centerX, centerY, blockSize / 2 - 1, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.closePath();
        }

        function updatePosition(newX, newY) {
            // Check if new position is within bounds and not a wall
            if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize && vector2D[newY][newX] !== 1) {
                ctx.clearRect(x * blockSize, y * blockSize, blockSize, blockSize); // Clear the current ball
                drawSquare(x, y, '#fff'); // Redraw the cleared square
                x = newX;
                y = newY;
                drawBall(newX, newY, '#c80000'); // Draw the new ball
                if (x === EndX && y === EndY) {
                    alert('Winner');
                }
            } else {
                console.log("Invalid move: collision or out of bounds");
            }
        }

        function handleOrientation(event) {
            let beta = event.beta; // In degree in the range [-180,180)
            let gamma = event.gamma; // In degree in the range [-90,90)

            output.textContent = `beta: ${beta}\n`;
            output.textContent += `gamma: ${gamma}\n`;

            // Because we don't want to have the device upside down
            // We constrain the x value to the range [-90,90]
            if (beta > 90) {
                beta = 90;
            }
            if (beta < -90) {
                beta = -90;
            }

            // To make computation easier we shift the range of
            // beta and gamma to [0,180]
            beta += 90;
            gamma += 90;

            // Determine movement direction based on tilt
            if (beta < 80) {
                updatePosition(x, y - 1); // Move up
            } else if (beta > 100) {
                updatePosition(x, y + 1); // Move down
            }

            if (gamma < 80) {
                updatePosition(x - 1, y); // Move left
            } else if (gamma > 100) {
                updatePosition(x + 1, y); // Move right
            }
        }

        function requestPermission() {
            if (typeof DeviceOrientationEvent.requestPermission === "function") {
                DeviceOrientationEvent.requestPermission()
                    .then((response) => {
                        if (response === "granted") {
                            output.textContent = ''; // Clear any permission message
                            window.addEventListener("deviceorientation", handleOrientation);
                        } else {
                            output.textContent = "Permission denied.";
                        }
                    })
                    .catch((error) => {
                        console.error("Permission request error:", error);
                        output.textContent = "Permission request error.";
                    });
            } else {
                output.textContent = "Device orientation not supported.";
                // Fallback: Attempt to listen for device orientation without permission
                window.addEventListener("deviceorientation", handleOrientation);
            }
        }

        document.getElementById('startButton').addEventListener('click', () => {
            console.log('Start button clicked');
            for (let i = 0; i < vector2D.length; i++) {
                for (let j = 0; j < vector2D[i].length; j++) {
                    if (vector2D[i][j] == 1) {
                        drawSquare(j, i, '#000000');
                    } else {
                        drawSquare(j, i, '#fff');
                    }
                }
            }
            drawBall(x, y, '#c80000');
            drawBall(EndX, EndY, 'black');
        });

        document.getElementById('requestButton').addEventListener('click', requestPermission);
    </script>
</body>
</html>
