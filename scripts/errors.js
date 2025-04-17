/**
 * Error which is thrown when getting an element by Id in javascript selects an element of unexpected type
 */
export class InvalidElementTypeError extends Error {
  /**
   * Constructor for InvalidElementTypeError error
   * @param {string} elementId Id by which the element was got
   * @param {string} expectedElementType Type of element that was expected
   * @param {string} gotElementType Type of element that was actually got
   */
  constructor(elementId, expectedElementType, gotElementType) {
    super(
      `Unexpected element type selected with id "${elementId}". Expected element of type "${expectedElementType}" but got "${gotElementType}"`
    );
    this.name = "InvalidElementTypeError";
  }
}
