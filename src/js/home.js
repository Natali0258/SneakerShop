let url='http://localhost:8080/products?';

let cartData=[];

let products=document.querySelector('.home__products');
let selectPrice=document.querySelector('.home__select-price');
let selectCategory=document.querySelector('.home__select-category');
let selectGender=document.querySelector('.home__select-gender');
let selectBrand=document.querySelector('.home__select-brand');
let search=document.querySelector('.home__search-input');
let cartCards=document.querySelector('.cart__cards');
let headerCartBtn=document.querySelector('.header__right-cart');
let cart=document.querySelector('.cart');
let cartDarkBlock=document.querySelector('.cart__block');
let totalCart=document.querySelectorAll('.total');
let percentCart=document.querySelector('.percent');
let user=document.querySelector('.header__right-user');

let filterPrice='';
let filterCategory='';
let filterGender='';
let filterBrand='';
let searchValue='';

const setLocalStorage=()=>{
    localStorage.setItem('cart', JSON.stringify(cartData))
}

//если localStorage заполнен, то данные из него переносим в корзину cartData
if(JSON.parse(localStorage.getItem('cart'))!==null){
    cartData=JSON.parse(localStorage.getItem('cart'))
}

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
        products.innerHTML='';
        resolve.forEach(item=>{
            products.innerHTML += `
            <div class="home__card">
                <img class="home__card-icon" src="./src/assets/images/add-to-favourite.svg" alt="favorite">
                <img class="home__card-image" src='${item.image}' alt="image">
                <h3 cltDataass="home__card-title">${item.title}</h3>
                <p class="home__card-gender">
                    <span class="home__card-text">пол:</span>
                    ${item.gender === "men" ? "мужской" : "женский" }
                </p>
                <p class="home__card-category">
                    <span class="home__card-text">категория:</span>
                    ${item.category === "train" ? "для тренировок" : item.category === "run" ? "для бега" : "для прогулок"}
                </p>
                <div class="home__card-block">
                
                    <p class="home__card-price">
                        <span class="home__card-text">ЦЕНА:</span>
                        ${item.price} руб.
                    </p>
                    
                    ${cartData.filter(el=>el.id===item.id).length ? 
                        `<div data-id="${item.id}" class="home__card-plus_active removeCart"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 229.153 229.153" style="enable-background:new 0 0 229.153 229.153;" xml:space="preserve"><g><path d="M92.356,223.549c7.41,7.5,23.914,5.014,25.691-6.779c11.056-73.217,66.378-134.985,108.243-193.189 C237.898,7.452,211.207-7.87,199.75,8.067C161.493,61.249,113.274,117.21,94.41,181.744 c-21.557-22.031-43.201-43.853-67.379-63.212c-15.312-12.265-37.215,9.343-21.738,21.737 C36.794,165.501,64.017,194.924,92.356,223.549z" fill="#000000" style="fill: rgb(255, 255, 255);"></path></g></svg></div>` 
                        : `<div data-id="${item.id}" class="home__card-plus addCart">+</div>`
                    }
                    
                </div>
            </div>
            `

            let addCartBtns=document.querySelectorAll('.addCart');
            let removeCartBtns=document.querySelectorAll('.removeCart');

            Array.from(addCartBtns).forEach(item=>{
                item.addEventListener('click', ()=>{
                    cartData=[...cartData, resolve.find(el=>el.id===+item.dataset.id)]
                    getProducts(); //перерисовать данные чтобы кнопка плюс изменилась на галочку
                    setLocalStorage()
                })
            })
            Array.from(removeCartBtns).forEach(item=>{
                item.addEventListener('click', ()=>{
                    cartData=cartData.filter(el=>el.id!==+item.dataset.id)
                    if(item.classList.contains('remove') && !cartData.length){
                        cart.classList.remove('cart_active')
                    }
                    getProducts(); //перерисовать данные чтобы кнопка с галочкой изменилась на плюс
                    setLocalStorage()
                })
            })

        })
    })
    .catch(error=>alert(error))

    getCart();

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

    //расчет суммы товаров в корзине и расчет налога
    Array.from(totalCart).forEach(item=>{
        item.textContent=cartData.reduce((acc,res)=>{
            return acc+res.price
        },0)
    })
    percentCart.textContent=Math.ceil(cartData.reduce((acc,res)=>{
        return acc+res.price
    },0)/100*5)
    
}

const getCart=()=>{
    cartCards.innerHTML=''
    cartData.forEach(item=>{
        cartCards.innerHTML += `
            <div class="cart__card">
                <img class="cart__card-image" src='${item.image}' alt="image">
                <div class="cart__pcard-block">
                    <h3 class="cart__card-block-title">${item.title}</h3>
                    <p class="cart__card-block-price">${item.price} руб.</p>
                </div>
                <button data-id="${item.id}" class="cart__card-del removeCart remove">x</button>
            </div>
        `
    })
}

//открыть/закрыть карзину
headerCartBtn.addEventListener('click',()=>{
    cart.classList.add('cart_active');
})
cartDarkBlock.addEventListener('click',()=>{
    cart.classList.remove('cart_active')
})

user.addEventListener('click',()=>{
    console.log(location)
    location.href='http://127.0.0.1:5500/src/pages/register.html'
})

getProducts();

