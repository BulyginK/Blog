document.addEventListener("DOMContentLoaded", () => {
  const imgAvatar = document.querySelector('#menu__avatar');
  const menuAvatar = document.querySelector('.menu__avatar');
  const messageAlert = document.querySelector('.show-message__alert');
  const messagePublish = document.querySelector('.show-message__publish');
  const buttonPublish = document.querySelector('.main-top__publ-button');
  const form = document.querySelector('form');
  const formElements = form.querySelectorAll('input');
  const inputTitle = form.querySelector('[name="title"]');
  const inputSubtitle = form.querySelector('[name="subtitle"]');
  const inputAuthorName = form.querySelector('[name="author name"]');
  const authorNoName = form.querySelector('.form-data__author-required');

  const authorPhotoElems = form.querySelector('.form-data__author-photo');
  const imgCamera = authorPhotoElems.querySelector('.form-data__img-camera')
  const authorPhoto = authorPhotoElems.querySelector('#author_photo');
  const imgAuthor = authorPhotoElems.querySelector('#img-author');
  const uploadLink = authorPhotoElems.querySelector('.form-data__upload-link');
  const removeLink = authorPhotoElems.querySelector('.form-data__new-remove-block');
  const removeButton = removeLink.querySelector('button');

  const titleArticlePreview = form.querySelector('.article-preview__title');
  const titlePostCardPreview = form.querySelector('.post-info__preview-title');
  const subtitleArticlePreview = form.querySelector('.article-preview__subtitle');
  const subtitlePostCardPreview = form.querySelector('.post-info__preview-subtitle');
  const authorInPreview = form.querySelector('.author-preview__author-name');
  const imgAuthorPreview = form.querySelector('#img-author-preview');

  const defaultAvatar = titleArticlePreview.textContent;
  const defaultTitle = titleArticlePreview.textContent;
  const defaultSubtitle = subtitleArticlePreview.textContent;
  const defaultAuthorName = authorInPreview.textContent;

  const maxLengthTitle = 25;
  const maxLengthSubtitle = 40;
  const maxLengthAuthorName = 30;

  const classDarkTitle = 'preview-title-color-dark';
  const classDarkSubtitle = 'article-preview__subtitle-color-dark';
  const classImgAuthor = 'form-data__img-author';
  const classImgAuthorPreview = 'author-preview__img-author';

  const regularName = /^[а-яА-ЯЁёA-Za-z]+$/;

  inputTitle.addEventListener('input', () => {
    titleArticlePreview.textContent = inputTitle.value.substr(0, maxLengthTitle);
    titlePostCardPreview.textContent = inputTitle.value.substr(0, maxLengthTitle);

    titleArticlePreview.classList.add(classDarkTitle);
    titlePostCardPreview.classList.add(classDarkTitle);

    if (inputTitle.value == "") {
      titleArticlePreview.textContent = defaultTitle;
      titlePostCardPreview.textContent = defaultTitle;
      titleArticlePreview.classList.remove(classDarkTitle);
      titlePostCardPreview.classList.remove(classDarkTitle);
    }
  })

  inputSubtitle.addEventListener('input', () => {
    subtitleArticlePreview.textContent = inputSubtitle.value.substr(0, maxLengthSubtitle);
    subtitlePostCardPreview.textContent = inputSubtitle.value.substr(0, maxLengthSubtitle);

    if (inputSubtitle.value == "") {
      subtitleArticlePreview.textContent = defaultSubtitle;
      subtitlePostCardPreview.textContent = defaultSubtitle;
    }
  })

  inputAuthorName.addEventListener('input', () => {
    authorInPreview.textContent = inputAuthorName.value.substr(0, maxLengthAuthorName);

    if (inputAuthorName.value == "") {
      authorInPreview.textContent = defaultAuthorName;
      authorNoName.style.display = 'block';
    } else {
      authorNoName.style.display = 'none';
    }
  })

  const removeAvatar = () => {
    menuAvatar.style.display = 'flex';
    imgAvatar.style.display = "none";

    imgCamera.style.display = 'flex';
    imgAuthor.style.display = "none";
    imgAuthorPreview.src = "";

    imgAuthor.classList.remove(classImgAuthor);
    imgAuthorPreview.classList.remove(classImgAuthorPreview);

    uploadLink.style.display = 'flex';
    removeLink.style.display = 'none';
  }


  const removeForm = () => {
    titleArticlePreview.textContent = defaultTitle;
    titlePostCardPreview.textContent = defaultTitle;
    titleArticlePreview.classList.remove(classDarkTitle);
    titlePostCardPreview.classList.remove(classDarkTitle);
    subtitleArticlePreview.textContent = defaultSubtitle;
    subtitlePostCardPreview.textContent = defaultSubtitle;
    authorInPreview.textContent = defaultAuthorName;
  }

  authorPhoto.addEventListener('change', () => {
    menuAvatar.style.display = 'none';
    imgAvatar.src = URL.createObjectURL(authorPhoto.files[0]);
    imgAvatar.style.display = "block";

    imgCamera.style.display = 'none';
    imgAuthor.style.display = "block";
    imgAuthor.src = URL.createObjectURL(authorPhoto.files[0]);
    imgAuthor.classList.add(classImgAuthor);

    imgAuthorPreview.src = URL.createObjectURL(authorPhoto.files[0]);
    imgAuthorPreview.classList.add(classImgAuthorPreview);

    uploadLink.style.display = 'none';
    removeLink.style.display = 'flex';
  })

  removeButton.addEventListener('click', (e) => {
    e.preventDefault()
    removeAvatar()
  })


  const validate = () => {
    let success = true;
    if (regularName.test(inputAuthorName.value)) {
      return success
    } else {
      return success = false
    }
  }

  const sendData = async (data) => {
    const res = await fetch('/publish', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  buttonPublish.addEventListener('click', (event) => {
    event.preventDefault()

    let dataForm = {
      title: inputTitle.value,
      subtitle: inputSubtitle.value,
      author: inputAuthorName.value,
    }

    console.log('dataForm: ', dataForm);

    if (validate()) {
      sendData(dataForm)
        .then(data => {
          messagePublish.style.display = "flex";
          removeForm();
          formElements.forEach(input => {
            input.value = '';
          });
          removeAvatar();

          setTimeout(() => messagePublish.style.display = "none", 2500);
        })
        .catch(error => {
          messageAlert.style.display = "flex";

          setTimeout(() => messageAlert.style.display = "none", 2500);
        });
    } else {
      messageAlert.style.display = "flex";
      authorNoName.style.display = 'block';

      setTimeout(() => messageAlert.style.display = "none", 2500);
    }
  })
});