export let favoriteData=[]

export const addFavorite=(product)=>{
    favoriteData=[...favoriteData, product]
}

export const deleteFavorite=(id)=>{
    favoriteData=favoriteData.filter(item=>item.id!==+id)
}

export const setLocalStorageFavorite=()=>{
    localStorage.setItem('favorite', JSON.stringify(favoriteData))
}

if (localStorage.getItem('favorite') !== null) {
    favoriteData = JSON.parse(localStorage.getItem('favorite'));
}