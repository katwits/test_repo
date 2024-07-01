const ball = document.querySelector(".ball");
const garden = document.querySelector(".garden");
const output = document.querySelector(".output");

let maxX = garden.clientWidth - ball.clientWidth;
let maxY = garden.clientHeight - ball.clientHeight;

function handleOrientation(event) {
  let x = event.beta; // In degree in the range [-180,180)
  let y = event.gamma; // In degree in the range [-90,90)

  output.textContent = `beta: ${x}\n`;
  output.textContent += `gamma: ${y}\n`;

  // Because we don't want to have the device upside down
  // We constrain the x value to the range [-90,90]
  if (x > 90) {
    x = 90;
  }
  if (x < -90) {
    x = -90;
  }

  // To make computation easier we shift the range of
  // x and y to [0,180]
  x += 90;
  y += 90;

  // 10 is half the size of the ball
  // It centers the positioning point to the center of the ball
  ball.style.left = `${(maxY * y) / 180 - 10}px`; // rotating device around the y axis moves the ball horizontally
  ball.style.top = `${(maxX * x) / 180 - 10}px`; // rotating device around the x axis moves the ball vertically
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
const btn = document.getElementById( "request" );
btn.addEventListener( "click", requestPermission );

