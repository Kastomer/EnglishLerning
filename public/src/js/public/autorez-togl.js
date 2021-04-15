const autorezTogle = (elHide, elShow) =>{
    elHide.style.display = "none";
    elHide.classList.remove(`${elHide.classList[0]}_active`);

    elShow.style.display = "flex";
    elShow.classList.add(`${elShow.classList[0]}_active`);
}

document.querySelectorAll(".popup-autorez__content").forEach(content =>{
    const login = content.querySelector(".popup-autorez__btn_autorez");
    const regis = content.querySelector(".popup-autorez__btn_regis");

    const loginContent = content.querySelector(".popup-autorez__fields_authorization");
    const regisContent = content.querySelector(".popup-autorez__fields");

    login.onclick = () =>{
        autorezTogle(regisContent,loginContent);
        content.style.height = "330px";
        document.querySelector(".popup-autorez__header").querySelector("p").innerHTML = "Авторизация";
    }

    regis.onclick = () =>{
        autorezTogle(loginContent, regisContent);
        content.style.height = "390px";
        document.querySelector(".popup-autorez__header").querySelector("p").innerHTML = "Регистрация";
    }
})