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

  const authorPhotoElems = form.querySelector('.form-data__author-photo');
  const imgCamera = authorPhotoElems.querySelector('.form-data__img-camera')
  const authorPhoto = authorPhotoElems.querySelector('#author_photo');
  const imgAuthor = authorPhotoElems.querySelector('#img-author');
  const uploadLink = authorPhotoElems.querySelector('.form-data__upload-link');
  const removeLink = authorPhotoElems.querySelector('.form-data__new-remove-block');
  const removeButton = removeLink.querySelector('button');

  const bigImgElems = form.querySelector('.form-data__big-img');
  const inputBigImg = bigImgElems.querySelector('#input-bigImg');
  const bigImgCamera = bigImgElems.querySelector('[alt="camera"]');
  const bigImgUploadLink = bigImgElems.querySelector('.form-data__upload-link');
  const bigImg = bigImgElems.querySelector('#big-img');
  const provisionSizeBigImg = form.querySelector('.form-data__provision-size-big-img');
  const removeBigImg = form.querySelector('.form-data__big-img-remove-block');

  const smallImgElems = form.querySelector('.form-data__small-img');
  const inputSmallImg = smallImgElems.querySelector('#small-img');
  const smallImg = bigImgElems.querySelector('img');



  const imgAuthorPreview = form.querySelector('#img-author-preview');
  const bigImgPreview = form.querySelector('.article-preview__img-post');
  const imgPreview = form.querySelector('.article-preview__img');
  const imgPostPreview = form.querySelector('.img-post__img');

  // const defaultAvatar = titleArticlePreview.textContent;
  const classDarkSubtitle = 'article-preview__subtitle-color-dark';
  const classImgAuthor = 'form-data__img-author';
  const classImgAuthorPreview = 'author-preview__img-author';

  const regularName = /^[а-яА-ЯЁёA-Za-z]+$/;




  const authorInPreview = form.querySelector('.author-preview__author-name');
  const maxLengthAuthorName = 30;
  const defaultAuthorName = authorInPreview.textContent;
  const authorNoName = form.querySelector('.form-data__author-required');




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
      if (inputTitle.value == "") {
        titleNoName.style.display = 'block';
      };
      if (inputSubtitle.value == "") {
        subtitleNoName.style.display = 'block';
      };
      if (inputAuthorName.value == "") {
        authorNoName.style.display = 'block';
      }

      setTimeout(() => messageAlert.style.display = "none", 2500);
    }
  })
});