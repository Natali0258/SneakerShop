import { favoriteData } from "./favorite.js";

export let cartData=[];

let headerCartBtn=document.querySelector('.header__right-cart');
let cart=document.querySelector('.cart');
let cartCards=document.querySelector('.cart__cards');
let cartDarkBlock=document.querySelector('.cart__block');
let totalCart=document.querySelectorAll('.total');
let percentCart=document.querySelector('.percent');
let countCart=document.querySelector('.count-cart');
let countFavorite=document.querySelector('.count-favorite');

export const setLocalStorage=()=>{
    localStorage.setItem('cart', JSON.stringify(cartData))
}

//если localStorage заполнен, то данные из него переносим в корзину cartData
if(JSON.parse(localStorage.getItem('cart'))!==null){
    cartData=JSON.parse(localStorage.getItem('cart'))
}

export const addCart=(product)=>{
    cartData=[...cartData, product]
}

export const deleteCart=(item,id)=>{
    cartData=cartData.filter(item=>item.id!==+id);
    if(item.classList.contains('remove') && !cartData.length){
        cart.classList.remove('cart_active')
    }
}

//открыть/закрыть карзину
headerCartBtn.addEventListener('click',()=>{
    cart.classList.add('cart_active');
})
cartDarkBlock.addEventListener('click',()=>{
    cart.classList.remove('cart_active')
})

export const getCart=()=>{
    cartCards.innerHTML='';
    cartData.forEach(item=>{
        cartCards.innerHTML += `
            <div class="cart__card">
                <img class="cart__card-image" src='${item.image}' alt="image">
                <div class="cart__card-block">
                    <h3 class="cart__card-block-title">${item.title}</h3>
                    <p class="cart__card-block-price">${item.price} руб.</p>
                </div>
                <button data-id="${item.id}" class="cart__card-del removeCart remove">x</button>
            </div>
        `
    })

    //расчет суммы товаров в корзине и расчет налога
    Array.from(totalCart).forEach(item=>{
        item.textContent=cartData.reduce((acc,res)=>{
            return acc+res.price
        },0)
    })
    percentCart.textContent=Math.ceil(cartData.reduce((acc,res)=>{
        return acc+res.price
    },0)/100*5)
    countCart.textContent=cartData.length;
    countFavorite.textContent=favoriteData.length;

    
    let removeCartBtns=document.querySelectorAll('.removeCart');
    Array.from(removeCartBtns).forEach(item=>{
        item.addEventListener('click', ()=>{
            deleteCart(item,item.dataset.id)
            getCart(); //перерисовать данные
            setLocalStorage()
        })
    })

}
getCart()