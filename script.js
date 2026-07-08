// ==================== CONFIGURAÇÃO INICIAL ====================
// Insira o número do seu WhatsApp da loja (Com DDD, apenas números)
const CONFIG_TELEFONE_WHATSAPP = "5591985563152"; 

// ==================== BANCO DE DADOS DOS COLECIONÁVEIS ====================
// Gerencie suas peças facilmente adicionando ou alterando objetos na lista abaixo
const bancoDeProdutos = [
    {
        id: 1,
        nome: "Violet Evergarden",
        descricao: "Tamanho total: 27cm  |  Escala: 1:7  |  Valor: R$350,00",
        fotos: [
            "imagens/Violet/violet.jpg"
        ]
    },
    {
        id: 2,
        nome: "Roronoa Zoro",
        descricao: "Tamanho total: 40cm  |  Escala: 1:8  |  Valor: R$400,00",
        fotos: [
            "imagens/Zoro/zoro.jpg"
        ]
    },
    {
        id: 3,
        nome: "Magia (X-men)",
        descricao: "Tamanho total: 41cm  |  Escala: 1:4  |  Valor: R$350,00",
        fotos: [
            "imagens/Magia/magia.jpg"
        ]
    },
    {
        id: 4,
        nome: "Goku SSJ4 (Daima)",
        descricao: "Tamanho total: 36cm  |  Escala: 1:6  |  Valor: R$400,00",
        fotos: [
            "imagens/Goku/goku.jpg"
        ]
    },
    {
        id: 5,
        nome: "Angela (Aldrif Odinsdottir)",
        descricao: "Tamanho total: 36cm  |  Escala: 1:7  |  Peça extra (NSFW)  |  Valor: R$400,00",
        fotos: [
            "imagens/Angela/angela.jpg"
        ]
    },
    {
        id: 6,
        nome: "Gogeta",
        descricao: "Tamanho total: 49cm  |  Escala: 1:6  |  Valor: R$1.300,00",
        fotos: [
            "imagens/Gogeta/gogeta.jpg"
        ]
    },
    {
        id: 7,
        nome: "Janemba",
        descricao: "Tamanho total: 60cm  |  Escala: 1:6  |  Valor: R$1.100,00",
        fotos: [
            "imagens/Janemba/janemba.jpg"
        ]
    },
    {
        id: 8,
        nome: "Yamato",
        descricao: "Tamanho total: 41cm  |  Escala: 1:8  |  Valor: R$600,00",
        fotos: [
            "imagens/Yamato/yamato.jpg"
        ]
    }
];

// ==================== INJEÇÃO AUTOMÁTICA NA VITRINE ====================
const gridCatalog = document.getElementById('catalog-grid');

function renderizarCatalogo() {
    bancoDeProdutos.forEach(produto => {
        // Criando o elemento HTML do card
        const cardElement = document.createElement('div');
        cardElement.className = 'product-card';
        
        // Configurando o clique para abrir os detalhes
        cardElement.onclick = () => gerenciarAberturaModal(produto);
        
        cardElement.innerHTML = `
            <div class="card-media-wrapper">
                <img src="${produto.fotos[0]}" alt="${produto.nome}" loading="lazy">
            </div>
            <div class="card-info-footer">${produto.nome}</div>
        `;
        
        gridCatalog.appendChild(cardElement);
    });
}

// ==================== CONTROLE DO MODAL DE DETALHES ====================
const modalElement = document.getElementById('details-modal');
const mainPreviewImg = document.getElementById('main-preview-img');
const thumbsTrack = document.getElementById('images-thumbnails-track');

function gerenciarAberturaModal(produto) {
    // Inserindo textos básicos
    document.getElementById('info-title').innerText = produto.nome;
    document.getElementById('info-description').innerText = produto.descricao;
    
    // Setando a imagem principal padrão (primeira da lista)
    mainPreviewImg.src = produto.fotos[0];
    mainPreviewImg.alt = produto.nome;

    // Criando o carrossel de miniaturas extras
    thumbsTrack.innerHTML = '';
    produto.fotos.forEach((linkFoto, index) => {
        const thumbImg = document.createElement('img');
        thumbImg.src = linkFoto;
        thumbImg.className = `thumb-item ${index === 0 ? 'active-thumb' : ''}`;
        
        // Evento de clique para alternar as fotos principais
        thumbImg.onclick = (event) => {
            event.stopPropagation(); // Impede o fechamento involuntário do modal
            mainPreviewImg.src = linkFoto;
            
            // Atualiza a borda de seleção ativa
            document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active-thumb'));
            thumbImg.classList.add('active-thumb');
        };
        
        thumbsTrack.appendChild(thumbImg);
    });

    // Configurando link dinâmico com mensagem personalizada para o WhatsApp
    const mensagemTexto = `Olá! Vi o catálogo e tenho interesse em fazer um orçamento da peça: *${produto.nome}*`;
    const linkFinalWhatsApp = `https://api.whatsapp.com/send?phone=${CONFIG_TELEFONE_WHATSAPP}&text=${encodeURIComponent(mensagemTexto)}`;
    document.getElementById('whatsapp-order-link').href = linkFinalWhatsApp;

    // Exibe o modal na tela
    modalElement.style.display = 'flex';
}

// Funções para Fechar o Modal
function fecharModal() {
    modalElement.style.display = 'none';
}

document.getElementById('close-modal-btn').onclick = fecharModal;

// Fechar se o usuário clicar na área escura de fora do card
window.onclick = function(event) {
    if (event.target === modalElement) {
        fecharModal();
    }
}

// Inicializa a renderização quando a página carrega
window.onload = renderizarCatalogo;