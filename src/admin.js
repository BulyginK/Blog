'use strict';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('form');
  const menuAvatar = document.querySelector('.menu__avatar');
  const imgAvatar = document.querySelector('#menu__avatar');
  const messageAlert = document.querySelector('.show-message__alert');
  const messagePublish = document.querySelector('.show-message__publish');
  const buttonPublish = document.querySelector('.main-top__publ-button');

  const imgAutor = form.querySelector('#author_photo');
  const imgBigImg = form.querySelector('#input-bigImg');
  const imgSmallImg = form.querySelector('#small-img');
  const inputDate = form.querySelector('[name="date"]');
  const inputContent = form.querySelector('[name="content"]');

  let selectFiles = form.querySelectorAll('.select');
  let inputValue = form.querySelectorAll('.input');

  const appData = {
    defaultValue: {},
    formData: {},
    maxLengthValue: 30,
    init: function () {
      this.addListeners();
      this.addDefaultValue();
      buttonPublish.addEventListener('click', this.sendData);
      inputContent.addEventListener('input', this.addDataForm);
    },
    addListeners: function () {
      for (let i = 0; i < selectFiles.length; i++) {
        selectFiles[i].addEventListener('change', this.previewFile);
      };
      for (let i = 0; i < inputValue.length; i++) {
        inputValue[i].addEventListener('input', this.checkValue);
      };
      for (let i = 0; i < inputValue.length; i++) {
        inputValue[i].addEventListener('input', this.showPreview);
      };
      for (let i = 0; i < inputValue.length; i++) {
        inputValue[i].addEventListener('input', this.addDataForm);
      };
    },
    addDefaultValue: function () {
      for (let i = 0; i < inputValue.length; i++) {
        this.defaultValue[inputValue[i].name] = inputValue[i].placeholder;
      };
    },
    checkValue: function () {
      let titleNoName = this.nextElementSibling;

      if (this.value === "") {
        titleNoName.setAttribute("style", "display: block");
      } else if (this.type !== "date") {
        titleNoName.setAttribute("style", "display: none");
      };
    },
    addDataForm: function () {
      appData.formData[this.name] = this.value;
    },
    showPreview: function () {
      appData.showInputValue(this);
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
        appData.formData[img.name] = img.src;
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
    removeInputValue: function () {
      for (let i = 0; i < inputValue.length; i++) {
        inputValue[i].value = '';
      };
    },
    removeSelectFiles: function () {
      for (let i = 0; i < inputValue.length; i++) {
        inputValue[i].value = '';
      };
    },
    validate: function (jsonData) {
      let errors = 0;
      for (let key in jsonData) {
        if (!jsonData[key]) {
          errors++
        }
      }
      return errors
    },
    sendForm: async function (data) {
      const res = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (res.ok) {
        messagePublish.style.display = "flex";
        appData.removeInputValue();
        appData.removeSelectFiles();
        setTimeout(() => messagePublish.style.display = "none", 2500);
      } else {
        messageAlert.style.display = "flex";
        setTimeout(() => messageAlert.style.display = "none", 2500);
      }
    },
    sendData: function (event) {
      event.preventDefault()
      let date = new Date(inputDate.value);
      let dateString = date.toLocaleDateString('en-US');

      let jsonData = {
        Title: appData.formData['title'],
        Subtitle: appData.formData['subtitle'],
        AuthorName: appData.formData['author'],
        AuthorPhoto: appData.formData['avatar'],
        AuthorPhotoName: imgAutor.files[0].name,
        PublishDate: dateString,
        BigImage: appData.formData['big-image'],
        BigImageName: imgBigImg.files[0].name,
        SmallImage: appData.formData['small-img'],
        SmallImageName: imgSmallImg.files[0].name,
        Content: appData.formData['content'],
      };
      console.log(jsonData);

      if (!appData.validate(jsonData)) {
        appData.sendForm(jsonData);
      } else {
        for (let i = 0; i < inputValue.length; i++) {
          if (inputValue[i].value === "") {
            let titleNoName = inputValue[i].nextElementSibling;
            titleNoName.setAttribute("style", "display: block");
          }
        };
        messageAlert.style.display = "flex";
        setTimeout(() => messageAlert.style.display = "none", 2500);
      }
    }
  }

  appData.init();
})