const open = document.getElementById('open');       //-- sign up
const close = document.getElementById('close');     //-- close button on the modal
const toggle = document.getElementById('toggle');   //-- nav sideBar open/close
//
const navbar = document.getElementById('navbar');
const modal = document.getElementById('modal');

//-- Show/Hide modal
open.addEventListener('click', () => modal.classList.add('show-modal'));
close.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', e =>
  e.target == modal ? modal.classList.remove('show-modal') : false
); //-- hide modal on outside click

//-- Show/Hide nav
toggle.addEventListener('click', () => {
    document.body.classList.toggle('show-nav');
    document.body.addEventListener('click', closeNavbar);
});


