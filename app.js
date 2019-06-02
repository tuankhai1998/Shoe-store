const item = document.querySelectorAll('.item');
const buy = document.querySelectorAll('.buy');
const addTocart = document.querySelectorAll('.btn-add-to-cart ');
const cart = document.getElementById('cart');
const btnshowmenu = document.getElementById('btn-show-menu');
const buyNow = document.getElementsByClassName('btn-buy-now');



function addItemToFavorite() {
    addTocart.forEach(function (item) {
        item.addEventListener('click', function (e) {
            createItemFavorite(e);
            removeItemCart();
            minusCount();
            plusCount();
        });
        // console.log(item);

    });
}

function createItemFavorite(itemInfo) {
    let DetailProduct = null;

    if (itemInfo.target.parentElement.classList.contains("btn-add-to-cart")) {
        DetailProduct = getDetailProduct(itemInfo);
    }
    else {
        if (itemInfo.target.classList.contains("btn-add-to-cart")) {
            DetailProduct = getDetailInProductPage(itemInfo);
        }
    }

    let cartItem = document.createElement("div");

    cartItem.classList.add(
        "item-cart"
    );

    cartItem.innerHTML = `
        <img class="item-cart-img" src="images/${DetailProduct.img}" alt="">
        <div class="item-cart-details">
            <h4 class="item-name">${DetailProduct.name}</h4>
            <p class="price"> <span>${DetailProduct.price}</span> <span>$</span> </p>
        </div>
        <div class="item-cart-price">
            <div>
                <a class="minus">-</a>
                <input type="text" readonly class="count" value="1">
                <a class="plus">+</a>
            </div>
            <p class="total">200$</p>

        </div>
        <img src="images/icon/rubbish-bin.svg" alt="" class="remove">
`;

    let cartImg = document.querySelector('.cart_img');

    cart.insertBefore(cartItem, cartImg);
    // body
}

function showMenu() {
    btnshowmenu.addEventListener('click', function (e) {
        let menu = this.parentElement.children[1];
        menu.classList.toggle("show-menu");
    });

}

function showDetailWithBuyNow() {

    if (buyNow[0]) {
        buyNow[0].addEventListener('click', function (e) {
            showDetail();
        });
    }
    else {
        buy.forEach(function (product) {
            product.addEventListener('click', function (e) {
                showDetail();
            });
        });
    }



}

function showDetail() {
    let detailItem = document.getElementById('details-item');
    detailItem.classList.add('show-details');
    // body
}

function closeDetail() {
    let detailItem = document.getElementById('details-item');
    let btnClose = detailItem.children[0];
    btnClose.addEventListener('click', function (e) {
        detailItem.classList.remove('show-details');
    });

}

function getDetailProduct(event) {

    let productItem = event.target.parentElement.parentElement.parentElement.parentElement;

    if (productItem.classList.contains("item")) {
        productItem = productItem.children[0];
    }

    if (productItem.classList.contains("page-item")) {
        productItem = productItem;
        // console.log(productItem)
    }

    if (productItem.classList.contains("row")) {
        productItem = productItem.children[0].children[0];
    }

    let fullPath = productItem.children[2].src;
    let idProduct = productItem.children[2].alt;
    let indexImgName = fullPath.indexOf('image') + 7;
    let nameImg = fullPath.slice(indexImgName);
    let productName = productItem.children[3].children[0].textContent;
    let price = productItem.children[1].children[0].textContent;

    // console.log(productItem.children[1]);

    const itemProduct = {};

    itemProduct.img = nameImg;
    itemProduct.ID = idProduct;
    itemProduct.name = productName;
    itemProduct.price = price;

    return itemProduct;
}

function getDetailInProductPage(event) {
    let productPageItem = event.target.parentElement.parentElement;
    let nameProduct = productPageItem.children[0].textContent;
    let priceProduct = productPageItem.children[1].textContent;
    let fullPath = productPageItem.parentElement.children[0].children[0].children[0].children[0].children[0].src;
    let indexImgName = fullPath.indexOf('image') + 7;
    let nameImg = fullPath.slice(indexImgName);

    const itemProductInPage = {};

    itemProductInPage.img = nameImg;
    // itemProductInPage.ID = idProduct;
    itemProductInPage.name = nameProduct;
    itemProductInPage.price = priceProduct;

    return itemProductInPage;
    // body
}

function itemClick() {
    item.forEach(function (item) {
        let clickItem = item.children[0].children[2];
        // console.log(clickItem);
        clickItem.addEventListener('click', function (e) {

            // console.log(getDetailProduct(e));
            window.location = "./page.html";
        });
    });


}

function showMoreInfo() {
    let readMoreInfo = document.querySelector('.read-more-info');
    readMoreInfo.setAttribute('aria-expanded', 'true');

}

function hidenModeInfor() {
    let readMoreInfo = document.querySelector('.read-more-info');
    readMoreInfo.setAttribute('aria-expanded', 'flase');
}


function menuItemClick() {
    // console.log();
    window.location = "./page.html";
}

function minusCount() {
    let minus = document.querySelectorAll('.minus');
    minus.forEach(function (item) {
        item.addEventListener('click', function (e) {
            let valueInput = Number(this.nextElementSibling.value);
            // let valueInput = this.nextElementSibling.value;
            if (valueInput != 0) {
                valueInput = valueInput - 1;
                this.nextElementSibling.value = '';
                this.nextElementSibling.value = (valueInput).toString();
                totalPrice(item);

            }
            // console.log(this.nextElementSibling.value);
        });
    });
    // body
}

function plusCount() {
    let plus = document.querySelectorAll('.plus');
    plus.forEach(function (item) {
        item.addEventListener('click', function (e) {
            let valueInput = Number(this.previousElementSibling.value);
            if (valueInput < 100) {
                this.previousElementSibling.value = '';
                this.previousElementSibling.value = (valueInput + 1).toString();
                totalPrice(item);

            }
        });
    });
    // body
}

function totalPrice(item) {
    let unitPrice = item.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent;
    let totalPrice = 0;
    if (item.classList.contains('minus')) {
        totalPrice = Number(unitPrice) * Number(item.nextElementSibling.value);
    }
    else {
        totalPrice = Number(unitPrice) * Number(item.previousElementSibling.value);
    }

    item.parentElement.nextElementSibling.innerHTML = totalPrice.toString() + '$';

    // body
}

function removeItemCart() {
    let remove = document.querySelectorAll('.remove');
    remove.forEach(function (item) {
        item.addEventListener('click', function (e) {
            this.parentElement.remove();
        });
    });
    // body
}

var swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});


window.addEventListener('load', function (e) {

    addItemToFavorite();

    closeDetail();

    showDetailWithBuyNow();

    itemClick();

    showMenu();

    removeItemCart();
    
});





// scrollAnimagted();






