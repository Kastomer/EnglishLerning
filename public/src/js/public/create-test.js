document.querySelectorAll('.popup-controll__content').forEach(creates => {
  let btn = creates.querySelector('.popup-controll__btn_create');
  let rus = [], eng = [];
  let name, clas;

  btn.onclick = () =>{
    let id = btn.dataset.id;
    creates.querySelectorAll('.popup-controll__input_question').forEach(engInput => {
      eng.push(engInput.value);
    });

    creates.querySelectorAll('.popup-controll__input_answer').forEach(rusInput => {
      rus.push(rusInput.value);
    });
    name = creates.querySelector('.popup-controll__input_name').value;
    clas = creates.querySelector('.popup-controll__input_class').value;

    if (eng.length == 0 || rus.length == 0 || name.length == 0 || clas.length == 0) {
      alert('Не верные данные');
      return;
    }
    console.log(rus,eng,name,clas);

    fetch('/teacher-lk/newtest', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        rus: rus,
        eng: eng,
        name: name,
        clas: clas,
        id: id
      })
    })
  }
})