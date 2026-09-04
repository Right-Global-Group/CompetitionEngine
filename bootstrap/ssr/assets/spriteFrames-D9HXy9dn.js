import { ref, watchEffect } from "vue";
function removeBg(im) {
  try {
    const W = im.naturalWidth, H = im.naturalHeight;
    const off = document.createElement("canvas");
    off.width = W;
    off.height = H;
    const c = off.getContext("2d", { willReadFrequently: true });
    if (!c) return im;
    c.drawImage(im, 0, 0);
    const img = c.getImageData(0, 0, W, H);
    const data = img.data;
    const at = (x, y) => (y * W + x) * 4;
    let sr = 0, sg = 0, sb = 0;
    for (const [x, y] of [[0, 0], [W - 1, 0], [0, H - 1], [W - 1, H - 1]]) {
      const i = at(x, y);
      sr += data[i];
      sg += data[i + 1];
      sb += data[i + 2];
    }
    sr /= 4;
    sg /= 4;
    sb /= 4;
    const tol = (sr + sg + sb) / 3 < 80 ? 34 : 64;
    const tol2 = tol * tol;
    const near = (i) => {
      const dr = data[i] - sr, dg = data[i + 1] - sg, db = data[i + 2] - sb;
      return dr * dr + dg * dg + db * db <= tol2;
    };
    const visited = new Uint8Array(W * H);
    const stack = [];
    const push = (x, y) => {
      if (x < 0 || x >= W || y < 0 || y >= H) return;
      const p = y * W + x;
      if (!visited[p]) {
        visited[p] = 1;
        stack.push(p);
      }
    };
    for (let x = 0; x < W; x++) {
      push(x, 0);
      push(x, H - 1);
    }
    for (let y = 0; y < H; y++) {
      push(0, y);
      push(W - 1, y);
    }
    while (stack.length) {
      const p = stack.pop();
      const i = p * 4;
      if (!near(i)) continue;
      data[i + 3] = 0;
      const x = p % W, y = (p - x) / W;
      push(x + 1, y);
      push(x - 1, y);
      push(x, y + 1);
      push(x, y - 1);
    }
    c.putImageData(img, 0, 0);
    return off;
  } catch {
    return im;
  }
}
const MAX_FRAME_PX = 512;
function sliceSheet(sheetUrl, frames, chromaKey) {
  return new Promise((resolve, reject) => {
    const im = new Image();
    if (chromaKey) im.crossOrigin = "anonymous";
    im.onload = () => {
      try {
        const n = Math.max(1, frames || 1);
        const source = chromaKey ? removeBg(im) : im;
        const cellW = im.naturalWidth / n, cellH = im.naturalHeight;
        const scale = Math.min(1, MAX_FRAME_PX / Math.max(cellW, cellH));
        const cv = document.createElement("canvas");
        cv.width = Math.max(1, Math.round(cellW * scale));
        cv.height = Math.max(1, Math.round(cellH * scale));
        const ctx = cv.getContext("2d");
        if (!ctx) {
          reject(new Error("no 2d context"));
          return;
        }
        const urls = [];
        for (let i = 0; i < n; i++) {
          ctx.clearRect(0, 0, cv.width, cv.height);
          ctx.drawImage(source, i * cellW, 0, cellW, cellH, 0, 0, cv.width, cv.height);
          urls.push(cv.toDataURL("image/png"));
        }
        resolve(urls);
      } catch (e) {
        reject(e);
      }
    };
    im.onerror = (e) => reject(e);
    im.src = sheetUrl;
  });
}
function useSpriteFrames(sheet, frames, chromaKey, onError) {
  const urls = ref([]);
  let token = 0;
  watchEffect(() => {
    const u = sheet(), n = frames(), chroma = chromaKey();
    const t = ++token;
    if (!u || typeof Image === "undefined") {
      urls.value = [];
      return;
    }
    sliceSheet(u, n, chroma).then(
      (list) => {
        if (t === token) urls.value = list;
      },
      (e) => {
        if (t === token) {
          urls.value = [];
          onError == null ? void 0 : onError(e);
        }
      }
    );
  });
  return { urls };
}
export {
  useSpriteFrames as u
};
