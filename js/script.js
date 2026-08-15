// ==================== NEWSLETTER ====================
const botaoNewsletter = document.getElementById("btnNewsletter");

if (botaoNewsletter) {
    botaoNewsletter.addEventListener("click", () => {
        const emailInput = document.getElementById("emailNewsletter");
        const email = emailInput.value.trim();

        if (!email) {
            alert("Por favor, digite seu e-mail!");
            return;
        }

        localStorage.setItem("newsletterEmail", email);
        alert("E-mail cadastrado com sucesso! Agora você vai receber promoções e novidades.");
        emailInput.value = "";
    });
}

// ==================== CARROSSEL ====================
const imagens = document.querySelectorAll('.imagens-slide img');
const btnPrev = document.getElementById('prev');
const btnNext = document.getElementById('next');
const containerIndicadores = document.getElementById('indicadores');
const carrossel = document.querySelector('.carrossel-container');

let indiceAtual = 0;
let autoPlay;

if (
    imagens.length > 0 &&
    btnPrev &&
    btnNext &&
    containerIndicadores &&
    carrossel
) {
    function criarIndicadores() {
        imagens.forEach((_, index) => {
            const bolinha = document.createElement('div');
            bolinha.classList.add('bolinha');

            if (index === 0) {
                bolinha.classList.add('ativa');
            }

            bolinha.addEventListener('click', () => {
                indiceAtual = index;
                atualizar();
                resetAutoPlay();
            });

            containerIndicadores.appendChild(bolinha);
        });
    }

    function atualizar() {
        imagens.forEach(img => img.classList.remove('ativa'));
        imagens[indiceAtual].classList.add('ativa');

        const bolinhas = document.querySelectorAll('.bolinha');
        bolinhas.forEach(b => b.classList.remove('ativa'));
        bolinhas[indiceAtual].classList.add('ativa');
    }

    function next() {
        indiceAtual = (indiceAtual + 1) % imagens.length;
        atualizar();
    }

    function prev() {
        indiceAtual = (indiceAtual - 1 + imagens.length) % imagens.length;
        atualizar();
    }

    function startAutoPlay() {
        autoPlay = setInterval(next, 4000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlay);
        startAutoPlay();
    }

    btnNext.addEventListener('click', () => {
        next();
        resetAutoPlay();
    });

    btnPrev.addEventListener('click', () => {
        prev();
        resetAutoPlay();
    });

    carrossel.addEventListener('mouseenter', () => {
        clearInterval(autoPlay);
    });

    carrossel.addEventListener('mouseleave', () => {
        startAutoPlay();
    });

    criarIndicadores();
    startAutoPlay();
}

// ==================== SERVICE WORKER ====================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((registration) => {
                console.log('Service Worker registrado com sucesso:', registration.scope);
            })
            .catch((error) => {
                console.error('Falha ao registrar Service Worker:', error);
            });
    });
}

// ==================== PLANOS & PAGAMENTO ====================
document.addEventListener("DOMContentLoaded", function () {
    const dadosPlanos = {
        basico: {
            nome: "Básico",
            preco: "R$ 99,90",
            imagem: "img/PlanoBasico.png"
        },
        premium: {
            nome: "Premium+",
            preco: "R$ 129,90",
            imagem: "img/PlanoPremium+.png"
        },
        vip: {
            nome: "VIP+",
            preco: "R$ 199,90",
            imagem: "img/PlanoVIP+.png"
        }
    };

    const params = new URLSearchParams(window.location.search);
    const planoSelecionado = params.get("plano");

    if (planoSelecionado && dadosPlanos[planoSelecionado]) {
        const info = dadosPlanos[planoSelecionado];

        const imgEl = document.getElementById("resumoImg");
        const nomeEl = document.getElementById("resumoNome");
        const valorEl = document.getElementById("resumoValor");
        const totalEl = document.getElementById("resumoTotal");

        if (imgEl) imgEl.src = info.imagem;
        if (nomeEl) nomeEl.innerText = info.nome;
        if (valorEl) valorEl.innerText = info.preco;
        if (totalEl) totalEl.innerText = info.preco;
    }
});

// Alterna entre cartão, pix e boleto
function mostrarPagamento(tipo, elemento) {
    const metodos = document.querySelectorAll(".Metodo");
    metodos.forEach(item => item.classList.remove("ativo"));

    if (elemento) {
        elemento.classList.add("ativo");
    }
}

// Finaliza o pagamento e redireciona
function finalizarPagamento() {
    localStorage.setItem("aluno", "true");
}

// Alterna entre cartão, pix e boleto
function mostrarPagamento(tipo, elemento) {
    // Atualiza a classe ativa nos botões
    const metodos = document.querySelectorAll(".Metodo");
    metodos.forEach(item => item.classList.remove("ativo"));

    if (elemento) {
        elemento.classList.add("ativo");
    }

    // Oculta todas as seções de pagamento
    const conteudos = document.querySelectorAll(".conteudoPagamento");
    conteudos.forEach(conteudo => conteudo.style.display = "none");

    // Exibe apenas a seção selecionada
    if (tipo === 'cartao') {
        document.getElementById("formCartao").style.display = "block";
    } else if (tipo === 'pix') {
        document.getElementById("formPix").style.display = "block";
    } else if (tipo === 'boleto') {
        document.getElementById("formBoleto").style.display = "block";
    }
}

// Função para copiar o código Pix para a área de transferência
function copiarPix() {
    const inputPix = document.getElementById("codigoPix");
    inputPix.select();
    inputPix.setSelectionRange(0, 99999); // Para dispositivos móveis

    navigator.clipboard.writeText(inputPix.value);
    alert("Código Pix copiado para a área de transferência!");
}

function gerarBoleto() {
    alert("Boleto gerado com sucesso! O código de barras foi copiado para a área de transferência.");
    navigator.clipboard.writeText("34191.09008 61713.917307 71621.145008 3 95200000012990");
}