import { InvalidElementTypeError } from "./errors.js";

/**
 * Initializes canvas component to allow users drawing on it
 * @param {string} canvasId HTML Id of canvas element
 * @throws {*} If element is not of type canvas
 */
export function initializeCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);

  if (!(canvas instanceof window.HTMLCanvasElement)) {
    throw new InvalidElementTypeError(
      canvasId,
      window.HTMLCanvasElement,
      typeof canvas
    );
  }

  return 5;

  // add drawing capabilities on mouse down and on mouse up
}
