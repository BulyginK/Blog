'use strict';

document.addEventListener("DOMContentLoaded", () => {
  const inputValue = document.querySelectorAll('.input');
  const inputEmail = document.querySelector('.input__email');
  const alertBlock = document.querySelector('.form__alert');
  const alertIncorrect = document.querySelector('.form__alert-incorrect');
  const alertEmpty = document.querySelector('.form__alert-empty');
  const buttomLogIn = document.querySelector('.form__button');
  const passwordInput = document.querySelector('#password');
  const passwordEye = document.querySelector('.input__eye-img');

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
      for (let i = 0; i < inputValue.length; i++) {
        inputValue[i].addEventListener('input', this.checkValue, false);
      };
      for (let i = 0; i < inputValue.length; i++) {
        inputValue[i].addEventListener('input', this.addDataForm, false);
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
      } else {
        requiredAlert.setAttribute("style", "display: none");
        this.classList.remove(classRedBorder);
        this.classList.add(classGreyBackground);
        alertEmpty.classList.remove(classVisibilityMessage);
        alertIncorrect.classList.remove(classVisibilityMessage);
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
    validate: function (jsonData) {
      let errors = 0;
      let pattern = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
      // /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
      // /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

      for (let key in jsonData) {
        if (!jsonData[key]) {
          alertEmpty.classList.add(classVisibilityMessage);
          errors++
        }
      };
      if (errors == 0 && !pattern.test(inputEmail.value)) {
        alertIncorrect.classList.add(classVisibilityMessage);
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

      if (!appData.validate(jsonData)) {
        alert('Все ОК');
      } else {

      }
    }
  }

  appData.init();
})