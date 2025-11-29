/**
 * ==========================================
 * ARQUIVO DE LÓGICA (JAVASCRIPT)
 * ==========================================
 * Este arquivo controla:
 * 1. O efeito de digitação (Typewriter).
 * 2. A chuva de elementos (Corações e Palavras).
 */

/**
 * ==========================================
 * 1. CONFIGURAÇÕES GERAIS
 * ==========================================
 */
const CONFIG = {
    message: ` Pra mim, você é...
    `,
    typingSpeed: 50, // ms por caractere
    delayBeforeRain: 10, // ms antes da chuva começar
    rainIntensity: 200, // ms entre cada novo item
    maxItemsOnScreen: 50, // Limite para não travar
    hearts: ['❤️', '💖', '💝', '💕', '💗', '💓', '💞'],
    words: [
        "linda",
        "meu amor",
        "perfeita",
        "minha paz",
        "minha sorte grande",
        "incrível",
        "minha inspiração",
        "minha flor",
        "minha luz",
        "minha alegria",
        "cheiro bom de abraço",
        "razão de tantos sorrisos",
        "meu ponto fraco",
        "meu carinho constante",
        "meu porto seguro",
        "princesa",
        "minha prioridade",
        "meu abraço favorito",
        "minha companheira",
        "meu coração grita seu nome",
        "meu universo inteiro",
        "meu refúgio preferido",
        "meu sorriso diário",
        "meu pedaço de céu",
        "minha calmaria em dias turbulentos",
        "meu encanto diário",
        "meu farol em noites escuras",
        "meu sonho realizado",
        "meu abraço de ficar",
        "minha cura silenciosa",
        "minha razão de acreditar",
        "meu amor sereno",
        "meu bem mais precioso"],
    minDuration: 3, // Segundos (queda rápida)
    maxDuration: 7  // Segundos (queda lenta)
};

// Variáveis Globais (inicializadas no DOMContentLoaded para segurança)
let textElement;
let rainContainer;
let isRaining = false;
let rainInterval;
let activeItemsCount = 0;

/**
 * ==========================================
 * 2. FUNÇÕES PRINCIPAIS
 * ==========================================
 * 
 * Inicializa a aplicação quando o DOM estiver pronto.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa referências aos elementos
    textElement = document.getElementById('typewriter-text');
    rainContainer = document.getElementById('rain-container');

    // Verificação de segurança
    if (!textElement) {
        console.error("Elemento 'typewriter-text' não encontrado!");
        return;
    }
    if (!rainContainer) {
        console.error("Elemento 'rain-container' não encontrado!");
        // Tenta criar se não existir (fallback)
        rainContainer = document.createElement('div');
        rainContainer.id = 'rain-container';
        rainContainer.className = 'rain-container';
        document.body.appendChild(rainContainer);
    }

    startTypewriter();
});

/**
 * Efeito de Máquina de Escrever (Typewriter)
 * Escreve a mensagem letra por letra.
 */
function startTypewriter() {
    const text = CONFIG.message;
    let index = 0;

    textElement.textContent = ""; // Limpa texto anterior
    textElement.classList.remove('typing-done'); // Mostra o cursor

    function type() {
        if (index < text.length) {
            textElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, CONFIG.typingSpeed);
        } else {
            // Terminou de digitar
            textElement.classList.add('typing-done'); // Esconde cursor

            // Aguarda um pouco e inicia a chuva
            setTimeout(startRain, CONFIG.delayBeforeRain);
        }
    }

    type();
}

/**
 * Inicia a chuva de elementos.
 * Cria um intervalo que gera itens periodicamente.
 */
function startRain() {
    if (isRaining) return;
    isRaining = true;

    // Se houver botão de replay (opcional), mostra ele
    const replayBtn = document.getElementById('replay-btn');
    if (replayBtn) {
        setTimeout(() => {
            replayBtn.classList.remove('hidden');
        }, 2000);
    }

    rainInterval = setInterval(() => {
        // Limite de segurança para não travar o navegador
        if (activeItemsCount < CONFIG.maxItemsOnScreen) {
            createFallingItem();
        }
    }, CONFIG.rainIntensity);
}

/**
 * Cria um único item caindo (Coração ou Palavra).
 * Define posição, tamanho e velocidade aleatórios.
 */
