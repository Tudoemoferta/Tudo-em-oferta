// Global Variables
let currentFilter = 'all';
let searchTimeout;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    setupEventListeners();
    setupScrollEffects();
    setupFilterTabs();
    setupBackToTop();
    animateOnScroll();
}

// Event Listeners
function setupEventListeners() {
    // Navigation smooth scroll
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Category cards click
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            filterProducts(category);
            
            // Scroll to products section
            document.querySelector('#ofertas').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Window scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounceSearch);
    }
}

// Toggle Search
function toggleSearch() {
    const searchContainer = document.getElementById('searchContainer');
    const searchInput = document.getElementById('searchInput');
    
    searchContainer.classList.toggle('active');
    
    if (searchContainer.classList.contains('active')) {
        setTimeout(() => {
            searchInput.focus();
        }, 300);
    }
}

// Toggle Mobile Menu
function toggleMenu() {
    const nav = document.querySelector('.nav');
    const menuToggle = document.querySelector('.menu-toggle');
    
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

// Search Products with Debounce
function debounceSearch() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        searchProducts();
    }, 300);
}

function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const title = product.querySelector('.product-title').textContent.toLowerCase();
        const description = product.querySelector('.product-description').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm) || searchTerm === '') {
            product.style.display = 'block';
            product.classList.add('visible');
            product.classList.remove('hidden');
        } else {
            product.classList.add('hidden');
            product.classList.remove('visible');
            setTimeout(() => {
                if (product.classList.contains('hidden')) {
                    product.style.display = 'none';
                }
            }, 300);
        }
    });
    
    // Update results count
    const visibleProducts = document.querySelectorAll('.product-card.visible').length;
    console.log(`Encontrados ${visibleProducts} produtos para "${searchTerm}"`);
}

// Filter Tabs Setup
function setupFilterTabs() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            filterProducts(filter);
        });
    });
}

// Filter Products
function filterProducts(category) {
    currentFilter = category;
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const productCategory = product.dataset.category;
        
        if (category === 'all' || productCategory === category) {
            product.style.display = 'block';
            product.classList.add('visible');
            product.classList.remove('hidden');
        } else {
            product.classList.add('hidden');
            product.classList.remove('visible');
            setTimeout(() => {
                if (product.classList.contains('hidden')) {
                    product.style.display = 'none';
                }
            }, 300);
        }
    });
    
    // Update filter tab if not already active
    const filterTab = document.querySelector(`[data-filter="${category}"]`);
    if (filterTab && !filterTab.classList.contains('active')) {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        filterTab.classList.add('active');
    }
}

