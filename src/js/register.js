import { changeUser, getUserFromLocalStorage,user } from "./user.js";

const chooseActiveEntry=()=>{
    let userEntryBtn=document.querySelector('.header__right-entry');
    userEntryBtn.classList.add('header__right-entry_active');
}
chooseActiveEntry()

getUserFromLocalStorage()

let formRegister=document.querySelector('.register__form');
let message=document.querySelector('.register__message');
let resetBtn=document.querySelector('.register__message-btn');

formRegister.addEventListener('submit',(e)=>{
    e.preventDefault()
    if(e.target[2].value === e.target[3].value && 
        e.target[2].value !== '' && e.target[3].value !== ''){
        const userData={
            login: e.target[0].value,
            email: e.target[1].value,
            password: e.target[2].value
        }
        fetch('http://localhost:8080/users', {
            method:'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        }).then(response=>response.json())
        .then(response=>{
            changeUser({
                ...response.user,
                token: response.accessToken
            })
            alert('Пользователь зарегистрирован');
            location.href='http://127.0.0.1:5500/index.html'
        })
        .catch(()=>alert('Аккаунт не создан'))
    }else{
        message.classList.add('register__message_active');
    }
})
resetBtn.addEventListener('click',(e)=>{
    e.preventDefault(); 
    formRegister.reset(); 
    message.classList.remove('register__message_active');  
})