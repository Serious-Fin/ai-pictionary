import assert from "assert";
import sinon from "sinon";
import { InvalidElementTypeError } from "../scripts/errors.js";
import { initializeCanvas } from "../scripts/initializeCanvas.js";
import { JSDOM } from "jsdom";

describe("initializeCanvas", () => {
  describe("initializeCanvas", () => {
    it("should throw InvalidElementTypeError error if getting canvas by id returns non-canvas element", () => {
      const dom = new JSDOM(`<!DOCTYPE html><body><input type="text" id="testNonCanvasId" /></body>`);
      global.document = dom.window.document;
      global.window = dom.window;

      assert.throws(() => initializeCanvas("testNonCanvasId"), InvalidElementTypeError);
    });

    it("should throw InvalidElementTypeError error if getting canvas by id returns null", () => {
      const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
      global.document = dom.window.document;
      global.window = dom.window;

      assert.throws(() => initializeCanvas("testNonCanvasId"), InvalidElementTypeError);
    });

    it("should not throw InvalidElementTypeError error if getting canvas by id returns canvas element", () => {
      const dom = new JSDOM(`<!DOCTYPE html><body><canvas id="testCanvasId"></canvas></body>`);
      global.document = dom.window.document;
      global.window = dom.window;

      assert.doesNotThrow(() => initializeCanvas("testCanvasId"), InvalidElementTypeError);
    });
  });
});
