const container = document.getElementById('rain-container');

const createColumn = () => {
  const column = document.createElement('div');
  column.classList.add('column');
  for (let i = 0; i < 20; i++) {
    const span = document.createElement('span');
    span.textContent = 'Guapa';
    span.classList.add('word');
    column.appendChild(span);
  }
  column.style.margin = "0 8px";
  column.style.animationDuration = `${6 + Math.random() * 4}s`;
  container.appendChild(column);
};

for (let i = 0; i < window.innerWidth / 100; i++) {
  createColumn();
}

const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function Firework() {
  this.x = random(0, canvas.width);
  this.y = canvas.height;
  this.radius = random(2, 4);
  this.color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 60%)`;
  this.speed = random(2, 5);
  this.particles = [];

  this.update = () => {
    this.y -= this.speed;
    if (this.y < random(100, 400)) {
      for (let i = 0; i < 30; i++) {
        this.particles.push(new Particle(this.x, this.y, this.color));
      }
      fireworks.splice(fireworks.indexOf(this), 1);
    }
  };

  this.draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  };
}

function Particle(x, y, color) {
  this.x = x;
  this.y = y;
  this.radius = 2;
  this.color = color;
  this.angle = random(0, Math.PI * 2);
  this.speed = random(1, 6);
  this.life = 60;

  this.update = () => {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.life--;
  };

  this.draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  };
}

const fireworks = [];
const particles = [];

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (Math.random() < 0.05) {
    fireworks.push(new Firework());
  }

  fireworks.forEach(f => {
    f.update();
    f.draw();
  });

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    p.draw();
    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }

  requestAnimationFrame(animate);
}

animate();
