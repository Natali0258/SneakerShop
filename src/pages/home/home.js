let url='http://localhost:8080/products?';

let products=document.querySelector('.home__products');
let selectPrice=document.querySelector('.home__select-price');
let selectCategory=document.querySelector('.home__select-category');
let selectGender=document.querySelector('.home__select-gender');
let selectBrand=document.querySelector('.home__select-brand');
let search=document.querySelector('.home__search-input');

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
        // console.log(resolve)
        products.innerHTML='';
        resolve.forEach(item=>{
            products.innerHTML += `
            <div class="home__card">
                <img class="home__card-icon" src="./src/assets/images/add-to-favourite.svg" alt="favorite">
                <img class="home__card-image" src='${item.image}' alt="image">
                <h3 class="home__card-title">${item.title}</h3>
                <p class="home__card-gender">
                    <span class="home__card-text">пол:</span>
                    ${item.gender === "men" ? "мужской" : "женский" }
                </p>
                <p class="home__card-category">
                    <span class="home__card-text">категория:</span>
                    ${item.category === "train" ? "для тренировок" : item.category === "run" ? "для бега" : "для прогулок"}
                </p>
                <p class="home__card-price">
                    <span class="home__card-text">ЦЕНА:</span>
                    ${item.price} руб.
                </p>
            </div>
            `
        })
    })
    .catch(error=>alert(error))

    selectPrice.addEventListener('change', (e)=>{
        filterPrice=e.target.value;  //"" или "desc" или "asc"
        getProducts();
    })
    selectCategory.addEventListener('change', (e)=>{
        filterCategory=e.target.value;  //"" или "desc" или "asc"
        getProducts();
    })
    selectGender.addEventListener('change', (e)=>{
        filterGender=e.target.value;  //"" или "desc" или "asc"
        getProducts();
    })
    selectBrand.addEventListener('change', (e)=>{
        filterBrand=e.target.value;  //"" или "desc" или "asc"
        getProducts();
    })
    search.addEventListener('keyup', (e)=>{
        searchValue = e.target.value;
        getProducts();
    })
    
}

getProducts();