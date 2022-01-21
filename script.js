// book object constructor

function Book(title, author, pages, read,) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read; // boolean
  this['date added'] = new Date();
}

Book.prototype.changeReadStatus = function () {
  this.read = !this.read;
}

// add a book (or array of books) to library

let myLibrary = [];

function addToLibrary(book) {
  myLibrary.unshift(book);
}

// sorting functions

function sortByDate(library) {
  return library.sort((a, b) => a['date added'] > b['date added'] ? -1 : 1);
}

function sortByTitle(library) {
  return library.sort((a, b) => a.title > b.title ? 1 : -1);
}

function sortByAuthor(library) {
  return library.sort((a, b) => a.author > b.author ? 1 : -1);
}

const dropdownForm = document.querySelector('#dropdown-form')
const sortDropdown = document.querySelector('#sort');
sortDropdown.addEventListener('change', (e) => {
  switch(e.target.value) {
    case 'date':
      sortByDate(myLibrary);
      break;
    case 'date-reverse':
      sortByDate(myLibrary).reverse();
      break;
    case 'author':
      sortByAuthor(myLibrary);
      break;
    case 'author-reverse':
      sortByAuthor(myLibrary).reverse();
      break;
    case 'title':
      sortByTitle(myLibrary);
      break;
    case 'title-reverse':
      sortByTitle(myLibrary).reverse();
      break;
  }
  redrawBooks();
});

// create bookshelf and add sample books

const bookshelf = document.querySelector('.bookshelf');

addToLibrary(new Book('The Hobbit', 'JRR Tolkien', 310, true, 'ass'));
addToLibrary(new Book('The Adventures of Huckleberry Finn', 'Mark Twain', 366, true));
addToLibrary(new Book('Nineteen Eighty-Four', 'George Orwell', 328, true));
addToLibrary(new Book('The Rise and Fall of the Third Reich', 'William L. Shirer', 1245, false));

myLibrary.forEach(book => {
  book['date added'] = new Date('2022-01-01');
});

redrawBooks();

// draw library

function redrawBooks() {
  // dropdownForm.reset();
  clearBookshelf();
  myLibrary.forEach((book, i) => {
    let bookCard = document.createElement('div');
    let read =
        book.read ?
        'You have read this book.' :
        'You have not read this book.';
    let bookMarkup = `
        <h3>${book.title}</h3>
        <p>By ${book.author}</p>
        <p>${book.pages} pages</p>
        <p id="read-status-${i}">${read}</p>
        <p>Date added: ${book['date added'].toDateString()}</p>
        <button class="read-status-btn" value="${i}">Change Read Status</button>
        <button class="delete-btn" value="${i}">Delete</button>`;
    bookCard.className = 'book-card';
    bookCard.id = `book-${i}`;
    bookCard.insertAdjacentHTML('afterbegin', bookMarkup);
    bookshelf.appendChild(bookCard);
  });
  activateReadStatusBtns();
  activateDeleteBtns();
}

// clear all books

function clearBookshelf() {
  const allCards = bookshelf.querySelectorAll('.book-card');
  allCards.forEach(card => {
    card.remove();
  });
}

// function to change book read status

function activateReadStatusBtns() {
  let readStatusBtns = bookshelf.querySelectorAll('.read-status-btn');
  readStatusBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      myLibrary[btn.value].changeReadStatus();
      let readText = document.querySelector(`p#read-status-${btn.value}`);
      readText.textContent =
          myLibrary[btn.value].read ?
          'You have read this book.' :
          'You have not read this book.';
    });
  });
}

// 'add new book' button and form popup

const newBookBtn = document.querySelector('.new-book-btn');
const newBookOverlay = document.querySelector('.new-book-overlay');
const closeBtn = document.querySelector('.close-btn');

newBookBtn.addEventListener('click', () => {
  newBookOverlay.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  newBookOverlay.style.display = 'none';
  clearForm();
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    newBookOverlay.style.display = 'none';
    clearForm();
  }
});

// submit new book

const titleField = document.querySelector('#title');
const authorField = document.querySelector('#author');
const pagesField = document.querySelector('#pages');
const readField = document.querySelector('#read');

const submitBtn =  document.querySelector('.submit-btn');

submitBtn.addEventListener('click', () => {

  let validationMessages = document.querySelectorAll('.validation-message');
  validationMessages.forEach(message => {
    message.remove();
  });

  let titleValue = title.value.trim();
  let authorValue = author.value.trim();
  let pagesValue = pages.value;
  let readChecked = read.checked;

  if (pagesValue === null || pagesValue === '') {
    submitBtn.insertAdjacentHTML('afterend',
        '<span class="validation-message">Please enter number of pages.</span>');
  }
  if (authorValue === null || authorValue === '') {
    submitBtn.insertAdjacentHTML('afterend',
        '<span class="validation-message">Please enter an author.</span>');
  }
  if (titleValue === null || titleValue === '') {
    submitBtn.insertAdjacentHTML('afterend',
        '<span class="validation-message">Please enter a title.</span>');
  }
  if (pagesValue !== null && pagesValue!== ''
      && authorValue !== null && authorValue !== ''
      && titleValue !== null && titleValue !== '') {
    let book = new Book(titleValue, authorValue, parseInt(pagesValue), readChecked);
    addToLibrary(book);
    redrawBooks();
    clearForm();
  }
});

function clearForm() {
  newBookOverlay.style.display = 'none';
    titleField.value = null;
    authorField.value = null;
    pagesField.value = 0;
    readField.checked = false;
}

// delete button

function activateDeleteBtns() {
  let deleteBtns = bookshelf.querySelectorAll('.delete-btn');
  deleteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      myLibrary.splice(btn.value, 1);
      redrawBooks();
    });
  });
}