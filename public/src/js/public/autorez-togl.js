document.querySelectorAll(".popup-autorez__content").forEach(content =>{
    const loginContent = content.querySelector(".popup-autorez__fields_authorization");
    const regisContent = content.querySelector(".popup-autorez__fields");

    const regisWrap  = content.querySelector(".popup-autorez__btn_regis");
    const loginWrap = content.querySelector(".popup-autorez__btn_login");

    const regisReqBtn = regisWrap.querySelector(".popup-autorez__btn_registr");
    const loginReqBtn = loginWrap.querySelector(".popup-autorez__btn_autorez");

    const logimReqBtnSwap = regisWrap.querySelector(".popup-autorez__btn_autorez");
    const regisReqBtnSwap = loginWrap.querySelector(".popup-autorez__btn_registr");

    const btnAddSchool = content.querySelector(".popup-autorez__fields-school-btn");
    const btnBackSchool = content.querySelector(".popup-autorez__fields-school-btn_back");

    const schoolSelectedContent = content.querySelector(".popup-autorez__fields-school-selected");
    const schoolAddContent = content.querySelector(".popup-autorez__fields-school-add");

    regisReqBtn.onclick = ()  => {
        let password = regisContent.pas.value == regisContent.pas_two.value ? regisContent.pas.value : alert("Пароли не совпадают");
       
        let classRoom;

        let url;

        let sendData;

        if (content.dataset.user == "student") {
            url = "/regstudent";
            classRoom = prompt("Укажите в каком кдассе вы находитесь", "7А");
            
            sendData = {
                lostname: regisContent.FIO.value.split(' ')[1],
                firstname: regisContent.FIO.value.split(' ')[0],
                patronymic: regisContent.FIO.value.split(' ')[2],
                phone: regisContent.phone.value,
                email: regisContent.mail.value,
                password: password,
                classRoom: classRoom
            }

            if (sendData.classRoom == undefined || sendData.password == undefined || sendData.lostname == undefined || sendData.firstname == undefined || sendData.patronymic == undefined || sendData.phone == undefined || sendData.email == undefined ) {
                alert("Данные для регистрации указынны не верно");
                return;
            }
        } else {
            url = "/regteacher";
            // classRoom = prompt("Укажите усебное заведение", "МОБУ СОШ №3")
            sendData = {
                lostname: regisContent.FIO.value.split(' ')[1],
                firstname: regisContent.FIO.value.split(' ')[0],
                patronymic: regisContent.FIO.value.split(' ')[2],
                phone: regisContent.phone.value,
                email: regisContent.mail.value,
                password: password,
                // schoolId: content.querySelector(".popup-autorez__fields-school-select").value 
            }
        }

        let policy = content.querySelector(".policy").querySelector('input[type=checkbox]');
        
        if (policy.checked == false) {
            alert("Примите пользовательское соглашение!");
            return;
        }

        fetch(url,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(sendData)
        }) .then(response => response.json())
        .then(result => {
            if (result.route) {
                location.href = result.route;
            } else {
                alert("Что то пошло не так");
                return;
            }
        })
    }

    loginReqBtn.onclick = ()  => {
        let password = loginContent.pas.value
        let sendData = {
            login: loginContent.login.value,
            password: password,
        }
        if (password == undefined || sendData.login == undefined) {
            alert("Не верные данные для авторизации");
            return;
        } 
        
        let url = content.dataset.user == "student" ? "/logstudent" : "/logteacher";

        fetch(url,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(sendData)
        }) .then(response => response.json())
        .then(result => {
            if (result.route) {
                location.href = result.route;
            } else {
                alert("Что то пошло не так");
                return;
            }
        })
    }

    logimReqBtnSwap.onclick = ()  => {
        regisContent.style.display = "none";
        loginContent.style.display = "flex";

        regisWrap.style.display = "none";
        loginWrap.style.display = "flex";
        // console.log(content.dataset.user);
        document.querySelector(".popup-autorez__header").querySelector("p").innerHTML = "Авторизация";
    }

    regisReqBtnSwap.onclick = ()  => {
        loginContent.style.display = "none";
        regisContent.style.display = "flex";

        loginWrap.style.display = "none";
        regisWrap.style.display = "flex";

        document.querySelector(".popup-autorez__header").querySelector("p").innerHTML = "Регистрация";
    }

 
})