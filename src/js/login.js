import { changeUser, getUserFromLocalStorage } from "./user.js";

getUserFromLocalStorage()

let formLogin=document.querySelector('.login__form');

formLogin.addEventListener('submit',(e)=>{
    e.preventDefault()

    const userData={
        email: e.target[0].value,
        password: e.target[1].value
    }

    fetch('http://localhost:8080/signin', {
        method:'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    }).then(response=>response.json())
    .then(response=>{
        alert('Вход в аккаунт')
        changeUser({
            ...response.user,
            token: response.accessToken
        })
    })
    .catch(err=>alert(err))
})