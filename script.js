const canvas = document.getElementById('bg-stars');
const ctx = canvas.getContext('2d');

const particles = Array.from({ length: 140 }, () => ({
  x: Math.random(),
  y: Math.random(),
  z: Math.random() * 0.7 + 0.3,
  vx: (Math.random() - 0.5) * 0.00045,
  vy: (Math.random() - 0.5) * 0.00045,
}));

function resize() {
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}

function draw() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  ctx.clearRect(0, 0, w, h);

  for (const p of particles) {
    p.x = (p.x + p.vx + 1) % 1;
    p.y = (p.y + p.vy + 1) % 1;

    const x = p.x * w;
    const y = p.y * h;
    const r = p.z * 1.8;

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(167, 190, 255, ${0.2 + p.z * 0.4})`;
    ctx.fill();
  }

  ctx.strokeStyle = 'rgba(118, 149, 255, 0.09)';
  ctx.lineWidth = 1;
  for (let i = 0; i < particles.length; i += 2) {
    const a = particles[i];
    const b = particles[(i + 17) % particles.length];
    const ax = a.x * w;
    const ay = a.y * h;
    const bx = b.x * w;
    const by = b.y * h;
    const d = Math.hypot(ax - bx, ay - by);
    if (d < 160) {
      ctx.globalAlpha = 1 - d / 160;
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }

  requestAnimationFrame(draw);
}

window.addEventListener('resize', resize);
resize();
draw();
