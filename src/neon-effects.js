// === NEON EFFECTS ULTRA - REVISITATO E OTTIMIZZATO PER LA PERFORMANCE ===

// --- 1. Scroll reveal (Come prima) ---
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


// --- 3. Particles background (Rete Interattiva Dinamica) ---
const canvas = document.createElement('canvas');
canvas.id = 'neonParticles';
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null };

// Dati di riferimento per la scalatura
const BASE_WIDTH = 1800;
const BASE_HEIGHT = 1920;
const BASE_PARTICLE_COUNT = 170;
const DENSITY_FACTOR = BASE_PARTICLE_COUNT / (BASE_WIDTH * BASE_HEIGHT);

const BASE_CONNECTION_DISTANCE = 250; // Distanza originale
const BASE_REPEL_RADIUS = 120;         // Raggio originale di repulsione

// Variabili che verranno scalate dinamicamente
let scaledConnectionDistance = BASE_CONNECTION_DISTANCE;
let scaledRepelRadius = BASE_REPEL_RADIUS;


function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Calcola il fattore di scala
  // Usiamo la dimensione minima (width o height) per una scalatura proporzionale.
  const scaleFactor = Math.min(canvas.width, canvas.height) / Math.min(BASE_WIDTH, BASE_HEIGHT);
  
  // Scalatura degli effetti
  scaledConnectionDistance = BASE_CONNECTION_DISTANCE * scaleFactor;
  scaledRepelRadius = BASE_REPEL_RADIUS * scaleFactor;
  
  // Ricalcolo Dinamico delle Particelle
  updateParticleCount();
}
window.addEventListener('resize', resizeCanvas);


function updateParticleCount() {
    const currentArea = canvas.width * canvas.height;

    // Calcola il nuovo numero di particelle in base alla densità
    const newCount = Math.floor(currentArea * DENSITY_FACTOR);
    
    // Imposta un minimo e un massimo per limitare l'uso di risorse
    const finalCount = Math.max(50, Math.min(300, newCount)); 

    // Se il conteggio è lo stesso, non ricreare tutto l'array (ottimizzazione minore)
    if (particles.length === finalCount) return;

    particles = []; // Svuota l'array precedente
    
    // Inizializzazione Particelle (con il nuovo conteggio dinamico)
    for (let i = 0; i < finalCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        // Velocità leggermente ridotta per schermi più piccoli, se necessario:
        // dx: (Math.random() - 0.5) * 0.5 * scaleFactor * 2, 
        // Per ora manteniamo la velocità originale per semplicità:
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        color: Math.random() > 0.5 ? '#00f0ff' : '#ff00f0'
      });
    }
    
    console.log(`Particelle ricreate: ${finalCount} per area ${canvas.width}x${canvas.height}`);
}

// Inizializza tutto al caricamento della pagina
resizeCanvas(); 

// Funzione Modificata: Disegna le linee di connessione
function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const p1 = particles[i];
      const p2 = particles[j];
      const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

      // Usa la distanza scalata dinamicamente (scaledConnectionDistance)
      if (dist < scaledConnectionDistance) {
        ctx.beginPath();
        // Colore delle linee a bassa opacità
        ctx.strokeStyle = `rgba(0, 240, 255, ${1 - dist / scaledConnectionDistance})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
  }
}

// Funzione Modificata: Gestisce l'interazione con il mouse (repulsione)
function handleMouse() {
    if (mouse.x === null) return;
    
    for (let p of particles) {
        const distToMouse = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        
        // Usa il raggio di repulsione scalato dinamicamente (scaledRepelRadius)
        if (distToMouse < scaledRepelRadius) {
            // Calcola la forza di repulsione
            const force = (scaledRepelRadius - distToMouse) / scaledRepelRadius * 0.2;
            const angle = Math.atan2(p.y - mouse.y, p.x - mouse.x);
            
            p.x += Math.cos(angle) * force;
            p.y += Math.sin(angle) * force;
        }
    }
}

// Event Listener per la posizione del mouse (COME PRIMA)
document.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
document.addEventListener('mouseleave', () => {
  mouse.x = null;
  mouse.y = null;
});


function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // 1. Disegna le connessioni
  drawConnections();
  
  // 2. Aggiorna posizione delle particelle
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    // Aggiungi un glow alle particelle
    ctx.shadowBlur = 5;
    ctx.shadowColor = p.color;
    ctx.fill();
    
    // Aggiornamento movimento
    p.x += p.dx;
    p.y += p.dy;
    
    // Rimbalzo
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  }
  
  // 3. Gestisce la repulsione del mouse
  handleMouse();
}

// Richiama il loop ad una frequenza fissa (30 FPS)
setInterval(()=> drawParticles(), 1000/30)