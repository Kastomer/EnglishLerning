document.querySelectorAll(".private-office__content").forEach(content =>{
    const popupC  = content.querySelector(".popup-controll-create");
    if (popupC == null) return;
    const popupD  = content.querySelector(".popup-controll-delite");
    const popupFadeAdd = popupC.querySelector(".popup-fade_control");
    const popupFadeDel = popupD.querySelector(".popup-fade_delite");
    const popupCloseC = popupC.querySelector(".popup-close");
    const popupCloseD = popupD.querySelector(".popup-close");

    

    content.querySelector(".test-card-person_control-add").onclick = () =>{
        $(popupFadeAdd).fadeIn();
        window.scrollTo(0, 0);
        
        $(popupCloseC).click(function () {
            $(popupFadeAdd).fadeOut();
            return false;
        });
    }

    content.querySelector(".test-card-person_control-del").onclick = () =>{
        $(popupFadeDel).fadeIn();
        window.scrollTo(0, 0);
        
        $(popupCloseD).click(function () {
            $(popupFadeDel).fadeOut();
            return false;
        });
    }
});