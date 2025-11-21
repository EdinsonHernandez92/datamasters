// ============================================
// DATAMASTER - JAVASCRIPT COMPLETO
// Proyecto de Curso de Programación Básica
// ============================================

// ============================================
// 1. MENÚ HAMBURGUESA (Mobile Navigation)
// ============================================
const menuToggle = document.querySelector('.mobile-nav-toggle');
const mainNav = document.querySelector('.main-nav');
const searchToggle = document.querySelector('.mobile-search-toggle');
const headerSearch = document.querySelector('.header-search');

// Toggle del menú hamburguesa
if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        
        // Cambiar las barras del hamburguesa a X
        menuToggle.classList.toggle('active');
        
        // Cerrar búsqueda si está abierta
        if (headerSearch && headerSearch.classList.contains('active')) {
            headerSearch.classList.remove('active');
        }
    });
}

// Toggle de búsqueda móvil
if (searchToggle && headerSearch) {
    searchToggle.addEventListener('click', () => {
        headerSearch.classList.toggle('active');
        
        // Cerrar menú si está abierto
        if (mainNav && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
        
        // Hacer focus en el input
        if (headerSearch.classList.contains('active')) {
            const searchInput = headerSearch.querySelector('input');
            if (searchInput) searchInput.focus();
        }
    });
}

// Cerrar menú al hacer clic en un enlace
const navLinks = document.querySelectorAll('.main-nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mainNav && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
        }
    });
});

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (e) => {
    if (mainNav && mainNav.classList.contains('active')) {
        if (!e.target.closest('.main-nav') && !e.target.closest('.mobile-nav-toggle')) {
            mainNav.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
        }
    }
});

// ============================================
// 2. VALIDACIÓN DE FORMULARIO DE CONTACTO
// ============================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    const emailInput = contactForm.querySelector('#email');
    const nameInput = contactForm.querySelector('#name');
    const messageInput = contactForm.querySelector('#message');
    
    // Validación en tiempo real del email
    if (emailInput) {
        emailInput.addEventListener('input', () => {
            validateEmail(emailInput);
        });
    }
    
    // Validación en tiempo real del nombre
    if (nameInput) {
        nameInput.addEventListener('input', () => {
            validateName(nameInput);
        });
    }
    
    // Validación en tiempo real del mensaje
    if (messageInput) {
        messageInput.addEventListener('input', () => {
            validateMessage(messageInput);
        });
    }
    
    // Validación al enviar el formulario
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Validar todos los campos
        if (!validateEmail(emailInput)) isValid = false;
        if (!validateName(nameInput)) isValid = false;
        if (!validateMessage(messageInput)) isValid = false;
        
        if (isValid) {
            // Mostrar mensaje de éxito
            showNotification('✅ Mensaje enviado correctamente. Te contactaremos pronto.', 'success');
            
            // Limpiar formulario
            contactForm.reset();
            
            // Quitar clases de validación
            emailInput.classList.remove('valid', 'invalid');
            nameInput.classList.remove('valid', 'invalid');
            messageInput.classList.remove('valid', 'invalid');
        } else {
            showNotification('⚠️ Por favor, completa todos los campos correctamente.', 'error');
        }
    });
}

// Función para validar email
function validateEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const value = input.value.trim();
    
    if (value === '') {
        setInvalid(input, 'El email es obligatorio');
        return false;
    } else if (!emailRegex.test(value)) {
        setInvalid(input, 'El email no es válido');
        return false;
    } else {
        setValid(input);
        return true;
    }
}

// Función para validar nombre
function validateName(input) {
    const value = input.value.trim();
    
    if (value === '') {
        setInvalid(input, 'El nombre es obligatorio');
        return false;
    } else if (value.length < 3) {
        setInvalid(input, 'El nombre debe tener al menos 3 caracteres');
        return false;
    } else {
        setValid(input);
        return true;
    }
}

// Función para validar mensaje
function validateMessage(input) {
    const value = input.value.trim();
    
    if (value === '') {
        setInvalid(input, 'El mensaje es obligatorio');
        return false;
    } else if (value.length < 10) {
        setInvalid(input, 'El mensaje debe tener al menos 10 caracteres');
        return false;
    } else {
        setValid(input);
        return true;
    }
}

