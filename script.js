// CONFIGURACIÓN DE SUPABASE
// Reemplaza estos valores con los que te da Supabase en Settings > API
const SUPABASE_URL = 'https://asxxamhytbaehkwgxtlx.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzeHhhbWh5dGJhZWhrd2d4dGx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4ODc0NjAsImV4cCI6MjA5ODQ2MzQ2MH0.B0iCzQiwb7jm_UPwbjMM4wzvfBx3TQU4coRpFrGaKCE';
let supabaseclient = null;
if (window.supabase) {
    supabaseclient =
        supabase.createClient(
            SUPABASE_URL,
            SUPABASE_KEY
        );
}


// Generador de estrellas de fondo
function buildSpace() {
    const container = document.getElementById('space-container');
    const density = 140;
    container.innerHTML = '';
    for (let i = 0; i < density; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        if (Math.random() > 0.65) star.classList.add('yellow');
        star.style.width = `${Math.random() * 2.5}px`;
        star.style.height = star.style.width;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 4 + 2}s`;
        container.appendChild(star);
    }
}
// Array de párrafos ordenados para la paginación interactiva
const paragraphs = [
    `En la luna y el sol se encuentran la belleza y el poder de Dios y, aun así, al mirar tu reflejo puedo ver su mejor creación.`,
    `Me gustas... o tal vez podría decir que me encantas.`,
    
    `He tratado de decírtelo, aunque los nervios me ganan; mi mente se nubla al estar cerca de ti. Sinceramente, el simple hecho de estar a solas contigo es suficiente para no pensar en nada más.`,
    
    `Hubiera querido decírtelo antes, pero mi mente me saboteaba. De hecho, más de una vez escribí mensajes diciéndote lo que siento... y terminé borrándolos.`,

    `Aun cuando los nervios me ganan, no quisiera perder la oportunidad de decírtelo. Lastimosamente, no suelo darte muchos halagos sobre tu belleza, pero me encantaría que supieras lo única, bella, hermosa y preciosa que eres. Eres alguien muy especial para mí. Me encanta cuando sonríes; me fascina escucharte. Tu canto desvía toda mi atención hacia tu voz, y tu forma de distraerte suele convertirse en mi momento favorito de admiración.`,
    `Deseo que conozcas este sentimiento. No quisiera que todo terminara sin haberlo intentado. No sé si sea lo correcto o lo mejor; suelo sabotearme y pensar que tal vez debería dejar de lado mis sentimientos para enfocarme en mejorar. Pero sé que podría arrepentirme en el futuro si no lo intento, al menos, una vez más.`
];

let currentParagraphIndex = 0;
let charIndex = 0;
const box = document.getElementById('message-box');
const nextBtn = document.getElementById('next-trigger');
let currentDiv = null;
let poemasCargados = false;


// Elementos globales de audio unificados
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-toggle');
if (musicBtn) {
    musicBtn.classList.toggle('hidden');
}
// Efecto Typewriter para el párrafo activo
function typeParagraph() {
    const text = paragraphs[currentParagraphIndex];
    
    if (charIndex < text.length) {
        currentDiv.innerHTML += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeParagraph, 22); // Velocidad óptima de lectura
    } else {

        // Agregar cursor parpadeante al final del párrafo activo
        const cursor =
        document.createElement('span');

        cursor.className = 'cursor';

        currentDiv.appendChild(cursor);
        
        // Pasamos al siguiente índice AQUÍ, cuando la animación de tipeo real terminó
        currentParagraphIndex++;
        
        // Configurar el texto del botón dinámicamente
        if (currentParagraphIndex < paragraphs.length) {
            nextBtn.innerText = "Siguiente fragmento";
        } else {
            nextBtn.innerText = "Abrir transmisión final";
        }
        nextBtn.style.display = 'block';
        smoothScroll();
    }
}
// Avanzar al siguiente bloque
function advanceParagraph() {
    nextBtn.style.display = 'none';
    
    // Remover el cursor del párrafo que acaba de terminar y atenuarlo
    if (currentDiv) {
        const cursor = currentDiv.querySelector('.cursor');
        if (cursor) cursor.remove();
        currentDiv.classList.add('faded');
    }
    // Si quedan párrafos por escribir en la lista
    if (currentParagraphIndex < paragraphs.length) {
        charIndex = 0;
        currentDiv = document.createElement('div');
        currentDiv.classList.add('paragraph-block');
        box.appendChild(currentDiv);
        
        typeParagraph();
    } else {
        // Si ya se mostraron todos los párrafos, despliega la propuesta final
        document.getElementById('final-panel').style.display = 'block';
        smoothScroll();
    }
}

// Asegurar volumen al 50% al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    if (music) music.volume = 0.5;
});

// Control de inicio de la experiencia
function startExperience() {

    
    // Configurar volumen e iniciar reproducción
    music.volume = 0.5;
    music.play()
    .catch(err => {
        console.log("Audio bloqueado:", err);
    });    
    
    // Mostrar el botón de volumen con transición suave
    musicBtn.classList.remove('hidden');

    // Ocultar el botón de poesías al iniciar la lectura
    document.getElementById('open-sidebar-btn').classList.add('hidden-state');

    const welcome = document.getElementById('welcome-screen');
    const terminal = document.getElementById('main-terminal');
    
    welcome.style.opacity = '0';
    welcome.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        welcome.style.display = 'none';
        terminal.style.display = 'block';
        setTimeout(() => {
            terminal.style.opacity = '1';
            terminal.style.transform = 'scale(1)';
            advanceParagraph();
        }, 50);
    }, 1000);
}

// Función nueva para volver al panel principal
function resetExperience() {
    // Restaurar índices de control
    currentParagraphIndex = 0;
    charIndex = 0;
    box.innerHTML = ''; 
    
    // Ocultar terminal y panel final
    document.getElementById('main-terminal').style.display = 'none';
    document.getElementById('main-terminal').style.opacity = '0';
    document.getElementById('main-terminal').style.transform = 'scale(0.95)';
    document.getElementById('final-panel').style.display = 'none';
    nextBtn.style.display = 'none';
    currentDiv = null;

    // Hacer reaparecer el botón de poesías de forma segura
    document.getElementById('open-sidebar-btn').classList.remove('hidden-state');

    // Volver a mostrar la bienvenida
    const welcome = document.getElementById('welcome-screen');
    welcome.style.display = 'flex';
    setTimeout(() => {
        welcome.style.opacity = '1';
        welcome.style.transform = 'translateY(0)';
    }, 50);
    
    // Scroll arriba suave
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function smoothScroll() {
    setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
}
    
function toggleMusic(){
    if(music.paused){
        music.play();
        musicBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        musicBtn.classList.remove('muted');
    } else {
        music.pause();
        musicBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        musicBtn.classList.add('muted');
    }
}


window.addEventListener(
    'load',
    buildSpace
);




function toggleSidebar(open) {
    const sidebar = document.getElementById('sidebar-poemas');
    if (open) {
        sidebar.classList.add('active');
        // Solo hace la petición si no se han cargado antes
        if (!poemasCargados) {
            fetchPoemas();
        }
    } else {
        sidebar.classList.remove('active');
    }
}

// Traer poemas desde Supabase
async function fetchPoemas() {
    const container = document.getElementById('cards-container');
    
    try {
        const { data: poemas, error } = await supabaseclient
            .from('poemas')
            .select('*')
            .order('creado_en', { ascending: false });

        if (error) throw error;

        if (!poemas || poemas.length === 0) {
            container.innerHTML = '<p class="loading-text">Aún no hay poemas guardados por el sistema.</p>';
            return;
        }

        container.innerHTML = ''; // Limpiar texto de carga
        poemas.forEach(poema => {
            const card = document.createElement('div');
            card.classList.add('poem-card');
            
            const h3 = document.createElement('h3'); 
            h3.textContent = poema.titulo;
            card.appendChild(h3);

            card.onclick = () => openNotebook(poema.titulo, poema.contenido);
            container.appendChild(card);
        });

        // Marcar como cargado exitosamente para no repetir el fetch
        poemasCargados = true; 

    } catch (error) {
        console.error('Error cargando poemas:', error);
        container.innerHTML = '<p class="loading-text">Fallo en el enlace cuántico de datos.</p>';
    }
}

// Abrir Bloc de Notas con el poema seleccionado
function openNotebook(titulo, contenido) {
    document.getElementById('notebook-title').innerText = titulo;
    document.getElementById('notebook-content').innerText = contenido;
    document.getElementById('notebook-modal').style.display = 'flex';
}

function closeNotebook() {
    document.getElementById('notebook-modal').style.display = 'none';
}