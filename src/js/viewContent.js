import { addCart, cartData, deleteCart, setLocalStorage } from "./cart.js";
import { addFavorite, deleteFavorite, favoriteData, setLocalStorageFavorite } from "./favorite.js";

export const viewContent=(resolve, dataList, getProducts)=>{
resolve.forEach(item=>{
    dataList.innerHTML += `
    <div class="home__card">
        ${favoriteData.filter(el=>el.id===item.id).length ? 
            `<div data-id="${item.id}" class="home__card-icon_active removeFavorite">
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                width="30px" height="30px" viewBox="0 0 544.582 544.582" style="enable-background:new 0 0 544.582 544.582;"
                xml:space="preserve" fill="#d01112">
                    <g>
                        <path d="M448.069,57.839c-72.675-23.562-150.781,15.759-175.721,87.898C247.41,73.522,169.303,34.277,96.628,57.839
                            C23.111,81.784-16.975,160.885,6.894,234.708c22.95,70.38,235.773,258.876,263.006,258.876
                            c27.234,0,244.801-188.267,267.751-258.876C561.595,160.732,521.509,81.631,448.069,57.839z"/>
                    </g>
                </svg>
            </div>
            `
            : `<div data-id="${item.id}" class="home__card-icon addFavorite">
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 485.3 485.3" style="enable-background:new 0 0 485.3 485.3;" xml:space="preserve">
                    <g>
                        <path d="M349.6,28.95c-36.3,0-70.5,14.2-96.2,39.9l-10.6,10.6L232,68.65c-25.7-25.7-59.9-39.9-96.2-39.9
                            c-36.2,0-70.3,14.1-96,39.8S0,128.35,0,164.65s14.2,70.4,39.9,96.1l190.5,190.5l0.4,0.4c3.3,3.3,7.7,4.9,12,4.9
                            c4.4,0,8.8-1.7,12.1-5l190.5-190.5c25.7-25.7,39.9-59.8,39.9-96.1s-14.1-70.5-39.8-96.1C419.9,43.05,385.8,28.95,349.6,28.95z
                            M421.2,236.75l-178.3,178.4L64.2,236.45c-19.2-19.2-29.8-44.7-29.9-71.9c0-27.1,10.5-52.6,29.7-71.8
                            c19.2-19.1,44.7-29.7,71.7-29.7c27.2,0,52.7,10.6,72,29.9l22.9,22.9c6.4,6.4,17.8,6.4,24.3,0l22.8-22.8
                            c19.2-19.2,44.8-29.8,71.9-29.8s52.6,10.6,71.8,29.8c19.2,19.2,29.8,44.7,29.7,71.9C451.1,192.05,440.5,217.55,421.2,236.75z"/>
                    </g>
                </svg>
            </div>
            `
        }
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
    let addFavoriteBtns=document.querySelectorAll('.addFavorite');
    let removeFavoriteBtns=document.querySelectorAll('.removeFavorite');

    Array.from(addCartBtns).forEach(item=>{
        item.addEventListener('click', ()=>{
            let product=resolve.find(el=>el.id===+item.dataset.id)
            addCart(product)
            getProducts(); //перерисовать данные чтобы кнопка плюс изменилась на галочку
            setLocalStorage()
        })
    })
    Array.from(removeCartBtns).forEach(item=>{
        item.addEventListener('click', ()=>{
            deleteCart(item,item.dataset.id)
            getProducts(); //перерисовать данные чтобы кнопка с галочкой изменилась на плюс
            setLocalStorage()
        })
    })
    
    //поместить/удалить товар в избранные
    Array.from(addFavoriteBtns).forEach(item=>{
        item.addEventListener('click', ()=>{
            let product=resolve.find(el=>el.id===+item.dataset.id)
            addFavorite(product)
            getProducts();
            setLocalStorageFavorite();
        })
    })
    Array.from(removeFavoriteBtns).forEach(item=>{
        item.addEventListener('click', ()=>{
            deleteFavorite(item.dataset.id);
            getProducts();
            setLocalStorageFavorite();
        })
    })

})
}