// Marcar campo como inválido
function setInvalid(input, message) {
    input.classList.remove('valid');
    input.classList.add('invalid');
    
    // Buscar o crear mensaje de error
    let errorMsg = input.parentElement.querySelector('.error-message');
    if (!errorMsg) {
        errorMsg = document.createElement('span');
        errorMsg.classList.add('error-message');
        input.parentElement.appendChild(errorMsg);
    }
    errorMsg.textContent = message;
}

// Marcar campo como válido
function setValid(input) {
    input.classList.remove('invalid');
    input.classList.add('valid');
    
    // Eliminar mensaje de error si existe
    const errorMsg = input.parentElement.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

// ============================================
// 3. BÚSQUEDA DE CURSOS EN TIEMPO REAL
// ============================================
const searchInput = document.querySelector('.search-form input[type="search"]');
const searchButton = document.querySelector('.search-form button');
const courseCards = document.querySelectorAll('.course-card');

if (searchInput && courseCards.length > 0) {
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        courseCards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const description = card.querySelector('p')?.textContent.toLowerCase() || '';
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
                // Animación de entrada
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.transition = 'opacity 0.3s ease';
                    card.style.opacity = '1';
                }, 10);
            } else {
                card.style.display = 'none';
            }
        });
        
        // Mostrar mensaje si no hay resultados
        checkSearchResults(searchTerm);
    });
    
    // Prevenir submit del formulario de búsqueda
    if (searchButton) {
        searchButton.addEventListener('click', (e) => {
            e.preventDefault();
        });
    }
}

// Función para verificar resultados de búsqueda
function checkSearchResults(searchTerm) {
    const coursesSection = document.querySelector('.courses .container');
    if (!coursesSection) return;
    
    const visibleCards = Array.from(courseCards).filter(card => card.style.display !== 'none');
    
    // Eliminar mensaje anterior si existe
    const oldMessage = coursesSection.querySelector('.no-results-message');
    if (oldMessage) oldMessage.remove();
    
    // Mostrar mensaje si no hay resultados
    if (searchTerm && visibleCards.length === 0) {
        const noResultsMsg = document.createElement('p');
        noResultsMsg.classList.add('no-results-message');
        noResultsMsg.textContent = `No se encontraron cursos para "${searchTerm}". Intenta con otros términos.`;
        noResultsMsg.style.cssText = `
            text-align: center;
            color: #666;
            font-size: 1.2rem;
            padding: 40px;
            grid-column: 1 / -1;
        `;
        
        const courseGrid = coursesSection.querySelector('.course-grid');
        if (courseGrid) {
            courseGrid.appendChild(noResultsMsg);
        }
    }
}

// ============================================
// 4. FILTRADO DE CURSOS POR CATEGORÍA
// ============================================
// Crear botones de filtro dinámicamente
function createCategoryFilters() {
    const coursesSection = document.querySelector('.courses .container');
    if (!coursesSection || courseCards.length === 0) return;
    
    // Crear contenedor de filtros
    const filterContainer = document.createElement('div');
    filterContainer.classList.add('filter-buttons');
    filterContainer.style.cssText = `
        text-align: center;
        margin-bottom: 30px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 10px;
    `;
    
    // Categorías disponibles
    const categories = [
        { id: 'todos', name: 'Todos los Cursos' },
        { id: 'excel', name: 'Excel' },
        { id: 'powerbi', name: 'Power BI' },
        { id: 'python', name: 'Python' },
        { id: 'analisis', name: 'Análisis de Datos' }
    ];
    
    // Crear botones
    categories.forEach(category => {
        const button = document.createElement('button');
        button.classList.add('filter-btn');
        button.dataset.category = category.id;
        button.textContent = category.name;
        button.style.cssText = `
            padding: 10px 20px;
            background-color: #f0f0f0;
            border: 2px solid transparent;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s ease;
            color: #333;
        `;
        
        if (category.id === 'todos') {
            button.classList.add('active');
            button.style.backgroundColor = '#00ABE4';
            button.style.color = 'white';
            button.style.borderColor = '#00ABE4';
        }
        
        button.addEventListener('click', () => filterCourses(category.id, button));
        filterContainer.appendChild(button);
    });
    
    // Insertar antes del grid de cursos
    const coursesTitle = coursesSection.querySelector('h2');
    if (coursesTitle) {
        coursesTitle.after(filterContainer);
    }
}