// Track Clicks for Analytics
function trackClick(productName, platform) {
    // Google Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            event_category: 'affiliate_link',
            event_label: `${productName}_${platform}`,
            value: 1
        });
    }
    
    // Console log for debugging
    console.log(`Click tracked: ${productName} on ${platform}`);
    
    // You can add more tracking services here
    // Example: Facebook Pixel, custom analytics, etc.
    
    // Simulate redirect (replace with actual affiliate links)
    const affiliateLinks = {
        'conjunto-alfaiataria': {
            'shopee': 'https://shopee.com.br/affiliate-link-conjunto',
            'mercadolivre': 'https://mercadolivre.com.br/affiliate-link-conjunto',
            'amazon': 'https://amazon.com.br/affiliate-link-conjunto'
        },
        'blusa-cropped': {
            'shopee': 'https://shopee.com.br/affiliate-link-blusa',
            'mercadolivre': 'https://mercadolivre.com.br/affiliate-link-blusa',
            'amazon': 'https://amazon.com.br/affiliate-link-blusa'
        },
        'sandalia-conforto': {
            'shopee': 'https://shopee.com.br/affiliate-link-sandalia',
            'mercadolivre': 'https://mercadolivre.com.br/affiliate-link-sandalia',
            'amazon': 'https://amazon.com.br/affiliate-link-sandalia'
        },
        'kit-batom': {
            'shopee': 'https://shopee.com.br/affiliate-link-batom',
            'mercadolivre': 'https://mercadolivre.com.br/affiliate-link-batom',
            'amazon': 'https://amazon.com.br/affiliate-link-batom'
        },
        'fone-bluetooth': {
            'shopee': 'https://shopee.com.br/affiliate-link-fone',
            'mercadolivre': 'https://mercadolivre.com.br/affiliate-link-fone',
            'amazon': 'https://amazon.com.br/affiliate-link-fone'
        },
        'organizador': {
            'shopee': 'https://shopee.com.br/affiliate-link-organizador',
            'mercadolivre': 'https://mercadolivre.com.br/affiliate-link-organizador',
            'amazon': 'https://amazon.com.br/affiliate-link-organizador'
        }
const productPlatforms = affiliateLinks[productName];
// Chave onde os dados serão armazenados no LocalStorage
const LOCAL_STORAGE_KEY = 'affiliateProducts';

/**
 * Carrega os produtos do LocalStorage.
 * @returns {Array} Lista de produtos.
 */
function loadProducts() {
    const productsJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    return productsJSON ? JSON.parse(productsJSON) : [];
}

/**
 * Renderiza (cria o HTML) de todos os produtos na tela.
 * @param {Array} products Lista de produtos a serem exibidos.
 */
function renderProducts(products) {
    const container = document.getElementById('productsGrid');

    // Se o container não existir, não podemos renderizar.
    if (!container) {
        console.error("Elemento com ID 'productsGrid' não encontrado no HTML.");
        return;
    }

    // Limpa o conteúdo anterior
    container.innerHTML = '';

    if (products.length === 0) {
        // Exibe mensagem se não houver produtos
        container.innerHTML = '<p id="noProducts">Nenhum produto publicado ainda. Use o formulário acima para adicionar um item!</p>';
        return;
    }

    // Cria e insere o cartão de cada produto
    products.forEach(produto => {
        const card = document.createElement('div');
        card.classList.add('product-card'); // Adicione sua classe de CSS aqui

        // Estrutura do cartão do produto:
        card.innerHTML = `
            <h3 class="product-name">${produto.nome}</h3>
            <p class="product-description">${produto.descricao}</p>
            <p class="product-platform">Plataforma: ${produto.plataforma.toUpperCase()}</p>
            
            <a href="${produto.linkAfiliado}" target="_blank" class="btn-affiliate-link">
                Comprar Agora
            </a>

            <button onclick="deleteProduct('${produto.id}')" class="btn-delete">Excluir</button>
        `;
        
        container.appendChild(card);
    });
}


/**
 * Adiciona um novo produto e salva no LocalStorage.
 * @param {Event} event O evento de submissão do formulário.
 */
function saveProduct(event) {
    event.preventDefault();

    const form = event.target;
    // Pega os valores dos campos do formulário
    const newProduct = {
        id: 'prod-' + Date.now(), // ID único baseado no tempo
        nome: form.elements.productName.value || 'Produto Sem Nome',
        descricao: form.elements.productDescription.value || 'Sem descrição.',
        plataforma: form.elements.productPlatform.value || 'N/A',
        linkAfiliado: form.elements.productAffiliateLink.value,
    };

    if (!newProduct.linkAfiliado) {
        alert('Por favor, insira o link de afiliado.');
        return;
    }

    // Salva
    let products = loadProducts();
    products.push(newProduct);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));

    // Renderiza a lista atualizada
    renderProducts(products); 

    // Limpa e dá feedback
    form.reset();
    alert('Produto publicado! (Salvo apenas no seu navegador)');
}

/**
 * Exclui um produto pelo ID e atualiza a visualização.
 * @param {string} productId O ID único do produto a ser excluído.
 */
function deleteProduct(productId) {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
        let products = loadProducts();
        // Filtra para manter todos, exceto o que tem o ID a ser excluído
        const updatedProducts = products.filter(p => p.id !== productId);
        
        // Salva a lista atualizada
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedProducts));
        
        // Renderiza a lista atualizada
        renderProducts(updatedProducts);
    }
}

// --- CONFIGURAÇÃO INICIAL (Chama as funções quando o HTML carregar) ---

// 1. Associa a função 'saveProduct' ao formulário de adição
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addProductForm');
    if (form) {
        form.addEventListener('submit', saveProduct);
    } else {
        console.warn("Formulário com ID 'addProductForm' não encontrado. Não será possível salvar novos produtos.");
    }
    
    // 2. Carrega e exibe os produtos existentes ao abrir a página
    renderProducts(loadProducts());
});
    if (productPlatforms && productPlatforms[platform]) {
        const affiliateLink = productPlatforms[platform];
        // Redireciona o usuário para o link de afiliado em uma nova aba
        window.open(affiliateLink, '_blank');
        
        // OPCIONAL: Mantenha o console log para feedback
        console.log(`Link de Afiliado: ${affiliateLink}`);
    } else if (productPlatforms) {
        alert(`O produto "${productName}" não está configurado para a plataforma "${platform}" ainda.`);
    } else {
        alert(`Produto "${productName}" não disponível nos links de afiliação. Configure os links.`);
    }     
    
    };
    
    const link = affiliateLinks[productName]?.[platform];
    if (link) {
        window.open(link, '_blank');
    } else {
        alert('Link de afiliado não configurado ainda. Configure os links reais no arquivo script.js');
    }
}

