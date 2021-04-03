document.querySelectorAll(".btn-entry").forEach(btn => {

    const url = btn.dataset.url;
    btn.onclick = () => {
        if (url === "/") {

            $('.popup-fade').fadeIn();

            $('.popup-close').click(function () {
                $(this).parents('.popup-fade').fadeOut();
                return false;
            });
        } else {
            return;
        }
    }
})