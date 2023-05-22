'use strict';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('form');
  const menuAvatar = document.querySelector('.menu__avatar');
  const imgAvatar = document.querySelector('#menu__avatar');
  const messageAlert = document.querySelector('.show-message__alert');
  const messagePublish = document.querySelector('.show-message__publish');
  const buttonPublish = document.querySelector('.main-top__publ-button');

  const inputTitle = form.querySelector('[name="title"]');
  const inputSubtitle = form.querySelector('[name="subtitle"]');
  const inputAuthorName = form.querySelector('[name="author"]');

  const appData = {
    title: '',
    inputs: [],
    maxLengthValue: 30,
    maxLengthValues: {  //надо доделать 
      title: 25,
      subtitle: 40,
      author: 30,
    },

    init: function () {
      this.addListeners();
      this.addInputs();

    },
    addListeners: function () {
      let selectFiles = form.querySelectorAll('.select');
      let inputValue = form.querySelectorAll('.input');

      buttonPublish.addEventListener('click', this.sendData);

      for (let i = 0; i < selectFiles.length; i++) {
        selectFiles[i].addEventListener('change', this.previewFile);
      };

      for (let i = 0; i < inputValue.length; i++) {
        inputValue[i].addEventListener('input', this.checkValue);
      };

      for (let i = 0; i < inputValue.length; i++) {
        inputValue[i].addEventListener('input', this.showPreview);
      };
    },
    //доделать перебор
    addInputs: function () {
      let inputs = form.querySelectorAll('.input');

      inputs.forEach((input, maxLengthValues) => {
        const inputName = input.name;

        this.inputs.push({
          inputName: inputName,
          maxLengthValue: 0,
        });
      });
    },
    checkValue: function () {
      let titleNoName = this.nextElementSibling;

      if (this.value === "") {
        titleNoName.setAttribute("style", "display: block");
      } else {
        titleNoName.setAttribute("style", "display: none");
      };
    },
    showPreview: function () {
      appData.showInputValue(this)
    },
    showInputValue: function (input) {
      const classDarkTitle = 'preview-title-color-dark';
      let inputPreviewElems = form.querySelectorAll('.' + input.name + '');
      let defaultValue = input.placeholder;

      if (input.value === "") {
        for (let i = 0; i < inputPreviewElems.length; i++) {
          inputPreviewElems[i].classList.remove(classDarkTitle);
          inputPreviewElems[i].textContent = defaultValue;
        };
      } else {
        for (let i = 0; i < inputPreviewElems.length; i++) {
          inputPreviewElems[i].classList.add(classDarkTitle);
          inputPreviewElems[i].textContent = input.value.substr(0, appData.maxLengthValue);
        };
      };
    },
    readerOnloadend: function (img, reader, file) {
      const imgPreview = form.querySelector('.article-preview__img');
      const bigImgPreview = form.querySelector('.article-preview__img-post');
      const imgPostPreview = form.querySelector('.img-post__img');
      const imgAuthorPreview = form.querySelector('#img-author-preview');

      reader.onloadend = function () {
        img.src = reader.result;
        if (img.parentNode.classList.contains('author-photo')) {
          imgAuthorPreview.src = reader.result;
          imgAvatar.src = reader.result;
          imgAuthorPreview.setAttribute("style", "display: block");
          menuAvatar.setAttribute("style", "display: none");
          imgAvatar.setAttribute("style", "display: block");
        };
        if (img.parentNode.classList.contains('big-img')) {
          imgPreview.src = reader.result;
          imgPreview.setAttribute("style", "display: block");
          bigImgPreview.setAttribute("style", "display: none");
        };
        if (img.parentNode.classList.contains('small-img')) {
          imgPostPreview.src = reader.result;
          imgPostPreview.setAttribute("style", "display: block");
        }
      }
      reader.addEventListener("load", () => {
        img.src = reader.result;
      },
        false
      );
      if (file) {
        reader.readAsDataURL(file);
      }
    },
    previewFile: function () {
      const imgInput = this.parentNode.querySelector('.img-input');
      const removeBlock = this.parentNode.querySelector('.remove-block');
      const uploadBlock = this.parentNode.querySelector('.form-data__upload-block');
      const provisionSizeImg = this.parentNode.querySelector('.form-data__provision-size');
      const file = this.parentNode.querySelector('input[type=file]').files[0];
      const reader = new FileReader();

      imgInput.setAttribute("style", "display: block");
      removeBlock.setAttribute("style", "display: flex");
      uploadBlock.setAttribute("style", "display: none");
      if (provisionSizeImg) {
        provisionSizeImg.setAttribute("style", "display: none");
      };
      appData.readerOnloadend(imgInput, reader, file);
    },
    sendForm: async function (data) {
      const res = await fetch('/publish', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    sendData: function (event) {
      event.preventDefault()

      let dataForm = {
        title: inputTitle.value,
        subtitle: inputSubtitle.value,
        author: inputAuthorName.value,
      }

      appData.sendForm(dataForm)
        .then(data => {
          messagePublish.style.display = "flex";
          // removeForm();
          // formElements.forEach(input => {
          //   input.value = '';
          // });
          // removeAvatar();

          setTimeout(() => messagePublish.style.display = "none", 2500);
        })
        .catch(error => {
          messageAlert.style.display = "flex";

          setTimeout(() => messageAlert.style.display = "none", 2500);
        });
    },
  }
  appData.init();
});