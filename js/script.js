const navbarNav = document.querySelector ('.navbar-nav');
document.querySelector('#menu').onclick = () => {
    navbarNav.classList.toggle('active')
};

const searchForm = document.querySelector('.search-form');
const searchBox =  document.querySelector('#search-box');

document.querySelector('#search-button').onclick = (e) => {
    searchForm.classList.toggle('active');
    searchBox.focus();
    e.preventDefault();
};

const shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#shopping-cart-button').onclick = (e) => {
    shoppingCart.classList.toggle('active');
    e.preventDefault();
};

const menu = document.querySelector('#menu');
const sb = document.querySelector('#search-button')
const sc = document.querySelector('#shopping-cart-button')
document.addEventListener('click', function (e) {
    if (!menu.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }

    if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
        searchForm.classList.remove('active');
    }

    if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
        shoppingCart.classList.remove('active');
    }
});
document.addEventListener('DOMContentLoaded', function() {
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');

itemDetailButtons.forEach((btn) => {
    btn.onclick = (e) => {
        itemDetailModal.style.display = 'flex';
        e.preventDefault();
    };
});
})
const closeIcon = document.querySelector('.modal-container .close-icon ').onclick = (e) => {
    itemDetailModal.style.display = 'none';
    e.preventDefault();
};

window.onclick = (e) => {
    if (e.target === itemDetailModal){
        itemDetailModal.style.display = 'none';
    }
};



document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            { id: 31, name: 'Curriculum Vitae 1', img: '31.jpg', price: 15000 },
            { id: 40, name: 'Curriculum Vitae 2', img: '40.jpg', price: 15000 },
            { id: 45, name: 'Curriculum Vitae 3', img: '45.jpg', price: 15000 },
            { id: 220, name: 'Curriculum Vitae 4', img: '220.jpg', price: 15000 },
            { id: 140, name: 'Curriculum Vitae 5', img: '140.jpg', price: 15000 },
            { id: 176, name: 'Curriculum Vitae 6', img: '176.jpg', price: 15000 },
            { id: 2, name: 'Kartu Nama', img: '2.jpg', price: 25000 },
            { id: 283, name: 'Web Berita dan Portal Media Professional', img: '283.png', price: 3000000 },
            { id: 270, name: 'Web Portofolio dan Profil Professional', img: '270.jpg', price: 800000 },
            { id: 2001, name: 'Landing Page', img: '2001.png', price: 600000 },
        ],
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            const cartItem = this.items.find((item) => item.id === newItem.id);
            if(!cartItem) {
                this.items.push({ ...newItem, quantity: 1, total: newItem.price });
                this.quantity++;
                this.total += newItem.price;
                console.log(this.total); 
            } else {
                this.items = this.items.map( (item) => {
                    if(item.id !== newItem.id) {
                        return item;
                    } else {
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                })
            }
        },
        remove(id) {
            const cartItem = this.items.find((item) => item.id === id);
            if(cartItem.quantity > 1) {
                this.items = this.items.map((item) => {
                    if(item.id !== id) {
                        return item
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                })
            } else if (cartItem.quantity === 1) {
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        }
    });
});

searchBox.addEventListener('input', () => {
    const searchTerm = searchBox.value.toLowerCase();
    document.querySelectorAll('products').forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});


const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.disabled = true;

const form = document.querySelector('#checkoutForm');
form.addEventListener('keyup', function() {
    for(let i = 0; i < form.elements.length; i++) {
        if(form.elements[i].value.length !== 0) {
            checkoutButton.classList.remove('disabled');
            checkoutButton.classList.add('disabled');
        } else {
            return false;
        }
    }
    checkoutButton.disabled = false;
    checkoutButton.classList.remove('disabled');
});


checkoutButton.addEventListener('click', async function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const objData = Object.fromEntries(data);
    const message = formatMessage(objData);
    window.open('http://wa.me/6289508162066?text=' + encodeURIComponent(message));
    

});

const formatMessage = (obj) => {
    return `Data Customer
    Nama    : ${obj.name}
    No Hp   : ${obj.phone}
    Note     : ${obj.note}
Data Pesanan
${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`)}
TOTAL: ${rupiah(obj.total)}
Terima kasih.`;
};

const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
};

