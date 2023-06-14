function js() {
    document.addEventListener('click', function (event) {
        let id = event.target.dataset.mobileMenu;
        if (!id) return;

        const mobileMenu = document.querySelector('.mobile-menu__nav-items');
        const mobileMenuVisibility = 'mobile-menu__nav-items-visibility';

        if (mobileMenu.classList.contains(mobileMenuVisibility)) {
            mobileMenu.classList.remove(mobileMenuVisibility);
          } else {
            mobileMenu.classList.add(mobileMenuVisibility);
          }
    })
}

window.onload = js