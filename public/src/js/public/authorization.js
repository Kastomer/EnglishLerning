document.querySelectorAll(".header").forEach(hed => {
    const btn = hed.querySelector(".btn-entry");
    if (!btn) {
        return;
    }
    const btnTeacher = hed.querySelector(".btn-entry__teacher");
    const url = btn.dataset.url;
    const popup = hed.querySelector(".popup-autorez__content");
    const popupFade = hed.querySelector(".popup-fade");
    const popupClose = hed.querySelector(".popup-close");

    btn.onclick = () => {
        if (url === "/") {

            popup.querySelector(".popup-autorez__fields-school").style.display = "none";
            popup.style.maxWidth = "792px";
            $(popupFade).fadeIn();
            window.scrollTo(0, 0);

            popup.dataset.user = "student";

            $(popupClose).click(function () {
                $(this).parents('.popup-fade').fadeOut();
                return false;
            });
        } else {
            return;
        }
    }


    btnTeacher.onclick = () => {
        if (url === "/") {

            popup.querySelector(".popup-autorez__fields-school").style.display = "flex";
            popup.style.maxWidth = "1200px";

            $(popupFade).fadeIn();
            window.scrollTo(0, 0);

            popup.dataset.user = "teacher";

            $(popupClose).click(function () {
                $(this).parents('.popup-fade').fadeOut();
                return false;
            });
        } else {
            return;
        }
    }
})