// Función para filtrar cursos
function filterCourses(category, clickedButton) {
    // Actualizar botón activo
    const allButtons = document.querySelectorAll('.filter-btn');
    allButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.style.backgroundColor = '#f0f0f0';
        btn.style.color = '#333';
        btn.style.borderColor = 'transparent';
    });
    
    clickedButton.classList.add('active');
    clickedButton.style.backgroundColor = '#00ABE4';
    clickedButton.style.color = 'white';
    clickedButton.style.borderColor = '#00ABE4';
    
    // Filtrar cursos
    courseCards.forEach(card => {
        // Obtener categoría del href
        const link = card.closest('.course-card-link');
        const href = link ? link.getAttribute('href') : '';
        
        let cardCategory = 'otros';
        if (href.includes('excel')) cardCategory = 'excel';
        else if (href.includes('powerbi')) cardCategory = 'powerbi';
        else if (href.includes('python')) cardCategory = 'python';
        else if (href.includes('analisis')) cardCategory = 'analisis';
        
        if (category === 'todos' || cardCategory === category) {
            card.style.display = 'block';
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.transition = 'opacity 0.3s ease';
                card.style.opacity = '1';
            }, 10);
        } else {
            card.style.display = 'none';
        }
    });
}

// Inicializar filtros al cargar la página
if (document.querySelector('.courses')) {
    createCategoryFilters();
}

// ============================================
// 5. BOTÓN "VER MÁS CURSOS" / CONTRAER
// ============================================
function createExpandButton() {
    const courseGrid = document.querySelector('.course-grid');
    const coursesSection = document.querySelector('.courses .container');
    
    if (!courseGrid || !coursesSection || courseCards.length <= 4) return;
    
    // Ocultar cursos después del 4to inicialmente
    courseCards.forEach((card, index) => {
        if (index >= 4) {
            card.style.display = 'none';
        }
    });
    
    // Crear botón
    const expandBtn = document.createElement('button');
    expandBtn.classList.add('expand-courses-btn');
    expandBtn.textContent = `Ver más cursos (${courseCards.length - 4})`;
    expandBtn.style.cssText = `
        display: block;
        margin: 30px auto 0;
        padding: 12px 30px;
        background-color: #00ABE4;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 1.1rem;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease;
    `;
    
    let expanded = false;
    
    expandBtn.addEventListener('click', () => {
        expanded = !expanded;
        
        courseCards.forEach((card, index) => {
            if (index >= 4) {
                if (expanded) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.3s ease';
                        card.style.opacity = '1';
                    }, index * 50);
                } else {
                    card.style.display = 'none';
                }
            }
        });
        
        if (expanded) {
            expandBtn.textContent = 'Ver menos cursos';
            expandBtn.style.backgroundColor = '#0092c3';
        } else {
            expandBtn.textContent = `Ver más cursos (${courseCards.length - 4})`;
            expandBtn.style.backgroundColor = '#00ABE4';
            // Scroll suave hacia la sección de cursos
            coursesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
    
    expandBtn.addEventListener('mouseover', () => {
        expandBtn.style.backgroundColor = '#0092c3';
    });
    
    expandBtn.addEventListener('mouseout', () => {
        expandBtn.style.backgroundColor = expanded ? '#0092c3' : '#00ABE4';
    });
    
    coursesSection.appendChild(expandBtn);
}

// Inicializar botón de expandir
createExpandButton();

// ============================================
// 6. CARRITO DE COMPRAS (LocalStorage)
// ============================================
let cart = JSON.parse(localStorage.getItem('dataMastersCart')) || [];

// Crear badge del carrito en el header
function createCartBadge() {
    const headerRight = document.querySelector('.header-right');
    if (!headerRight) return;
    
    const cartLink = document.createElement('a');
    cartLink.href = '#';
    cartLink.classList.add('cart-link');
    cartLink.innerHTML = `
        🛒 <span class="cart-count">${cart.length}</span>
    `;
    cartLink.style.cssText = `
        position: relative;
        color: #333;
        text-decoration: none;
        font-size: 1.5rem;
        margin-right: 20px;
    `;
    
    const cartCount = cartLink.querySelector('.cart-count');
    cartCount.style.cssText = `
        position: absolute;
        top: -8px;
        right: -8px;
        background-color: #ff0000;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.7rem;
        font-weight: bold;
    `;
    
    if (cart.length === 0) {
        cartCount.style.display = 'none';
    }
    
    cartLink.addEventListener('click', (e) => {
        e.preventDefault();
        showCartModal();
    });
    
    // Insertar antes del botón de registro
    const registerBtn = headerRight.querySelector('.cta-button-header');
    if (registerBtn) {
        headerRight.insertBefore(cartLink, registerBtn);
    } else {
        headerRight.appendChild(cartLink);
    }
}

