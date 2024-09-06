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

const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');

itemDetailButtons.forEach((btn) => {
    btn.onclick = (e) => {
        itemDetailModal.style.display = 'flex';
        e.preventDefault();
    };
});


document.querySelector('.modal .close-icon').onclick = (e) => {
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
            { id: 6, name: 'Jersey Bola', img: '6.png', price: 150000 },
            { id: 7, name: 'Jersey Bulu Tangkis', img: '7.png', price: 150000 },
            { id: 8, name: 'Jersey Basket', img: '8.png', price: 150000 },
            { id: 9, name: 'Jersey Voli', img: '9.png', price: 150000 },
            { id: 10, name: 'Jersey BaseBall', img: '10.png', price: 150000 },
            { id: 11, name: 'Jersey Tenis Meja', img: '11.png', price: 150000 },
            { id: 12, name: 'Jersey Golf', img: '12.png', price: 150000 },
            { id: 13, name: 'Jersey Gaming', img: '13.png', price: 150000 },
            { id: 14, name: 'Jersey Komunitas sepeda', img: '14.png', price: 150000 },
            { id: 15, name: 'Jersey Komunitas Mancing', img: '15.png', price: 150000 },
            { id: 16, name: 'Jersey Racing', img: '16.png', price: 150000 },
            { id: 17, name: 'Jersey Euro', img: '17.png', price: 150000 },
            { id: 18, name: 'Jersey Komunitas Pramuka', img: '18.png', price: 150000 },
            { id: 19, name: 'Jersey Beladiri', img: '19.png', price: 150000 },
            { id: 20, name: 'Jersey Retro', img: '20.png', price: 150000 },
            { id: 21, name: 'Kemeja Printing', img: '21.png', price: 150000 },
            { id: 22, name: 'Jaket Printing', img: '22.png', price: 150000 },
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


checkoutButton.addEventListener('click', function(e) {
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
    J. Kain    : ${obj.jeniskain}
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