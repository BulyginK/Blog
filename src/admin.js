'use strict';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('form');
  const menuAvatar = document.querySelector('.menu__avatar');
  const imgAvatar = document.querySelector('#menu__avatar');
  const messageAlert = document.querySelector('.show-message__alert');
  const messagePublish = document.querySelector('.show-message__publish');
  const buttonPublish = document.querySelector('.main-top__publ-button');
  const removeImgAuthorButton = document.querySelector('.remove-file-avatar');
  const removeImgButtons = document.querySelectorAll('.remove-file-img');

  const imgAutor = form.querySelector('#author_photo');
  const imgBigImg = form.querySelector('#input-bigImg');
  const imgSmallImg = form.querySelector('#small-img');
  const inputDate = form.querySelector('[name="date"]');
  const inputContent = form.querySelector('[name="content"]');

  let selectFiles = form.querySelectorAll('.select');
  let inputsValue = form.querySelectorAll('.input');
  const classRedBorder = 'form-data__input-border-red';
  const classVisibilityMessage = 'show-message-visibility';
  const classContentRedBorder = 'form-data__content-border-red';
  const classImgBorder = 'form-data__big-img-border';

  const appData = {
    formData: {},
    maxLengthValue: 30,
    init: function () {
      this.addListeners();
      buttonPublish.addEventListener('click', this.sendData);
      inputContent.addEventListener('input', this.addDataForm);
      inputContent.addEventListener('input', this.checkContent);
      removeImgAuthorButton.addEventListener('click', this.removeImgAuthor);
    },
    addListeners: function () {
      for (let i = 0; i < selectFiles.length; i++) {
        selectFiles[i].addEventListener('change', this.previewFile);
      };
      for (let i = 0; i < inputsValue.length; i++) {
        inputsValue[i].addEventListener('input', this.checkValue);
      };
      for (let i = 0; i < inputsValue.length; i++) {
        inputsValue[i].addEventListener('input', this.showPreview);
      };
      for (let i = 0; i < inputsValue.length; i++) {
        inputsValue[i].addEventListener('input', this.addDataForm);
      };
      for (let i = 0; i < removeImgButtons.length; i++) {
        removeImgButtons[i].addEventListener('click', this.removeImg);
      };
    },
    checkValue: function () {
      let titleNoName = this.nextElementSibling;

      if (this.value === "") {
        titleNoName.setAttribute("style", "display: block");
        this.classList.add(classRedBorder);
      } else {
        titleNoName.setAttribute("style", "display: none");
        this.classList.remove(classRedBorder);
        messageAlert.classList.remove(classVisibilityMessage);
      };
    },
    checkContent: function () {
      if (this.value === "") {
        this.nextElementSibling.setAttribute("style", "display: block");
        this.classList.add(classContentRedBorder);
      } else {
        this.nextElementSibling.setAttribute("style", "display: none");
        this.classList.remove(classContentRedBorder);
        messageAlert.classList.remove(classVisibilityMessage);
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
        if (img.parentNode.parentNode.classList.contains('author-photo')) {
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
          img.parentNode.classList.add(classImgBorder);
        };
        if (img.parentNode.classList.contains('small-img')) {
          imgPostPreview.src = reader.result;
          imgPostPreview.setAttribute("style", "display: block");
          img.parentNode.classList.add(classImgBorder);
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
        img.parentNode.parentNode.nextElementSibling.setAttribute("style", "display: none");;
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
      for (let i = 0; i < inputsValue.length; i++) {
        inputsValue[i].value = '';
      };
      inputContent.value = '';
    },
    removeSelectFiles: function () {
      for (let i = 0; i < inputsValue.length; i++) {
        inputsValue[i].value = '';
      };
    },
    removeImgAuthor: function (e) {
      e.preventDefault();
      const imgInput = this.parentNode.parentNode.querySelector('.img-input');
      const removeBlock = this.parentNode.parentNode.querySelector('.remove-block');
      const uploadBlock = this.parentNode.parentNode.querySelector('.form-data__upload-block');
      const imgAuthorPreview = form.querySelector('#img-author-preview');

      imgAuthorPreview.src = "";
      imgAvatar.src = "";
      imgAuthorPreview.setAttribute("style", "display: none");
      imgAvatar.setAttribute("style", "display: none");
      imgInput.setAttribute("style", "display: none");
      removeBlock.setAttribute("style", "display: none");
      uploadBlock.setAttribute("style", "display: flex");
      menuAvatar.setAttribute("style", "display: flex");
    },
    removeAvatar: function (img) {
      const imgInput = img.parentNode.parentNode.querySelector('.img-input');
      const removeBlock = img.parentNode.parentNode.querySelector('.remove-block');
      const uploadBlock = img.parentNode.parentNode.querySelector('.form-data__upload-block');
      const imgAuthorPreview = form.querySelector('#img-author-preview');

      imgAuthorPreview.src = "";
      imgAvatar.src = "";
      imgAuthorPreview.setAttribute("style", "display: none");
      imgAvatar.setAttribute("style", "display: none");
      imgInput.setAttribute("style", "display: none");
      removeBlock.setAttribute("style", "display: none");
      uploadBlock.setAttribute("style", "display: flex");
      menuAvatar.setAttribute("style", "display: flex");
    },
    removeImg: function (e) {
      e.preventDefault();
      const imgInput = this.parentNode.parentNode.querySelector('.img-input');
      const bigImgPreview = form.querySelector('.article-preview__img-post');
      const imgPreview = form.querySelector('.article-preview__img');
      const imgPostPreview = form.querySelector('.img-post__img');
      const provisionSizeImg = this.parentNode.parentNode.querySelector('.form-data__provision-size');
      const uploadBlock = this.parentNode.parentNode.querySelector('.form-data__upload-block');
      const removeBlock = this.parentNode;
      imgInput.src = "";
      imgInput.setAttribute("style", "display: none");
      removeBlock.setAttribute("style", "display: none");
      uploadBlock.setAttribute("style", "display: flex");
      provisionSizeImg.setAttribute("style", "display: block");
      imgInput.parentNode.classList.remove(classImgBorder);
      if (this.parentNode.parentNode.classList.contains('big-img')) {
        imgPreview.src = "";
        imgPreview.setAttribute("style", "display: none");
        bigImgPreview.setAttribute("style", "display: block");
      };
      if (this.parentNode.parentNode.classList.contains('small-img')) {
        imgPostPreview.src = "";
        imgPostPreview.setAttribute("style", "display: none");
      }
    },
    removeImgs: function (img) {
      const imgInput = img.parentNode.parentNode.querySelector('.img-input');
      const bigImgPreview = form.querySelector('.article-preview__img-post');
      const imgPreview = form.querySelector('.article-preview__img');
      const imgPostPreview = form.querySelector('.img-post__img');
      const provisionSizeImg = img.parentNode.parentNode.querySelector('.form-data__provision-size');
      const uploadBlock = img.parentNode.parentNode.querySelector('.form-data__upload-block');
      const removeBlock = img.parentNode;
      imgInput.src = "";
      imgInput.setAttribute("style", "display: none");
      removeBlock.setAttribute("style", "display: none");
      uploadBlock.setAttribute("style", "display: flex");
      provisionSizeImg.setAttribute("style", "display: block");
      imgInput.parentNode.classList.remove(classImgBorder);
      if (img.parentNode.parentNode.classList.contains('big-img')) {
        imgPreview.src = "";
        imgPreview.setAttribute("style", "display: none");
        bigImgPreview.setAttribute("style", "display: block");
      };
      if (img.parentNode.parentNode.classList.contains('small-img')) {
        imgPostPreview.src = "";
        imgPostPreview.setAttribute("style", "display: none");
      }
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
        messagePublish.classList.add(classVisibilityMessage);
        setTimeout(() => messagePublish.classList.remove(classVisibilityMessage), 3000);
      } else {
        console.log(res);
        messageAlert.classList.add(classVisibilityMessage);
      }
    },
    highlightingRequired: function () {
      for (let i = 0; i < inputsValue.length; i++) {
        if (inputsValue[i].value === "") {
          let titleNoName = inputsValue[i].nextElementSibling;
          titleNoName.setAttribute("style", "display: block");
          inputsValue[i].classList.add(classRedBorder);
        }
      }
      for (let i = 0; i < selectFiles.length; i++) {
        if (selectFiles[i].value === "") {
          selectFiles[i].parentNode.nextElementSibling.setAttribute("style", "display: block");
        }
      }
      if (inputContent.value === "") {
        inputContent.nextElementSibling.setAttribute("style", "display: block");
        inputContent.classList.add(classContentRedBorder);
      }
    },
    sendData: function (event) {
      event.preventDefault();
      let date = new Date(inputDate.value);
      let dateString = date.toLocaleDateString('en-US');
      let nameImgAutor = imgAutor.files.length === 0 ? undefined : imgAutor.files[0].name;
      let nameBigImg = imgBigImg.files.length === 0 ? undefined : imgBigImg.files[0].name;
      let nameSmallImg = imgSmallImg.files.length === 0 ? undefined : imgSmallImg.files[0].name;

      let jsonData = {
        Title: appData.formData['title'],
        Subtitle: appData.formData['subtitle'],
        AuthorName: appData.formData['author'],
        AuthorPhoto: appData.formData['avatar'],
        AuthorPhotoName: nameImgAutor,
        PublishDate: dateString,
        BigImage: appData.formData['big-image'],
        BigImageName: nameBigImg,
        SmallImage: appData.formData['small-img'],
        SmallImageName: nameSmallImg,
        Content: appData.formData['content'],
      }
      console.log(jsonData);

      if (!appData.validate(jsonData)) {
        appData.sendForm(jsonData);
        appData.removeInputValue();
        appData.removeAvatar(removeImgAuthorButton);
        for (let i = 0; i < removeImgButtons.length; i++) {
          appData.removeImgs(removeImgButtons[i]);
        }
      } else {
        appData.highlightingRequired();
        messageAlert.classList.add(classVisibilityMessage);
      }
    }
  }

  appData.init();
})