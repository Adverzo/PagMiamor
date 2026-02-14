// PERSONALIZA ESTAS PREGUNTAS CON VUESTROS DATOS
// Reemplaza las preguntas y respuestas con información sobre ustedes
const preguntas = [
    {
        pregunta: "¿Cuál es mi color favorito?",
        opciones: ["Negro", "Blanco", "Rojo", "Azul"],
        respuestaCorrecta: 0 // Índice de la respuesta correcta (0, 1, 2, 3...)
    },
    {
        pregunta: "¿Cuál es mi comida favorita?",
        opciones: ["Pizza", "Pasta", "Tacos", "Sushi"],
        respuestaCorrecta: 2
    },
    {
        pregunta: "¿Cuál es mi serie favorita?",
        opciones: ["Breaking Bad", "The Office", "Stranger Things", "Game of Thrones"],
        respuestaCorrecta: 1
    },
    {
        pregunta: "¿Cuál es mi animal favorito?",
        opciones: ["Perro", "Gato", "Panda", "Águila"],
        respuestaCorrecta: 1
    },
    {
        pregunta: "¿Cuánto me amas? 😉",
        opciones: ["Un poco", "Mucho", "Muchísimo", "Infinito"],
        respuestaCorrecta: 3
    },
    {
        pregunta: "¿Cómo nos conocimos?",
        opciones: ["En Twitch", "En Valorant", "En LOL", "En Fortnite"],
        respuestaCorrecta: 0
    },
    {
        pregunta: "¿Cuál es mi videojuego favorito?",
        opciones: ["Red Dead Redemption 2", "The Witcher 3", "GTA V", "Cyberpunk 2077"],
        respuestaCorrecta: 0
    },
    {
        pregunta: "¿Cuál fue el primer videojuego que jugamos juntos?",
        opciones: ["Valorant", "CS:GO", "Rainbow Six", "League of Legends"],
        respuestaCorrecta: 0
    },
    {
        pregunta: "¿Quién es la mujer más linda del mundo?",
        opciones: ["Michel Mendoza Castillo", "La chaparrita", "El mejor cyper del mundo (mi novia)", "Tu"],
        respuestaCorrecta: 0,
        todasCorrectas: true
    }
];

let preguntaActual = 0;
let puntuacion = 0;
let respondida = false;

function mostrarScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function iniciarQuiz() {
    preguntaActual = 0;
    puntuacion = 0;
    respondida = false;
    document.getElementById('total-questions').textContent = preguntas.length;
    mostrarScreen('quiz');
    mostrarPregunta();
}

function mostrarPregunta() {
    respondida = false;
    const pregunta = preguntas[preguntaActual];
    
    // Actualizar números
    document.getElementById('current-question').textContent = preguntaActual + 1;
    document.getElementById('question-text').textContent = pregunta.pregunta;
    
    // Actualizar barra de progreso
    const progreso = ((preguntaActual) / preguntas.length) * 100;
    document.getElementById('progress-bar').style.width = progreso + '%';
    
    // Generar opciones
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    
    pregunta.opciones.forEach((opcion, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opcion;
        btn.onclick = () => seleccionarOpcion(index);
        container.appendChild(btn);
    });
}

function seleccionarOpcion(index) {
    if (respondida) return;
    
    respondida = true;
    const pregunta = preguntas[preguntaActual];
    const botones = document.querySelectorAll('.option-btn');
    
    // Si todas las respuestas son correctas
    if (pregunta.todasCorrectas) {
        botones[index].classList.add('correct');
        puntuacion++;
    } else {
        // Mostrar respuesta correcta
        botones[pregunta.respuestaCorrecta].classList.add('correct');
        
        // Marcar respuesta del usuario
        if (index === pregunta.respuestaCorrecta) {
            botones[index].classList.add('correct');
            puntuacion++;
        } else {
            botones[index].classList.add('incorrect');
        }
    }
    
    // Deshabilitar todos los botones
    botones.forEach(btn => btn.disabled = true);
    
    // Pasar a siguiente pregunta después de 1.5 segundos
    setTimeout(() => {
        preguntaActual++;
        if (preguntaActual < preguntas.length) {
            mostrarPregunta();
        } else {
            mostrarResultados();
        }
    }, 1500);
}

function mostrarResultados() {
    const porcentaje = (puntuacion / preguntas.length) * 100;
    
    document.getElementById('score').textContent = puntuacion;
    document.getElementById('max-score').textContent = preguntas.length;
    
    // Cambiar mensaje según puntuación
    let titulo = '';
    let mensaje = '';
    let emoji = '';
    
    if (porcentaje === 100) {
        titulo = '¡Perfecto! ¡Me conoces perfectamente! ❤️';
        mensaje = 'Te amo muchísimo, mi chaparrita. Eres increíble.';
        emoji = '❤️💕';
    } else if (porcentaje >= 80) {
        titulo = '¡Excelente! Muy bien.';
        mensaje = 'Me encanta que me conozcas tan bien, mi chaparrita.';
        emoji = '💕';
    } else if (porcentaje >= 60) {
        titulo = 'Muy bien, mi chaparrita.';
        mensaje = 'No está mal, podemos conocernos más.';
        emoji = '💗';
    } else if (porcentaje >= 40) {
        titulo = 'Hay que mejorar...';
        mensaje = 'Pero bueno, mi chaparrita, todavía tenemos tiempo para conocernos más.';
        emoji = '💙';
    } else {
        titulo = '¡Ay mi chaparrita! 😄';
        mensaje = 'Pero no importa, lo importante es que nos amamos.';
        emoji = '💕';
    }
    
    document.getElementById('result-title').textContent = titulo;
    document.getElementById('result-message').textContent = mensaje;
    document.getElementById('result-emoji').textContent = emoji;
    
    mostrarScreen('resultados');
}

function volverAlInicio() {
    mostrarScreen('inicio');
}

function mostrarCancion() {
    mostrarScreen('dedicatoria');
}

function cerrarDedicatoria() {
    // Detener el video si está reproduciéndose
    const videoFrame = document.getElementById('youtube-frame');
    if (videoFrame) {
        videoFrame.src = videoFrame.src; // Esto reinicia el video
    }
    mostrarScreen('inicio');
}
