"use strict"

async function createPost() {
  const form = document.querySelector('form');
  const inputTitle = form.querySelector('[name="title"]');
  const inputSubtitle = form.querySelector('[name="subtitle"]');
  const inputAuthorName = form.querySelector('[name="author name"]');

  console.log(form)
  console.log(inputTitle)
  console.log(inputSubtitle)
  console.log(inputAuthorName)


  const response = await fetch('post', {
    method: 'POST',
    body: JSON.stringify({
      title: inputTitle.value,
      subtitle: inputSubtitle.value,
      author: inputAuthorName.value,
      image_url: '/static/img/trostnik_trava.jpg'
    }),
  })

  console.log(response)
}
