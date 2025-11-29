# ❤️ Chuva de Palavras - Declaração Romântica

Um projeto web interativo e delicado, criado para fazer uma declaração de amor única. A página exibe uma mensagem sendo digitada estilo "máquina de escrever" e, em seguida, inicia uma chuva de corações e palavras carinhosas.

## ✨ Funcionalidades

*   **Efeito Typewriter:** A mensagem principal é digitada letra por letra na tela.
*   **Chuva de Amor:** Após a mensagem, corações e palavras personalizadas caem do topo da tela.
*   **Interatividade:**
    *   **Clique:** Ao clicar nos itens que caem, eles brilham e fazem um som suave de "pop".
    *   **Mouse:** Os itens se afastam suavemente quando você passa o mouse perto (efeito magnético).
*   **Design Premium:** Estilo moderno com efeito de vidro (Glassmorphism), fontes elegantes e gradientes suaves.
*   **Áudio:** Efeitos sonoros gerados via código (Web Audio API), sem necessidade de arquivos mp3 externos.

## 🚀 Como Usar

1.  Basta abrir o arquivo `index.html` em qualquer navegador moderno (Chrome, Edge, Firefox).
2.  Aguarde a animação da mensagem.
3.  Divirta-se interagindo com a chuva de palavras!

## 🛠️ Como Personalizar

Você pode alterar facilmente as mensagens e as cores.

### 1. Alterar o Texto e as Palavras
Abra o arquivo `script.js` em um editor de texto (como o Bloco de Notas ou VS Code). Logo no início, você verá a configuração:

```javascript
const CONFIG = {
    message: `Sua mensagem principal aqui...
    Pode ter várias linhas!`,
    
    // ... outras configurações ...

    words: [
        "linda",
        "meu amor",
        // Adicione suas próprias palavras aqui!
    ]
};
```

*   **message:** É o texto principal que aparece no centro.
*   **words:** É a lista de palavras que caem como chuva.

### 2. Alterar Cores e Estilo
Abra o arquivo `style.css`. No início do arquivo, na seção `:root`, você pode mudar as cores:

```css
:root {
    --bg-gradient-start: #0f172a; /* Cor de fundo 1 */
    --accent-color: #ec4899;      /* Cor dos corações/palavras */
    /* ... */
}
```

## 💻 Tecnologias Utilizadas

*   **HTML5:** Estrutura semântica.
*   **CSS3:** Animações, Variáveis CSS e Flexbox.
*   **JavaScript (Vanilla):** Lógica de animação e manipulação do DOM sem bibliotecas pesadas.

---
Feito com ❤️.