// Agregar botones "Agregar al Carrito" a cada curso
function addCartButtons() {
    courseCards.forEach(card => {
        const cardContent = card.querySelector('.card-content');
        if (!cardContent) return;
        
        // Verificar si ya tiene el botón
        if (cardContent.querySelector('.add-to-cart-btn')) return;
        
        const button = document.createElement('button');
        button.classList.add('add-to-cart-btn');
        button.textContent = '🛒 Agregar al Carrito';
        button.style.cssText = `
            width: 100%;
            padding: 10px;
            background-color: #00ABE4;
            color: white;
            border: none;
            border-radius: 5px;
            font-weight: bold;
            cursor: pointer;
            margin-top: 15px;
            transition: background-color 0.3s ease;
        `;
        
        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = '#0092c3';
        });
        
        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = '#00ABE4';
        });
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const title = card.querySelector('h3')?.textContent || 'Curso';
            const description = card.querySelector('p')?.textContent || '';
            const image = card.querySelector('img')?.src || '';
            
            // Generar precio aleatorio para demo
            const price = (Math.floor(Math.random() * 5) + 4) * 1000; // Entre $4000 y $8000
            
            addToCart({ title, description, image, price });
        });
        
        cardContent.appendChild(button);
    });
}

// Agregar producto al carrito
function addToCart(course) {
    // Verificar si ya está en el carrito
    const exists = cart.find(item => item.title === course.title);
    
    if (exists) {
        showNotification('⚠️ Este curso ya está en tu carrito', 'warning');
        return;
    }
    
    cart.push(course);
    localStorage.setItem('dataMastersCart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`✅ "${course.title}" agregado al carrito`, 'success');
    
    // Animación del badge
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.classList.add('bounce');
        setTimeout(() => cartCount.classList.remove('bounce'), 300);
    }
}

// Actualizar contador del carrito
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
        cartCount.style.display = cart.length > 0 ? 'flex' : 'none';
    }
}

