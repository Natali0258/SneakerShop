export let user={
    login:"",
    email:""
}

export const getUserFromLocalStorage=()=>{
    if(localStorage.getItem('user')!==null){
        user=JSON.parse(localStorage.getItem('user'))
    }
}

export const changeUser=(data)=>{
    user={...data}
    console.log('USER=',user)
    localStorage.setItem('user', JSON.stringify(user))
    location.href='http://127.0.0.1:5500/index.html'
}
