// Mathematical curves for the surface of the glass
const SURFACE_FNS = {
    convex_squircle: (x: number) => Math.pow(1 - Math.pow(1 - x, 4), 0.25),
    convex_circle: (x: number) => Math.sqrt(1 - (1 - x) * (1 - x)),
    concave: (x: number) => 1 - Math.sqrt(1 - (1 - x) * (1 - x)),
};

// Calculates how light bends through the specified thickness and IOR
function calculateRefractionProfile(glassThickness: number, bezelWidth: number, heightFn: (x: number) => number, ior: number, samples = 128) {
    const eta = 1 / ior;
    function refract(nx: number, ny: number) {
        const dot = ny;
        const k = 1 - eta * eta * (1 - dot * dot);
        if (k < 0) return null;
        const sq = Math.sqrt(k);
        return [-(eta * dot + sq) * nx, eta - (eta * dot + sq) * ny];
    }
    const profile = new Float64Array(samples);
    for (let i = 0; i < samples; i++) {
        const x = i / samples;
        const y = heightFn(x);
        const dx = x < 1 ? 0.0001 : -0.0001;
        const y2 = heightFn(x + dx);
        const deriv = (y2 - y) / dx;
        const mag = Math.sqrt(deriv * deriv + 1);
        const ref = refract(-deriv / mag, -1 / mag);
        if (!ref) {
            profile[i] = 0;
            continue;
        }
        profile[i] = ref[0] * ((y * bezelWidth + glassThickness) / ref[1]);
    }
    return profile;
}

// Generates an image buffer (Displacement Map)
function generateDisplacementMap(w: number, h: number, radius: number, bezelWidth: number, profile: Float64Array, maxDisp: number) {
    if(w === 0 || h === 0) return '';
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    if(!ctx) return '';
    const img = ctx.createImageData(w, h);
    const d = img.data;
    
    // Initialization (r:128, g:128, b:0, a:255)
    for (let i = 0; i < d.length; i += 4) { d[i] = 128; d[i + 1] = 128; d[i + 2] = 0; d[i + 3] = 255; }

    const r = radius, rSq = r * r, r1Sq = (r + 1) ** 2;
    const rBSq = Math.max(r - bezelWidth, 0) ** 2;
    const wB = w - r * 2, hB = h - r * 2, S = profile.length;

    for (let y1 = 0; y1 < h; y1++) {
        for (let x1 = 0; x1 < w; x1++) {
            const x = x1 < r ? x1 - r : x1 >= w - r ? x1 - r - wB : 0;
            const y = y1 < r ? y1 - r : y1 >= h - r ? y1 - r - hB : 0;
            const dSq = x * x + y * y;
            if (dSq > r1Sq || dSq < rBSq) continue;
            const dist = Math.sqrt(dSq);
            const fromSide = r - dist;
            const op = dSq < rSq ? 1 : 1 - (dist - Math.sqrt(rSq)) / (Math.sqrt(r1Sq) - Math.sqrt(rSq));
            if (op <= 0 || dist === 0) continue;
            
            const cos = x / dist, sin = y / dist;
            const bi = Math.min(((fromSide / bezelWidth) * S) | 0, S - 1);
            const disp = profile[bi] || 0;
            const dX = (-cos * disp) / maxDisp, dY = (-sin * disp) / maxDisp;
            const idx = (y1 * w + x1) * 4;
            d[idx] = (128 + dX * 127 * op + 0.5) | 0;
            d[idx + 1] = (128 + dY * 127 * op + 0.5) | 0;
        }
    }
    ctx.putImageData(img, 0, 0);
    return c.toDataURL();
}

// Generates an image buffer (Specular Reflection Map)
function generateSpecularMap(w: number, h: number, radius: number, bezelWidth: number, angle = Math.PI / 3) {
    if(w === 0 || h === 0) return '';
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    if(!ctx) return '';
    const img = ctx.createImageData(w, h);
    const d = img.data;
    d.fill(0);

    const r = radius, rSq = r * r, r1Sq = (r + 1) ** 2;
    const rBSq = Math.max(r - bezelWidth, 0) ** 2;
    const wB = w - r * 2, hB = h - r * 2;
    const sv = [Math.cos(angle), Math.sin(angle)];

    for (let y1 = 0; y1 < h; y1++) {
        for (let x1 = 0; x1 < w; x1++) {
            const x = x1 < r ? x1 - r : x1 >= w - r ? x1 - r - wB : 0;
            const y = y1 < r ? y1 - r : y1 >= h - r ? y1 - r - hB : 0;
            const dSq = x * x + y * y;
            if (dSq > r1Sq || dSq < rBSq) continue;
            const dist = Math.sqrt(dSq);
            const fromSide = r - dist;
            const op = dSq < rSq ? 1 : 1 - (dist - Math.sqrt(rSq)) / (Math.sqrt(r1Sq) - Math.sqrt(rSq));
            if (op <= 0 || dist === 0) continue;
            
            const cos = x / dist, sin = -y / dist;
            const dot = Math.abs(cos * sv[0] + sin * sv[1]);
            const edge = Math.sqrt(Math.max(0, 1 - (1 - fromSide) ** 2));
            const coeff = dot * edge;
            const col = (255 * coeff) | 0;
            const alpha = (col * coeff * op) | 0;
            const idx = (y1 * w + x1) * 4;
            d[idx] = col; d[idx + 1] = col; d[idx + 2] = col; d[idx + 3] = alpha;
        }
    }
    ctx.putImageData(img, 0, 0);
    return c.toDataURL();
}

export function generateLiquidGlassFilterMaps(w: number, h: number, radius: number) {
    const bezel = 12;
    const thickness = 10;
    const ior = 1.3;
    const maxDisp = 10;
    
    const profile = calculateRefractionProfile(thickness, bezel, SURFACE_FNS.convex_squircle, ior);
    const dispUrl = generateDisplacementMap(w, h, radius, bezel, profile, maxDisp);
    const specUrl = generateSpecularMap(w, h, radius, bezel);
    
    return { dispUrl, specUrl };
}
