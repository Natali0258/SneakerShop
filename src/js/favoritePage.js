import { getCart } from "./cart.js";
import { favoriteData } from "./favorite.js";
import { chooseActiveBtn } from "./home.js";
import { getUserFromLocalStorage } from "./user.js";
import { viewContent } from "./viewContent.js";

getUserFromLocalStorage();

let favoriteProducts=document.querySelector('.favorite__products');
let favoriteNone=document.querySelector('.favorite__none');
let favoriteNoneBtn=document.querySelector('.favorite__none-btn');


let userEntryBtn=document.querySelector('.header__right-entry');
let userExitBtn=document.querySelector('.header__right-exit');

chooseActiveBtn();

userExitBtn.addEventListener('click',()=>{
    localStorage.removeItem('user');
    userExitBtn.classList.remove('header__right-exit_active');
    userEntryBtn.classList.add('header__right-entry_active');
})

userEntryBtn.addEventListener('click',()=>{
    location.href='./src/pages/register.html'
})

const getFavorites=()=>{
    favoriteProducts.innerHTML='';

    viewContent(favoriteData, favoriteProducts, getFavorites);

    if(favoriteData.length){
        favoriteNone.style.display='none'
        favoriteProducts.style.display='flex'
    }else{
        favoriteNone.style.display='flex'
        favoriteProducts.style.display='none'
    }

    getCart();
}

favoriteNoneBtn.addEventListener('click', ()=>{
    location.href="../../index.html"
})

getFavorites();