export const updateLocalStorage = (data) =>{
    localStorage.setItem("token", JSON.stringify(data));
}