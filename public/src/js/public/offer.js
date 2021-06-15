document.querySelectorAll(".ofer").forEach(el => {
  let btn = el.querySelector(".btn-entry");
  const popup = document.querySelector(".popup-autorez__content");
  const popupFade = document.querySelector(".popup-fade");
  const popupClose = document.querySelector(".popup-close");
  btn.onclick = () => {
    // popup.querySelector(".popup-autorez__fields-school").style.display = "none";
    popup.style.maxWidth = "792px";
    $(popupFade).fadeIn();
    window.scrollTo(0, 0);

    popup.dataset.user = "student";

    $(popupClose).click(function () {
      $(this).parents('.popup-fade').fadeOut();
      return false;
    });
  }
})