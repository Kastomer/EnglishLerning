document.querySelectorAll(".header").forEach(hed => {
    const btn = hed.querySelector(".btn-entry");
    const url = btn.dataset.url;
    const popupFade = hed.querySelector(".popup-fade");
    const popupClose = hed.querySelector(".popup-close");


    btn.onclick = () => {
        if (url === "/") {

            $(popupFade).fadeIn();
            window.scrollTo(0, 0);

            $(popupClose).click(function () {
                $(this).parents('.popup-fade').fadeOut();
                return false;
            });


        } else {
            return;
        }
    }
})