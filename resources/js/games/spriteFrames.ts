import { ref, watchEffect, type Ref } from 'vue';

/**
 * Slices a horizontal sprite-strip into per-frame PNG data URLs so frames can be shown with a
 * native SVG <image> element.
 *
 * Why not a <canvas> inside <foreignObject>? iOS Safari does not apply the surrounding SVG's
 * viewBox scaling or ancestor transforms to <foreignObject> content (long-standing WebKit bug),
 * so the characters rendered unscaled in the SVG element's top-left corner on iPhones — the
 * keeper/striker looked "missing" at checkout. Native <image> elements live in SVG user space,
 * so they scale, clip and transform correctly on every engine.
 */

// Strip the background from a sheet that isn't already transparent (AI sheets often export with a
// solid or checkerboard background baked in). Flood-fills inward from every border pixel and stops
// at the figure's outline, so enclosed light areas (gloves, shirt) are kept. The tolerance
// auto-tightens for dark backgrounds so dark outlines survive, and loosens for light/checkerboard.
function removeBg(im: HTMLImageElement): CanvasImageSource {
    try {
        const W = im.naturalWidth, H = im.naturalHeight;
        const off = document.createElement('canvas');
        off.width = W; off.height = H;
        const c = off.getContext('2d', { willReadFrequently: true });
        if (!c) return im;
        c.drawImage(im, 0, 0);
        const img = c.getImageData(0, 0, W, H); // throws if the image is cross-origin tainted
        const data = img.data;
        const at = (x: number, y: number) => (y * W + x) * 4;
        // seed = average of the four corners (the background colour)
        let sr = 0, sg = 0, sb = 0;
        for (const [x, y] of [[0, 0], [W - 1, 0], [0, H - 1], [W - 1, H - 1]] as const) {
            const i = at(x, y); sr += data[i]; sg += data[i + 1]; sb += data[i + 2];
        }
        sr /= 4; sg /= 4; sb /= 4;
        const tol = (sr + sg + sb) / 3 < 80 ? 34 : 64; // tighter for dark bg, looser for light/checkerboard
        const tol2 = tol * tol;
        const near = (i: number) => {
            const dr = data[i] - sr, dg = data[i + 1] - sg, db = data[i + 2] - sb;
            return dr * dr + dg * dg + db * db <= tol2;
        };
        const visited = new Uint8Array(W * H);
        const stack: number[] = [];
        const push = (x: number, y: number) => {
            if (x < 0 || x >= W || y < 0 || y >= H) return;
            const p = y * W + x; if (!visited[p]) { visited[p] = 1; stack.push(p); }
        };
        for (let x = 0; x < W; x++) { push(x, 0); push(x, H - 1); }
        for (let y = 0; y < H; y++) { push(0, y); push(W - 1, y); }
        while (stack.length) {
            const p = stack.pop()!; const i = p * 4;
            if (!near(i)) continue;       // reached the figure → boundary, leave opaque
            data[i + 3] = 0;              // background → transparent
            const x = p % W, y = (p - x) / W;
            push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1);
        }
        c.putImageData(img, 0, 0);
        return off;
    } catch { return im; } // tainted (no CORS) → use the raw sheet
}

// Cap a frame's longest side when re-encoding — sprites display at ~200-500 CSS px, so full-size
// AI sheets (1000px+ per frame) would only bloat the data URLs without looking any sharper.
const MAX_FRAME_PX = 512;

function sliceSheet(sheetUrl: string, frames: number, chromaKey: boolean): Promise<string[]> {
    return new Promise((resolve, reject) => {
        const im = new Image();
        if (chromaKey) im.crossOrigin = 'anonymous'; // only needed to read pixels for chroma-key
        im.onload = () => {
            try {
                const n = Math.max(1, frames || 1);
                const source = chromaKey ? removeBg(im) : im;
                const cellW = im.naturalWidth / n, cellH = im.naturalHeight;
                const scale = Math.min(1, MAX_FRAME_PX / Math.max(cellW, cellH));
                const cv = document.createElement('canvas');
                cv.width = Math.max(1, Math.round(cellW * scale));
                cv.height = Math.max(1, Math.round(cellH * scale));
                const ctx = cv.getContext('2d');
                if (!ctx) { reject(new Error('no 2d context')); return; }
                const urls: string[] = [];
                for (let i = 0; i < n; i++) {
                    ctx.clearRect(0, 0, cv.width, cv.height);
                    ctx.drawImage(source, i * cellW, 0, cellW, cellH, 0, 0, cv.width, cv.height);
                    urls.push(cv.toDataURL('image/png'));
                }
                resolve(urls);
            } catch (e) { reject(e); }
        };
        im.onerror = (e) => reject(e);
        im.src = sheetUrl;
    });
}

/**
 * Reactive sprite-strip slicer. Re-slices whenever the sheet URL, frame count or chroma flag
 * changes (frame count arrives late from auto-detection). `urls` is empty until slicing finishes,
 * so callers can keep their drawn-figure fallback visible while the sheet loads.
 */
export function useSpriteFrames(
    sheet: () => string,
    frames: () => number,
    chromaKey: () => boolean,
    onError?: (e: unknown) => void,
): { urls: Ref<string[]> } {
    const urls = ref<string[]>([]);
    let token = 0;
    watchEffect(() => {
        const u = sheet(), n = frames(), chroma = chromaKey();
        const t = ++token; // stale async results from a previous sheet must never win
        if (!u || typeof Image === 'undefined') { urls.value = []; return; }
        sliceSheet(u, n, chroma).then(
            (list) => { if (t === token) urls.value = list; },
            (e) => { if (t === token) { urls.value = []; onError?.(e); } },
        );
    });
    return { urls };
}
