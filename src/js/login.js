import { changeUser, getUserFromLocalStorage} from "./user.js";

const chooseActiveEntry=()=>{
    let userEntryBtn=document.querySelector('.header__right-entry');
    userEntryBtn.classList.add('header__right-entry_active');
}
chooseActiveEntry()

getUserFromLocalStorage()

let formLogin=document.querySelector('.login__form');
let message=document.querySelector('.register__message');
let resetBtn=document.querySelector('.register__message-btn');

formLogin.addEventListener('submit',(e)=>{
    e.preventDefault()
    if(e.target[1].value === e.target[2].value && 
        e.target[1].value !== '' && e.target[2].value !== ''){
        const userData={
            email: e.target[0].value,
            password: e.target[1].value
        }

        fetch('http://localhost:8080/login', {
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
            if(response.accessToken){
            location.href='http://127.0.0.1:5500/index.html'
            }else{
                alert('Email или пороль с ошибкой. Повторите вход в аккаут.')
                location.href='http://127.0.0.1:5500/src/pages/login.html'
            }
            
        })
        .catch(err=>alert(err))
    }else{
        message.classList.add('register__message_active');
    }    
})
resetBtn.addEventListener('click',(e)=>{
    e.preventDefault(); 
    formLogin.reset(); 
    message.classList.remove('register__message_active');  
})