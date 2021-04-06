document.querySelectorAll(".private-office__content").forEach(content =>{
    const popup  = content.querySelector(".popup-controll-create");
    const popupFade = popup.querySelector(".popup-fade_control");
    const popupClose = popup.querySelector(".popup-close");

    content.querySelector(".test-card-person_control-add").onclick = () =>{
        $(popupFade).fadeIn();
        window.scrollTo(0, 0);
        
        $(popupClose).click(function () {
            $(popupFade).fadeOut();
            return false;
        });
    }
});