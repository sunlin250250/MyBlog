const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);

function drawCircle(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function Firework(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = 0;
    this.maxRadius = Math.random() * 50 + 20;
    this.growing = true;
    this.opacity = 1.0;

    this.update = function() {
        if (this.growing && this.radius < this.maxRadius) {
            this.radius += 2;
        } else {
            this.growing = false;
        }

        if (!this.growing) {
            this.opacity -= 0.02;
            if (this.opacity <= 0) {
                return false;
            }
        }

        ctx.globalAlpha = this.opacity;
        drawCircle(this.x, this.y, this.radius, this.color);
        ctx.globalAlpha = 1.0;

        return true;
    };
}

let fireworks = [];

function addFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    fireworks.push(new Firework(x, y, color));
}

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = fireworks.length - 1; i >= 0; i--) {
        if (!fireworks[i].update()) {
            fireworks.splice(i, 1);
        }
    }

    if (Math.random() < 0.1) {
        addFirework();
    }
}

animate();