// Mostrar modal del carrito
function showCartModal() {
    // Eliminar modal anterior si existe
    const existingModal = document.querySelector('.cart-modal');
    if (existingModal) existingModal.remove();
    
    const modal = document.createElement('div');
    modal.classList.add('cart-modal');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 10px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
    `;
    
    let cartHTML = `
        <h2 style="color: #0052cc; margin-top: 0;">🛒 Tu Carrito</h2>
    `;
    
    if (cart.length === 0) {
        cartHTML += `
            <p style="text-align: center; padding: 40px; color: #666;">
                Tu carrito está vacío. ¡Explora nuestros cursos!
            </p>
        `;
    } else {
        let total = 0;
        
        cart.forEach((item, index) => {
            total += item.price;
            cartHTML += `
                <div class="cart-item" style="
                    display: flex;
                    gap: 15px;
                    padding: 15px;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    margin-bottom: 15px;
                ">
                    <img src="${item.image}" alt="${item.title}" style="
                        width: 80px;
                        height: 80px;
                        object-fit: cover;
                        border-radius: 5px;
                    ">
                    <div style="flex-grow: 1;">
                        <h4 style="margin: 0 0 5px 0; color: #0052cc;">${item.title}</h4>
                        <p style="margin: 0; font-size: 0.9rem; color: #666;">$${item.price.toLocaleString('es-CO')}</p>
                    </div>
                    <button onclick="removeFromCart(${index})" style="
                        background: #ff4444;
                        color: white;
                        border: none;
                        padding: 5px 10px;
                        border-radius: 5px;
                        cursor: pointer;
                        height: fit-content;
                    ">🗑️</button>
                </div>
            `;
        });
        
        cartHTML += `
            <div style="
                border-top: 2px solid #0052cc;
                padding-top: 15px;
                margin-top: 20px;
            ">
                <h3 style="display: flex; justify-content: space-between; color: #0052cc;">
                    <span>Total:</span>
                    <span>$${total.toLocaleString('es-CO')}</span>
                </h3>
                <button onclick="checkout()" style="
                    width: 100%;
                    padding: 15px;
                    background-color: #00ABE4;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    font-size: 1.1rem;
                    font-weight: bold;
                    cursor: pointer;
                    margin-top: 10px;
                ">Proceder al Pago</button>
            </div>
        `;
    }
    
    cartHTML += `
        <button onclick="document.querySelector('.cart-modal').remove()" style="
            position: absolute;
            top: 15px;
            right: 15px;
            background: transparent;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
        ">✕</button>
    `;
    
    modalContent.innerHTML = cartHTML;
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Cerrar al hacer clic fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Eliminar del carrito (función global para el onclick)
window.removeFromCart = function(index) {
    const removedItem = cart[index];
    cart.splice(index, 1);
    localStorage.setItem('dataMastersCart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`"${removedItem.title}" eliminado del carrito`, 'info');
    showCartModal(); // Refrescar modal
};

// Checkout (función global)
window.checkout = function() {
    showNotification('🎉 ¡Gracias por tu compra! Redirigiendo al pago...', 'success');
    setTimeout(() => {
        document.querySelector('.cart-modal')?.remove();
        // Aquí irías a la página de pago real
        alert('En un proyecto real, aquí conectarías con una pasarela de pago (Stripe, PayPal, etc.)');
        // Limpiar carrito después del "pago"
        cart = [];
        localStorage.setItem('dataMastersCart', JSON.stringify(cart));
        updateCartCount();
    }, 2000);
};

// Inicializar carrito
createCartBadge();
addCartButtons();

// ============================================
// 7. SISTEMA DE NOTIFICACIONES (Toast)
// ============================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.classList.add('notification-toast');
    notification.textContent = message;
    
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196F3'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${colors[type]};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 2000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        font-weight: bold;
    `;
    
    document.body.appendChild(notification);
    
    // Auto-eliminar después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// 8. BOTÓN "VOLVER ARRIBA"
// ============================================
function createBackToTopButton() {
    const button = document.createElement('button');
    button.classList.add('back-to-top');
    button.innerHTML = '⬆️';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: #00ABE4;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    document.body.appendChild(button);
}

createBackToTopButton();

// ============================================
// 9. SMOOTH SCROLL PARA ENLACES INTERNOS
// ============================================
const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Ignorar # solo
        if (href === '#' || href === '#!') return;
        
        e.preventDefault();
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// 10. ANIMACIONES CSS (Agregar keyframes)
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.3); }
    }
    
    /* Estilos adicionales para móvil */
    .main-nav.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: white;
        padding: 20px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        animation: slideDown 0.3s ease;
    }
    
    .main-nav.active a {
        margin: 10px 0;
        padding: 10px;
        text-align: center;
        border-bottom: 1px solid #e0e0e0;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .header-search.active {
        display: block !important;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: white;
        padding: 15px 20px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        animation: slideDown 0.3s ease;
    }
    
    /* Animación del toggle hamburguesa */
    .mobile-nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .mobile-nav-toggle span {
        transition: all 0.3s ease;
    }
    
    /* Validación de formulario */
    .form-group input.valid,
    .form-group textarea.valid {
        border-color: #4CAF50 !important;
        background-color: #f1f8f4 !important;
    }
    
    .form-group input.invalid,
    .form-group textarea.invalid {
        border-color: #f44336 !important;
        background-color: #fff5f5 !important;
    }
    
    .error-message {
        color: #f44336;
        font-size: 0.85rem;
        margin-top: 5px;
        display: block;
    }
    
    /* Animación bounce para el carrito */
    .cart-count.bounce {
        animation: bounce 0.3s ease;
    }
    
    /* Hover en botón volver arriba */
    .back-to-top:hover {
        background-color: #0092c3 !important;
        transform: scale(1.1);
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
        .notification-toast {
            right: 10px !important;
            left: 10px !important;
            max-width: none !important;
        }
        
        .back-to-top {
            bottom: 20px !important;
            right: 20px !important;
            width: 45px !important;
            height: 45px !important;
        }
        
        .cart-link {
            margin-right: 10px !important;
        }
    }
