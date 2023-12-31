import { user } from "./user.js";

let userEntryBtn=document.querySelector('.header__right-entry');
let userExitBtn=document.querySelector('.header__right-exit');


//Переключение кнопки Вход/Выход
export const chooseActiveBtn=()=>{
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
    location.href='./src/pages/register.html'
})