// Newsletter Subscription
function subscribeNewsletter(event) {
    event.preventDefault();
    
    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value;
    
    if (!isValidEmail(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }
    
    // Track subscription
    if (typeof gtag !== 'undefined') {
        gtag('event', 'sign_up', {
            event_category: 'newsletter',
            event_label: 'email_subscription',
            value: 1
        });
    }
    
    // Simulate subscription (replace with actual newsletter service)
    console.log(`Newsletter subscription: ${email}`);
    
    // Show success message
    alert('Obrigado por se inscrever! Você receberá as melhores ofertas em seu e-mail.');
    emailInput.value = '';
    
    // Here you would typically send the email to your newsletter service
    // Example: Mailchimp, ConvertKit, etc.
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Load More Products
function loadMoreProducts() {
    // Simulate loading more products
    console.log('Loading more products...');
    
    const productsGrid = document.getElementById('productsGrid');
    const loadMoreBtn = document.querySelector('.load-more-container .btn');
    
    // Add loading state
    loadMoreBtn.classList.add('loading');
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';
    
    // Simulate API call delay
    setTimeout(() => {
        // Remove loading state
        loadMoreBtn.classList.remove('loading');
        loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Carregar Mais Produtos';
        
        // Here you would typically load more products from your API
        alert('Mais produtos serão carregados em breve!');
    }, 2000);
}

// Scroll Effects
function setupScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header background opacity
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Back to Top Button
function setupBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Handle Scroll Events
function handleScroll() {
    updateActiveNavLink();
    animateOnScroll();
}

// Update Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Animate Elements on Scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.category-card, .product-card, .ebook-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animations
function initializeAnimations() {
    const elements = document.querySelectorAll('.category-card, .product-card, .ebook-card');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
}

// Quick View Product (Modal functionality)
function quickViewProduct(productElement) {
    // This would typically open a modal with product details
    console.log('Quick view for product:', productElement);
    alert('Funcionalidade de visualização rápida será implementada em breve!');
}

// Lazy Loading Images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Performance Optimization
function optimizePerformance() {
    // Preload critical resources
    const criticalImages = [
        'assets/images/conjunto-alfaiataria.jpg',
        'assets/images/blusa-cropped.jpg',
        'assets/images/sandalia-conforto.jpg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You can send error reports to your analytics service here
});

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    setupLazyLoading();
    optimizePerformance();
});

// Service Worker Registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Export functions for global access
window.toggleSearch = toggleSearch;
window.toggleMenu = toggleMenu;
window.searchProducts = searchProducts;
window.trackClick = trackClick;
window.downloadEbook = downloadEbook;
window.subscribeNewsletter = subscribeNewsletter;
window.loadMoreProducts = loadMoreProducts;
window.scrollToTop = scrollToTop;

// Função para buscar e renderizar os produtos
async function carregarProdutos() {
    try {
        // Faz a requisição para o arquivo JSON
        const response = await fetch('./produtos.json');

        // Verifica se a requisição foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro ao carregar produtos: ${response.statusText}`);
        }

        const produtos = await response.json();
        const containerProdutos = document.getElementById('container-produtos'); // Supondo um div com este ID

        // Limpa o conteúdo existente
        containerProdutos.innerHTML = ''; 

        // Itera sobre os produtos e cria o HTML para cada um
        produtos.forEach(produto => {
            const card = document.createElement('div');
            card.classList.add('card-produto');

            card.innerHTML = `
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <a href="${produto.linkAfiliado}" target="_blank" class="btn-afiliado">Comprar na ${produto.plataforma.toUpperCase()}</a>
            `;

            containerProdutos.appendChild(card);
        });

    } catch (error) {
        console.error("Falha ao carregar os dados dos produtos:", error);
        document.getElementById('container-produtos').innerHTML = '<p>Erro ao carregar os produtos. Tente novamente mais tarde.</p>';
    }
}

// Chama a função quando a página carregar
document.addEventListener('DOMContentLoaded', carregarProdutos);
