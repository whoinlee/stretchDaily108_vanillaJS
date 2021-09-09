const open = document.getElementById('open');       //-- sign up
const close = document.getElementById('close');     //-- close button on the modal
const toggle = document.getElementById('toggle');   //-- nav sideBar open/close
//
const sidebar = document.getElementById('sidebar');
const modal = document.getElementById('modal');

//-- Show/Hide modal
open.addEventListener('click', () => modal.classList.add('show-modal'));    //-- sign up btn
close.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', e =>
  e.target == modal ? modal.classList.remove('show-modal') : false
); //-- hide modal on outside click

//-- Show/Hide nav
toggle.addEventListener('click', () => {
    document.body.classList.toggle('show-nav');
    document.body.addEventListener('click', toggleSidebar);
});

function toggleSidebar(e = null) {
    // console.log("toggleSideBar");
    if (
      document.body.classList.contains('show-nav') &&
      e.target !== toggle &&
      !toggle.contains(e.target) &&
      e.target !== navbar &&
      !navbar.contains(e.target)
    ) {
        console.log("toggleSideBar :: case1");
      document.body.classList.toggle('show-nav');
      document.body.removeEventListener('click', toggleSidebar);
    } 
    else if (!document.body.classList.contains('show-nav')) {
        console.log("toggleSideBar :: case2");
      document.body.removeEventListener('click', toggleSidebar);
    }
  }


