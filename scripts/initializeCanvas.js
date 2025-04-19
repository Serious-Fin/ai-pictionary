import { InvalidElementTypeError } from "./errors.js";

/**
 * Initializes canvas component to allow users drawing on it
 * @param {string} canvasId HTML Id of canvas element
 * @throws {InvalidElementTypeError} If element is not of type canvas
 */
export function initializeCanvas(canvasId, lineWidth = 4, lineColor = "#000") {
  const canvas = document.getElementById(canvasId);
  if (!(canvas instanceof window.HTMLCanvasElement)) {
    throw new InvalidElementTypeError(canvasId, window.HTMLCanvasElement, typeof canvas);
  }
  const ctx = canvas.getContext("2d");
  canvasContextConfiguration(ctx, lineWidth, lineColor);
  canvasEventListenerConfiguration(canvas, ctx);
}

/**
 * Set initial drawing properties of canvas element
 * @param {CanvasRenderingContext2D} ctx canvas context
 * @param {number} lineWidth initial line width
 * @param {color} lineColor initial line color
 */
function canvasContextConfiguration(ctx, lineWidth, lineColor) {
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = lineColor;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
}

/**
 * Initialize all event listeners to allow users to draw on canvas
 * @param {HTMLCanvasElement} canvas html canvas element
 * @param {CanvasRenderingContext2D} ctx canvas 2D context
 */
function canvasEventListenerConfiguration(canvas, ctx) {
  let isPenDown = false;
  let lastX, lastY;
  const canvasPosition = canvas.getBoundingClientRect();

  canvas.addEventListener("mousedown", (event) => {
    isPenDown = true;

    lastX = event.clientX - canvasPosition.left;
    lastY = event.clientY - canvasPosition.top;
    ctx.beginPath();
    ctx.arc(lastX, lastY, ctx.lineWidth / 2, 0, 2 * Math.PI);
    ctx.fill();
  });

  canvas.addEventListener("mouseup", () => {
    isPenDown = false;
  });

  canvas.addEventListener("mouseleave", () => {
    isPenDown = false;
  });

  canvas.addEventListener("mousemove", (event) => {
    if (!isPenDown) {
      return;
    }

    const currentX = event.clientX - canvasPosition.left;
    const currentY = event.clientY - canvasPosition.top;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    lastX = currentX;
    lastY = currentY;
  });
}
