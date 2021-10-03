const bookBtn = document.querySelector('.add_new_book');
const modal = document.querySelector('.popup');
const popUpContent = document.querySelector('.popup_content');


function openForm(){
    modal.classList.add('active');
}


function closeForm(event){
    console.log(event.target);
    if(event.target == popUpContent){
        modal.classList.remove('active');
    }
}

bookBtn.addEventListener('click', openForm);
window.addEventListener('click', closeForm);~