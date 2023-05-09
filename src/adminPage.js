const form = document.querySelector('form');
const inputTitle = form.querySelector('[name="title"]');
const inputSubtitle = form.querySelector('[name="subtitle"]');
const inputAuthorName = form.querySelector('[name="author name"]');
const authorNoName = form.querySelector('.form-data__author-required');
const authorPhoto = form.querySelector('#author_photo');
const imgAuthor = form.querySelector('#img-author');
const imgAuthorPreview = form.querySelector('#img-author-preview');
const uploadLink = form.querySelectorAll('.form-data__upload-link');
const uploadLinkNew = form.querySelectorAll('.form-data__new-remove-block');



const titleArticlePreview = form.querySelector('.article-preview__title');
const titlePostCardPreview = form.querySelector('.post-info__preview-title');

const subtitleArticlePreview = form.querySelector('.article-preview__subtitle');
const subtitlePostCardPreview = form.querySelector('.post-info__preview-subtitle');

const authorInPreview = form.querySelector('.author-preview__author-name');

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

authorPhoto.addEventListener('change', () => {
  imgAuthor.src = URL.createObjectURL(authorPhoto.files[0]);
  imgAuthor.style.display = "block";
  imgAuthor.classList.add(classImgAuthor);
  uploadLink.style.display = 'none';
  uploadLinkNew.style.display = 'block';

  imgAuthorPreview.src = URL.createObjectURL(authorPhoto.files[0]);
  imgAuthorPreview.classList.add(classImgAuthorPreview);
})