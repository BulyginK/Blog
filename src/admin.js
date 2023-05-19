'use strict';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('form');

  const appData = {
    title: '',
    maxLengthTitle: 25,
    maxLengthSubtitle: 40,
    maxLengthAuthorName: 30,

    init: function () {
      this.addListeners();

    },
    addListeners: function () {
      let selectFiles = form.querySelectorAll('.select');
      let inputValue = form.querySelectorAll('.input');

      for (let i = 0; i < selectFiles.length; i++) {
        selectFiles[i].addEventListener('change', this.check);
      };

      for (let i = 0; i < inputValue.length; i++) {
        inputValue[i].addEventListener('input', this.checkValue);
      };

      for (let i = 0; i < inputValue.length; i++) {
        inputValue[i].addEventListener('input', this.showPreview);
      };
    },
    checkValue: function () {
      let titleNoName = this.nextElementSibling;

      if (this.value === "") {
        titleNoName.setAttribute("style", "display: block");
      } else {
        titleNoName.setAttribute("style", "display: none");
      };
    },
    showPreview: function() {
      appData.showInputValue(this)
    },
    showInputValue: function(input) {
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
          inputPreviewElems[i].textContent = input.value.substr(0, appData.maxLengthTitle);
        };
      };
    },
    
  }
  appData.init();
});