function createFallingItem() {
    if (!rainContainer) return;

    // WRAPPER: Controla a queda
    const wrapper = document.createElement('div');
    wrapper.classList.add('falling-wrapper');

    // ITEM: O conteúdo real (coração ou palavra)
    const item = document.createElement('div');
    item.classList.add('falling-item');

    // Decide aleatoriamente se é coração ou palavra (50% chance)
    const isHeart = Math.random() > 0.5;

    if (isHeart) {
        item.classList.add('heart');
        // Escolhe um emoji de coração aleatório
        item.textContent = CONFIG.hearts[Math.floor(Math.random() * CONFIG.hearts.length)];
        item.style.fontSize = Math.random() * 20 + 20 + 'px'; // Tamanho entre 20px e 40px
    } else {
        item.classList.add('word');
        // Escolhe uma palavra aleatória
        item.textContent = CONFIG.words[Math.floor(Math.random() * CONFIG.words.length)];
        item.style.fontSize = Math.random() * 10 + 14 + 'px'; // Tamanho entre 14px e 24px
    }

    // Posição horizontal aleatória (0% a 90% da largura da tela)
    // Aplicamos ao WRAPPER
    wrapper.style.left = Math.random() * 90 + 'vw';

    // Velocidade de queda aleatória
    // Aplicamos ao WRAPPER
    const duration = Math.random() * (CONFIG.maxDuration - CONFIG.minDuration) + CONFIG.minDuration;
    wrapper.style.animationDuration = duration + 's';

    // Rotação aleatória removida
    // item.style.setProperty('--base-rotation', `${randomRotation}deg`);

    // Adiciona acessibilidade
    wrapper.setAttribute('role', 'button');
    wrapper.setAttribute('aria-label', `Clique para interagir com ${item.textContent}`);

    // Adiciona evento de clique ao WRAPPER (área de clique melhor)
    wrapper.addEventListener('click', (e) => handleItemClick(e, item));

    // Monta a estrutura
    wrapper.appendChild(item);
    rainContainer.appendChild(wrapper);
    activeItemsCount++;

    // Remove o item quando a animação terminar para liberar memória
    wrapper.addEventListener('animationend', () => {
        wrapper.remove();
        activeItemsCount--;
    });
}

/**
 * Lida com o clique em um item caindo.
 * Adiciona/Remove classe de brilho e efeito sonoro (opcional).
 */
function handleItemClick(event, itemElement) {
    // Se passarmos o elemento diretamente (do wrapper), usamos ele.
    // Caso contrário, pegamos do target (fallback).
    const item = itemElement || event.target;

    // Toca o som de "pop"
    playPopSound();

    // Alterna a classe 'glow' (brilho)
    item.classList.toggle('glow');
}

/**
 * Gera um som simples de "pop" usando Web Audio API.
 * Não requer arquivos externos.
 */
function playPopSound() {
    // Verifica se está mudo
    if (typeof isMuted !== 'undefined' && isMuted) return;

    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return; // Navegador não suporta

        const audioCtx = new AudioContext();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); // Frequência inicial
        oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1); // Cai rápido (efeito pop)

        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); // Volume baixo
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
        console.warn("Erro ao tocar som:", e);
    }
}

/**
 * ==========================================
 * 3. INTERATIVIDADE (NOVAS FUNÇÕES)
 * ==========================================
 */

// --- CONTROLE DE MUDO ---
// Inicializa apenas se o elemento existir
const muteBtn = document.getElementById('mute-btn');
if (muteBtn) {
    muteBtn.addEventListener('click', () => {
        // Variável global isMuted precisa ser definida se usarmos
        if (typeof isMuted === 'undefined') window.isMuted = false;

        window.isMuted = !window.isMuted;
        muteBtn.textContent = window.isMuted ? '🔇' : '🔊';
        muteBtn.setAttribute('aria-label', window.isMuted ? 'Ativar som' : 'Silenciar som');
    });
}

// --- BOTÃO DE REPLAY ---
const replayBtn = document.getElementById('replay-btn');
if (replayBtn) {
    replayBtn.addEventListener('click', () => {
        // 1. Limpa a chuva existente
        clearInterval(rainInterval);
        isRaining = false;
        activeItemsCount = 0;
        if (rainContainer) rainContainer.innerHTML = ''; // Remove todos os itens

        // 2. Esconde o botão
        replayBtn.classList.add('hidden');

        // 3. Reinicia o Typewriter
        startTypewriter();
    });
}


// --- INTERAÇÃO COM MOUSE (REPELIR) ---
document.addEventListener('mousemove', (e) => {
    // Otimização: Só calcula se houver itens
    if (activeItemsCount === 0) return;

    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const radius = 150; // Raio de influência

    const items = document.querySelectorAll('.falling-wrapper');

    items.forEach(wrapper => {
        const rect = wrapper.getBoundingClientRect();
        const itemX = rect.left + rect.width / 2;
        const itemY = rect.top + rect.height / 2;

        const dist = Math.hypot(mouseX - itemX, mouseY - itemY);

        if (dist < radius) {
            const angle = Math.atan2(itemY - mouseY, itemX - mouseX);
            const force = (radius - dist) / radius; // 0 a 1
            const moveX = Math.cos(angle) * force * 50; // Move até 50px
            const moveY = Math.sin(angle) * force * 50;

            wrapper.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
            wrapper.style.transform = ''; // Reseta se longe
        }
    });
});
