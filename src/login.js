'use strict';

document.addEventListener("DOMContentLoaded", () => {
  const inputsValue = document.querySelectorAll('.input');
  const inputEmail = document.querySelector('.input__email');
  const inputPassword = document.querySelector('.input__password');
  const alertIncorrect = document.querySelector('.form__alert-incorrect');
  const alertEmpty = document.querySelector('.form__alert-empty');
  const buttomLogIn = document.querySelector('.form__button');
  const passwordInput = document.querySelector('#password');
  const passwordEye = document.querySelector('.input__eye-img');
  const incorrectEmail = document.querySelector('.form__incorrect-alert');

  const classRedBorder = 'input-border-red';
  const classGreyBackground = 'input-background-grey';
  const srcEyeShow = '/static/img/eye.svg';
  const srcEyeHide = '/static/img/eye-off.svg';
  const classVisibilityMessage = 'alert-visibility';
  let showPw = 0;

  const appData = {
    formData: {},
    init: function () {
      this.addListeners();
      passwordEye.addEventListener('click', this.clickEye, false);
      buttomLogIn.addEventListener('click', this.login, false)
    },
    addListeners: function () {
      for (let i = 0; i < inputsValue.length; i++) {
        inputsValue[i].addEventListener('input', this.checkValue, false);
      };
      for (let i = 0; i < inputsValue.length; i++) {
        inputsValue[i].addEventListener('input', this.addDataForm, false);
      };
    },
    addDataForm: function () {
      appData.formData[this.name] = this.value;
    },
    checkValue: function () {
      let requiredAlert = this.parentNode.nextElementSibling;

      if (this.value === "") {
        requiredAlert.setAttribute("style", "display: block");
        this.classList.add(classRedBorder);
        this.classList.remove(classGreyBackground);
        alertEmpty.classList.remove(classVisibilityMessage);
        alertIncorrect.classList.remove(classVisibilityMessage);
        incorrectEmail.setAttribute("style", "display: none");
      } else {
        requiredAlert.setAttribute("style", "display: none");
        this.classList.remove(classRedBorder);
        this.classList.add(classGreyBackground);
        alertEmpty.classList.remove(classVisibilityMessage);
        alertIncorrect.classList.remove(classVisibilityMessage);
        incorrectEmail.setAttribute("style", "display: none");
      };
    },
    showPassword: function () {
      passwordInput.setAttribute('type', 'text');
      passwordEye.src = srcEyeShow;
    },
    hidePassword: function () {
      passwordInput.setAttribute('type', 'password');
      passwordEye.src = srcEyeHide
    },
    clickEye: function () {
      if (showPw == 0) {
        showPw = 1;
        appData.showPassword();
      } else {
        showPw = 0;
        appData.hidePassword();
      }
    },
    validateEmail: function () {
      let pattern = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
      let errors = 0;

      if (!pattern.test(inputEmail.value)) {
        alertEmpty.classList.remove(classVisibilityMessage);
        alertIncorrect.classList.add(classVisibilityMessage);
        inputEmail.classList.add(classRedBorder);
        incorrectEmail.setAttribute("style", "display: block");
        errors++
      }
      return errors
    },
    login: function (event) {
      event.preventDefault()

      let jsonData = {
        Email: appData.formData['email'],
        Password: appData.formData['password'],
      };

      if (inputEmail.value != "" && inputPassword.value != "") {
        if (!appData.validateEmail()) {
          alert("OK!")
        }
      } else {
        alertEmpty.classList.add(classVisibilityMessage);
        for (let i = 0; i < inputsValue.length; i++) {
          if (inputsValue[i].value === "") {
            let requiredAlert = inputsValue[i].parentNode.nextElementSibling;
            inputsValue[i].classList.add(classRedBorder);
            requiredAlert.setAttribute("style", "display: block");
          }
        }
      }
    }
  }

  appData.init();
})