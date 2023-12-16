import { getUserFromLocalStorage,user } from "./user.js";
import { getCart } from "./cart.js";
import { viewContent } from "./viewContent.js";

getUserFromLocalStorage();

let url='http://localhost:8080/products?';

let productsList=document.querySelector('.home__products');
let selectPrice=document.querySelector('.home__select-price');
let selectCategory=document.querySelector('.home__select-category');
let selectGender=document.querySelector('.home__select-gender');
let selectBrand=document.querySelector('.home__select-brand');
let search=document.querySelector('.home__search-input');
//let user=document.querySelector('.header__right-user');
let userEntryBtn=document.querySelector('.header__right-entry');
let userExitBtn=document.querySelector('.header__right-exit');

//Переключение кнопки Вход/Выход
export const chooseActiveBtn=()=>{
    // if (user !== null) {
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

let filterPrice='';
let filterCategory='';
let filterGender='';
let filterBrand='';
let searchValue='';

const getProducts=()=>{
    fetch(url+
        `${filterPrice.length ? '_sort=price&_order='+filterPrice+'&' : ''}`
        +`${filterCategory.length ? 'category='+filterCategory+'&' : ''}` 
        +`${filterGender.length ? 'gender='+filterGender+'&' : ''}`
        +`${filterBrand.length ? 'brand='+filterBrand+'&' : ''}`
        +`${searchValue.length ? 'title_like='+searchValue : ''}`
        )
    .then(resolve=>resolve.json())
    .then(resolve=>{
        productsList.innerHTML='';

        viewContent(resolve, productsList, getProducts);

    })
    .catch(error=>console.log(error))

    getCart();
}
if(selectPrice !==null && 
    selectCategory !==null && 
    selectGender !==null && 
    selectBrand !==null && 
    search !==null){

selectPrice.addEventListener('change', (e)=>{
    filterPrice=e.target.value;  //"" или "desc" или "asc"
    getProducts();
})
selectCategory.addEventListener('change', (e)=>{
    filterCategory=e.target.value;  
    getProducts();
})
selectGender.addEventListener('change', (e)=>{
    filterGender=e.target.value;  
    getProducts();
})
selectBrand.addEventListener('change', (e)=>{
    filterBrand=e.target.value;  
    getProducts();
})
search.addEventListener('keyup', (e)=>{
    searchValue = e.target.value;
    getProducts();
})
}

getProducts();