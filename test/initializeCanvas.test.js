import assert from "assert";
import sinon from "sinon";
import { InvalidElementTypeError } from "../scripts/errors.js";
import { initializeCanvas } from "../scripts/initializeCanvas.js";
import { JSDOM } from "jsdom";

describe("initializeCanvas", () => {
  describe("initializeCanvas", () => {
    beforeEach(() => {
      const dom = new JSDOM(
        `<!DOCTYPE html><body><input type="text" id="testNonCanvasId" /></body>`
      );
      global.document = dom.window.document;
      global.window = dom.window;
    });

    it("should throw InvalidElementTypeError error if getting canvas by id returns non-canvas element", () => {
      assert.throws(
        () => initializeCanvas("testNonCanvasId"),
        InvalidElementTypeError
      );
    });
  });
});
