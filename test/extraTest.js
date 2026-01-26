import { base64ToWebP } from '../src/extra.js';
import { assertEq, printReport } from './test.js';

// Contains some cursed tests

const ok = [];

const runWithMocks = ({ width, height, qualityInput, maxDimension }) => new Promise((resolve, reject) => {
  const OriginalImage = window.Image;
  const OriginalCreateElement = document.createElement.bind(document);
  let canvasRef = null;

  class MockImage {
    constructor() {
      this.naturalWidth = width;
      this.naturalHeight = height;
    }
    set src(value) {
      this._src = value;
    }
    decode() {
      return Promise.resolve();
    }
  }

  window.Image = MockImage;
  document.createElement = function(tag) {
    const el = OriginalCreateElement(tag);
    if (tag === 'canvas') {
      const mockCtx = {
        drawImage: (...args) => {
          el.lastDraw = args;
        },
      };
      el.getContext = () => mockCtx;
      el.toDataURL = (type, quality) => {
        el.lastToDataURL = { type, quality };
        return `mock:${type}:${el.width}x${el.height}:q=${quality}`;
      };
      canvasRef = el;
    }
    return el;
  };

  base64ToWebP('data:image/mock', qualityInput, maxDimension)
    .then(result => resolve({ result, canvas: canvasRef }))
    .catch(reject)
    .finally(() => {
      window.Image = OriginalImage;
      document.createElement = OriginalCreateElement;
    });
});

const runSafely = async (config, onResolve) => {
  try {
    const payload = await runWithMocks(config);
    await onResolve(payload);
  } catch (err) {
    ok.push({ pass: false, expected: 'Promise to resolve', actual: err && err.message ? err.message : err });
  }
};

(async () => {
  await runSafely({ width: 400, height: 200, qualityInput: 0.9, maxDimension: 0 }, ({ canvas, result }) => {
    ok.push(assertEq(400)(canvas.width));
    ok.push(assertEq(200)(canvas.height));
    ok.push(assertEq(400)(canvas.lastDraw[3]));
    ok.push(assertEq(200)(canvas.lastDraw[4]));
    ok.push(assertEq('image/webp')(canvas.lastToDataURL.type));
    ok.push(assertEq(0.9)(canvas.lastToDataURL.quality));
    ok.push(assertEq(true)(result.startsWith('mock:image/webp')));
  });

  await runSafely({ width: 400, height: 200, qualityInput: 5, maxDimension: 50 }, ({ canvas }) => {
    ok.push(assertEq(100)(canvas.width));
    ok.push(assertEq(50)(canvas.height));
    ok.push(assertEq(100)(canvas.lastDraw[3]));
    ok.push(assertEq(50)(canvas.lastDraw[4]));
    ok.push(assertEq(1)(canvas.lastToDataURL.quality));
  });

  await runSafely({ width: 120, height: 80, qualityInput: -2, maxDimension: -1 }, ({ canvas }) => {
    ok.push(assertEq(120)(canvas.width));
    ok.push(assertEq(80)(canvas.height));
    ok.push(assertEq(0)(canvas.lastToDataURL.quality));
  });

  await runSafely({ width: 90, height: 45, qualityInput: 'bad', maxDimension: 0 }, ({ canvas }) => {
    ok.push(assertEq(90)(canvas.width));
    ok.push(assertEq(45)(canvas.height));
    ok.push(assertEq(0.8)(canvas.lastToDataURL.quality));
  });

  printReport(ok);
})();