`;

document.head.appendChild(style);

// ============================================
// 11. CONTADOR DE PROGRESO DE SCROLL
// ============================================
function createScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(to right, #00ABE4, #0052cc);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

createScrollProgressBar();

// ============================================
// 12. DARK MODE TOGGLE
// ============================================
function createDarkModeToggle() {
    // Verificar preferencia guardada
    const darkMode = localStorage.getItem('darkMode') === 'true';
    
    const toggle = document.createElement('button');
    toggle.classList.add('dark-mode-toggle');
    toggle.innerHTML = darkMode ? '☀️' : '🌙';
    toggle.title = darkMode ? 'Modo Claro' : 'Modo Oscuro';
    toggle.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: #0052cc;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 998;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
    `;
    
    // Aplicar modo oscuro si está activado
    if (darkMode) {
        applyDarkMode(true);
    }
    
    toggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', isDark);
        toggle.innerHTML = isDark ? '☀️' : '🌙';
        toggle.title = isDark ? 'Modo Claro' : 'Modo Oscuro';
        applyDarkMode(isDark);
    });
    
    toggle.addEventListener('mouseover', () => {
        toggle.style.transform = 'scale(1.1)';
    });
    
    toggle.addEventListener('mouseout', () => {
        toggle.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(toggle);
}

function applyDarkMode(isDark) {
    if (isDark) {
        document.body.style.backgroundColor = '#1a1a1a';
        document.body.style.color = '#e0e0e0';
        
        // Actualizar variables CSS
        document.documentElement.style.setProperty('--color-fondo', '#1a1a1a');
        document.documentElement.style.setProperty('--color-tarjeta', '#2a2a2a');
        document.documentElement.style.setProperty('--color-texto-principal', '#e0e0e0');
        document.documentElement.style.setProperty('--color-borde-sutil', '#444');
        
        // Ajustar header
        const header = document.querySelector('.main-header');
        if (header) header.style.backgroundColor = '#2a2a2a';
        
        // Ajustar footer
        const footer = document.querySelector('.main-footer');
        if (footer) footer.style.backgroundColor = '#2a2a2a';
        
    } else {
        document.body.style.backgroundColor = '#E9F1FA';
        document.body.style.color = '#333333';
        
        // Restaurar variables CSS
        document.documentElement.style.setProperty('--color-fondo', '#E9F1FA');
        document.documentElement.style.setProperty('--color-tarjeta', '#FFFFFF');
        document.documentElement.style.setProperty('--color-texto-principal', '#333333');
        document.documentElement.style.setProperty('--color-borde-sutil', '#e0e0e0');
        
        // Restaurar header
        const header = document.querySelector('.main-header');
        if (header) header.style.backgroundColor = '#FFFFFF';
        
        // Restaurar footer
        const footer = document.querySelector('.main-footer');
        if (footer) footer.style.backgroundColor = '#FFFFFF';
    }
}

createDarkModeToggle();

// ============================================
// 13. SISTEMA DE DESCUENTOS Y OFERTAS
// ============================================
function createDiscountBanner() {
    // Calcular tiempo restante (ejemplo: 2 días desde ahora)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 2);
    
    const banner = document.createElement('div');
    banner.classList.add('discount-banner');
    banner.style.cssText = `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        text-align: center;
        padding: 15px 20px;
        position: relative;
        z-index: 100;
    `;
    
    banner.innerHTML = `
        <div class="container" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
            <span style="font-weight: bold; font-size: 1.1rem;">
                🎉 ¡OFERTA ESPECIAL! 50% de descuento en todos los cursos
            </span>
            <span class="countdown-timer" style="font-weight: bold; font-size: 1.2rem; background: rgba(255,255,255,0.2); padding: 8px 15px; border-radius: 5px;">
                ⏰ --:--:--
            </span>
            <button onclick="this.closest('.discount-banner').remove()" style="background: transparent; border: 2px solid white; color: white; padding: 5px 15px; border-radius: 5px; cursor: pointer; font-weight: bold;">
                Cerrar
            </button>
        </div>
    `;
    
    // Insertar antes del header
    const header = document.querySelector('.main-header');
    if (header) {
        document.body.insertBefore(banner, header);
    }
    
    // Iniciar countdown
    updateCountdown(endDate);
    setInterval(() => updateCountdown(endDate), 1000);
}

function updateCountdown(endDate) {
    const countdownEl = document.querySelector('.countdown-timer');
    if (!countdownEl) return;
    
    const now = new Date().getTime();
    const distance = endDate.getTime() - now;
    
    if (distance < 0) {
        countdownEl.textContent = '¡Oferta terminada!';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    countdownEl.textContent = `⏰ ${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Mostrar banner solo si no se ha cerrado en esta sesión
if (!sessionStorage.getItem('bannerClosed')) {
    createDiscountBanner();
    
    // Guardar en sessionStorage cuando se cierre
    const closeBannerBtn = document.querySelector('.discount-banner button');
    if (closeBannerBtn) {
        closeBannerBtn.addEventListener('click', () => {
            sessionStorage.setItem('bannerClosed', 'true');
        });
    }
}



// ===== Modal: Botón Explorar y botón X =====
const modal = document.getElementById("welcomeModal");
const modalClose = document.getElementById("modal-close");
const btnExplorar = document.getElementById("btn-explorar");

if(modalClose){
    modalClose.addEventListener("click", () => {
        modal.style.display = "none";
    });
}

if(btnExplorar){
    btnExplorar.addEventListener("click", () => {
        document.querySelector("#cursos").scrollIntoView({
            behavior: "smooth"
        });
        modal.style.display = "none";
    });
}


// ============================================
// 16. ANIMACIONES AL HACER SCROLL (Intersection Observer)
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Aplicar a elementos que queremos animar
    const elementsToAnimate = document.querySelectorAll('.course-card, .info-card, .importance, .contact-section h2');
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Ejecutar cuando el DOM esté completamente cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
    initScrollAnimations();
}

// ============================================
// 17. ESTADÍSTICAS ANIMADAS (Hero Section)
// ============================================
function createAnimatedStats() {
    const hero = document.querySelector('.hero-content');
    if (!hero) return;
    
    const statsContainer = document.createElement('div');
    statsContainer.classList.add('hero-stats');
    statsContainer.style.cssText = `
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 30px;
        margin-top: 40px;
        text-align: center;
    `;
    
    const stats = [
        { number: 5000, suffix: '+', label: 'Estudiantes' },
        { number: 50, suffix: '+', label: 'Cursos' },
        { number: 98, suffix: '%', label: 'Satisfacción' },
        { number: 24, suffix: '/7', label: 'Soporte' }
    ];
    
    stats.forEach((stat, index) => {
        const statDiv = document.createElement('div');
        statDiv.style.cssText = `
            background: rgba(255, 255, 255, 0.9);
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        `;
        
        statDiv.innerHTML = `
            <div class="stat-number" data-target="${stat.number}" data-suffix="${stat.suffix}" style="
                font-size: 2.5rem;
                font-weight: bold;
                color: #0052cc;
                margin-bottom: 5px;
            ">0${stat.suffix}</div>
            <div style="
                font-size: 0.9rem;
                color: #666;
                font-weight: bold;
            ">${stat.label}</div>
        `;
        
        statsContainer.appendChild(statDiv);
        
        // Animar números cuando sean visibles
        setTimeout(() => animateNumber(statDiv.querySelector('.stat-number')), index * 200);
    });
    
    hero.appendChild(statsContainer);
}

function animateNumber(element) {
    const target = parseInt(element.dataset.target);
    const suffix = element.dataset.suffix;
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

createAnimatedStats();

// ============================================
// 18. LAZY LOADING DE IMÁGENES
// ============================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

initLazyLoading();

// ============================================
// 19. SISTEMA DE FAVORITOS / WISHLIST
// ============================================
let wishlist = JSON.parse(localStorage.getItem('dataMastersWishlist')) || [];

function addWishlistButtons() {
    courseCards.forEach(card => {
        const cardContent = card.querySelector('.card-content');
        if (!cardContent) return;
        
        // Verificar si ya tiene el botón
        if (cardContent.querySelector('.wishlist-btn')) return;
        
        const title = card.querySelector('h3')?.textContent || '';
        const isInWishlist = wishlist.includes(title);
        
        const button = document.createElement('button');
        button.classList.add('wishlist-btn');
        button.innerHTML = isInWishlist ? '❤️' : '🤍';
        button.title = isInWishlist ? 'Quitar de favoritos' : 'Agregar a favoritos';
        button.style.cssText = `
            position: absolute;
            top: 15px;
            left: 15px;
            background-color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            z-index: 10;
            transition: transform 0.2s ease;
        `;
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(title, button);
        });
        
        button.addEventListener('mouseover', () => {
            button.style.transform = 'scale(1.1)';
        });
        
        button.addEventListener('mouseout', () => {
            button.style.transform = 'scale(1)';
        });
        
        card.appendChild(button);
    });
}

function toggleWishlist(courseTitle, button) {
    const index = wishlist.indexOf(courseTitle);
    
    if (index === -1) {
        wishlist.push(courseTitle);
        button.innerHTML = '❤️';
        button.title = 'Quitar de favoritos';
        showNotification(`"${courseTitle}" agregado a favoritos`, 'success');
    } else {
        wishlist.splice(index, 1);
        button.innerHTML = '🤍';
        button.title = 'Agregar a favoritos';
        showNotification(`"${courseTitle}" eliminado de favoritos`, 'info');
    }
    
    localStorage.setItem('dataMastersWishlist', JSON.stringify(wishlist));
    
    // Animación
    button.style.animation = 'heartBeat 0.5s ease';
    setTimeout(() => button.style.animation = '', 500);
}

// Agregar animación heartBeat
const heartBeatStyle = document.createElement('style');
heartBeatStyle.textContent = `
    @keyframes heartBeat {
        0%, 100% { transform: scale(1); }
        25% { transform: scale(1.3); }
        50% { transform: scale(1.1); }
        75% { transform: scale(1.3); }
    }
`;
document.head.appendChild(heartBeatStyle);

addWishlistButtons();

// ============================================
// 20. CONSOLE.LOG DE BIENVENIDA
// ============================================
console.log('%c¡Bienvenido a DataMasters! 🎓', 'color: #00ABE4; font-size: 24px; font-weight: bold;');
console.log('%c¿Interesado en el código? ¡Explora y aprende!', 'color: #0052cc; font-size: 14px;');
console.log('%cScript cargado exitosamente ✅', 'color: #4CAF50; font-size: 12px;');



// === Carrusel Compacto ===

const track = document.getElementById("carr-track");
const btnLeft = document.getElementById("btn-left");
const btnRight = document.getElementById("btn-right");

let indexC = 0;

function updateCarrusel() {
    const itemWidth = track.querySelector(".carr-item").offsetWidth + 20; // +gap
    track.style.transform = `translateX(-${indexC * itemWidth}px)`;
}

btnRight.addEventListener("click", () => {
    const totalItems = track.children.length;

    if (indexC < totalItems - 2) indexC++;
    else indexC = 0;

    updateCarrusel();
});

btnLeft.addEventListener("click", () => {
    const totalItems = track.children.length;

    if (indexC > 0) indexC--;
    else indexC = totalItems - 2;

    updateCarrusel();
});

window.addEventListener("resize", updateCarrusel);



// === MODAL VISTA RÁPIDA ===
const quickModal = document.getElementById("quickModal");
const quickImg = document.getElementById("quickImg");
const quickTitle = document.getElementById("quickTitle");
const quickDesc = document.getElementById("quickDesc");
const quickLink = document.getElementById("quickLink");
const quickClose = document.querySelector(".quick-close");

// abrir modal
document.querySelectorAll(".quick-view-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        const card = e.target.closest(".course-card");

        quickImg.src = card.dataset.img;
        quickTitle.textContent = card.dataset.title;
        quickDesc.textContent = card.dataset.desc;
        quickLink.href = card.dataset.link;

        quickModal.style.display = "flex";
    });
});

// cerrar modal
quickClose.addEventListener("click", () => {
    quickModal.style.display = "none";
});

// cerrar haciendo clic afuera
quickModal.addEventListener("click", (e) => {
    if (e.target === quickModal) {
        quickModal.style.display = "none";
    }
});

function(){
                // Inicializa EmailJS con tu user ID (obténlo en https://www.emailjs.com)
                emailjs.init('mVbxxoSDQvbg68vOa'); // <- reemplaza TU_USER_ID

                const form = document.getElementById('contact-form');
                const status = document.getElementById('form-status');

                form.addEventListener('submit', function(e){
                    e.preventDefault();
                    status.style.display = 'none';

                    // Opcional: validación extra antes de enviar
                    const name = form.from_name.value.trim();
                    const email = form.from_email.value.trim();
                    const message = form.message.value.trim();
                    if (!name || !email || !message) {
                        status.textContent = 'Por favor completa todos los campos.';
                        status.style.color = 'red';
                        status.style.display = '';
                        return;
                    }

                    // Envía usando tu service ID y template ID (configura en EmailJS)
                    emailjs.sendForm('service_yd7pbxd', 'template_yjw7amy', this)
                        .then(function(){
                            status.textContent = 'Mensaje enviado correctamente. ¡Gracias!';
                            status.style.color = 'green';
                            status.style.display = '';
                            form.reset();
                        }, function(error){
                            console.error('Error EmailJS:', error);
                            status.textContent = 'Error al enviar. Intenta de nuevo más tarde.';
                            status.style.color = 'red';
                            status.style.display = '';
                        });
                });
            })();
