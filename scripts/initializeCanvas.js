import { InvalidElementTypeError } from "./errors.js";

/**
 * Initializes canvas component to allow users drawing on it
 * @param {string} canvasId HTML Id of canvas element
 * @throws {InvalidElementTypeError} If element is not of type canvas
 */
export function initializeCanvas(canvasId, lineWidth = 4, lineColor = "#444") {
  const canvas = document.getElementById(canvasId);
  if (!(canvas instanceof window.HTMLCanvasElement)) {
    throw new InvalidElementTypeError(canvasId, window.HTMLCanvasElement, typeof canvas);
  }
  canvas.width = window.innerWidth * 0.8;
  canvas.height = window.innerHeight * 0.8;
  const ctx = canvas.getContext("2d");
  setCanvasProps(ctx, { width: lineWidth, color: lineColor });
  addDrawingControls(canvas, ctx);
  addColorAndWidthControls(ctx, "lineWidthSlider", "lineColorPicker");
}

/**
 * Set drawing properties for canvas element
 * @param {CanvasRenderingContext2D} ctx Canvas rendering 2D context
 * @param {{color?: string, width?: number}} canvasProps new pen drawing properties
 */
function setCanvasProps(ctx, canvasProps) {
  ctx.lineWidth = canvasProps.width ?? ctx.lineWidth;
  ctx.strokeStyle = canvasProps.color ?? ctx.strokeStyle;
  ctx.fillStyle = canvasProps.color ?? ctx.fillStyle;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
}

/**
 * Initialize all event listeners to allow users to draw on canvas
 * @param {HTMLCanvasElement} canvas html canvas element
 * @param {CanvasRenderingContext2D} ctx canvas 2D context
 */
function addDrawingControls(canvas, ctx) {
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

function addColorAndWidthControls(ctx, widthSliderId, colorPickerId) {
  const strokeWidthSlider = document.getElementById(widthSliderId);
  if (!(strokeWidthSlider instanceof window.HTMLInputElement)) {
    throw new InvalidElementTypeError(widthSliderId, window.HTMLInputElement, typeof strokeWidthSlider);
  }

  const lineColorPicker = document.getElementById(colorPickerId);
  if (!(lineColorPicker instanceof window.HTMLInputElement)) {
    throw new InvalidElementTypeError(colorPickerId, window.HTMLInputElement, typeof lineColorPicker);
  }

  strokeWidthSlider.addEventListener("change", () => {
    setCanvasProps(ctx, { width: strokeWidthSlider.value });
  });

  lineColorPicker.addEventListener("change", () => {
    setCanvasProps(ctx, { color: lineColorPicker.value });
  });
}
