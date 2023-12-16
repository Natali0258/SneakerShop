import { getCart } from "./cart.js";
import { favoriteData } from "./favorite.js";
import { getUserFromLocalStorage,user } from "./user.js";
import { viewContent } from "./viewContent.js";
//import { chooseActiveBtn } from "./header.js";

getUserFromLocalStorage();


let countFavorite=document.querySelector('.count-favorite');

let favoriteProducts=document.querySelector('.favorite__products');
let favoriteNone=document.querySelector('.favorite__none');
let favoriteNoneBtn=document.querySelector('.favorite__none-btn');

let userEntryBtn=document.querySelector('.header__right-entry');
let userExitBtn=document.querySelector('.header__right-exit');


//Переключение кнопки Вход/Выход
const chooseActiveBtn=()=>{
    if (user.login !== "" && user.email !== "") {
        userExitBtn.classList.add('header__right-exit_active');
        userEntryBtn.classList.remove('header__right-entry_active');
    } else {
        userEntryBtn.classList.add('header__right-entry_active');
        userExitBtn.classList.remove('header__right-exit_active');
    }
};
chooseActiveBtn()

userExitBtn.addEventListener('click',()=>{
    localStorage.removeItem('user');
    userExitBtn.classList.remove('header__right-exit_active');
    userEntryBtn.classList.add('header__right-entry_active');
})

userEntryBtn.addEventListener('click',()=>{
    location.href='./register.html'
})

const getFavorites=()=>{
    // При переходе со страницы "favorite" на главную страницу в консоли выходит ошибка:
    // "Cannot set properties of null (setting 'innerHTML') at getFavorites".
    // Т.е. favoriteProducts=null, пока загружается главная страница.
    if(favoriteProducts){
        favoriteProducts.innerHTML='';

        viewContent(favoriteData, favoriteProducts, getFavorites);

        if(favoriteData.length){
            favoriteNone.style.display='none'
            favoriteProducts.style.display='flex'
        }else{
            favoriteNone.style.display='flex'
            favoriteProducts.style.display='none'
        }

        countFavorite.textContent=favoriteData.length;

        getCart();
    }
}

if(favoriteData.length === 0){
    favoriteNoneBtn.addEventListener('click', ()=>{
        location.href="../../index.html"
    })
}

getFavorites();