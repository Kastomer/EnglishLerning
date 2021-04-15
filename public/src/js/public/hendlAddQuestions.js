document.querySelectorAll(".popup-controll__content").forEach(wrap => {
    
    const plas = wrap.querySelector(".popup-controll__btn_plas");
    const mines = wrap.querySelector(".popup-controll__btn_mines");

    if (plas != null) {
        plas.onclick = () =>{
            $(".popup-controll__inputs-wrap").append(`<div class="popup-controll__inputs-row"> <input class="popup-controll__input popup-controll__input_question" type="text" placeholder="Вопрос" /><img class="popup-controll__img" src="/images/Arrow - Right.png" alt="" /><input class="popup-controll__input popup-controll__input_answer" type="text" placeholder="Ответ" /></div>`);
        }

        mines.onclick = () =>{
            let len = document.querySelector(".popup-controll__inputs-wrap").childNodes.length;
            if (len-1 < 1) return false;
            document.querySelector(".popup-controll__inputs-wrap").childNodes[len-1].remove();;
        }
    }
});