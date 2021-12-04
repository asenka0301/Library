const newBookBtn = document.querySelector('.add_new_book');
const modal = document.querySelector('.popup');
const popUpContent = document.querySelector('.popup_content');
const bookForm = document.querySelector('.book_form');
const libraryContent = document.querySelector('.book_container');

let mylibrary = [];

const booksInLS = JSON.parse(localStorage.getItem('books'));
if (booksInLS) {
    booksInLS.forEach(book => addToArray(book));
}

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function toggleBookStatus(book) {
    if (book.isRead) {
        book.isRead = false;
    } else {
        book.isRead = true;
    }
}

function getBookStatus(book) {
    if (book.isRead === true) {
        return "Read";
    } else {
        return "Not Read";
    }
}

function openModal() {
    modal.classList.add('active');
}
function closeModal() {
    modal.classList.remove('active');
}
function closeForm(event){
    if(event.target == popUpContent){
        closeModal();
    }
}
function getBookInfo(){
    const bookTitle = document.getElementById('title').value;
    const bookAuthor = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const bookStatus = document.getElementById('book_status').checked;
    return new Book(bookTitle, bookAuthor, pages, bookStatus);
}

function addBookToLibrary (event){
    const NewBook = getBookInfo();
    closeModal();
    event.preventDefault();
    addToArray(NewBook);
    updateLS();
}


newBookBtn.addEventListener('click', openModal);
window.addEventListener('click', closeForm);
bookForm.addEventListener('submit', addBookToLibrary);


function displayTheBook(book) {
        let bookCard = document.createElement("div");
        bookCard.classList.add('book_info');
        bookCard.setAttribute('data-id', `${book.title}`);
        bookCard.innerHTML = `
                <h3>"${book.title}"</h3>
                <h3>${book.author}</h3>
                <h3>${book.pages} pages</h3>
                <button class="read" id="bookStatus">${getBookStatus(book)}</button>
                <button class="remove" id="deleteBtn">Remove</button>
        `;
        const removeBtn = bookCard.querySelector('#deleteBtn');
        removeBtn.addEventListener("click", function(){
            bookCard.remove();
            let bookTitle = bookCard.getAttribute('data-id');
            let bookIndex = null;
            for(let i = 0; i < mylibrary.length; i++){
                if(mylibrary[i].title === bookTitle){
                    bookIndex = i;
                    break;
                }
            }
            mylibrary.splice(bookIndex, 1);
            updateLS();
        });

        const bookStatusBtn = bookCard.querySelector('#bookStatus');
        bookStatusBtn.addEventListener('click', function(){
            // изменить статус экземпляра книги
            // изменить статус на карточке книги
            let bookTitle = bookCard.getAttribute('data-id');
            let bookIndex = null;
            for(let i = 0; i < mylibrary.length; i++){
                if(mylibrary[i].title === bookTitle){
                    bookIndex = i;
                    break;
                }
            }
            let currentBook = mylibrary[bookIndex];
            toggleBookStatus(currentBook);
            bookStatusBtn.textContent = getBookStatus(currentBook);
            updateLS();
        });

        libraryContent.appendChild(bookCard);
    
       
        
}


function addToArray(newBook){
    for (let i = 0; i < mylibrary.length; ++i) {
        if(mylibrary[i].title === newBook.title){
            return;
        }
    }
    mylibrary.push(newBook);
    displayTheBook(newBook);
}
    


function updateLS() {
    localStorage.setItem('books', JSON.stringify(mylibrary));
}
