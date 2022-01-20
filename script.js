// book object constructor

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read; // boolean
}

Book.prototype.info = function () {
  let read =
      this.read === true ?
      'This book has been read' :
      'This book has not been read';
  return `${this.title} by ${this.author}, ${this.pages} pages. ${read}.`
}

Book.prototype.changeReadStatus = function () {
  this.read = !this.read;
}

// addd a book (or array of books) to library

let myLibrary = [];

function addToLibrary(book) {
  myLibrary.unshift(book);
}

// create bookshelf and add sample books

const bookshelf = document.querySelector('.bookshelf');

addToLibrary(new Book('The Hobbit', 'JRR Tolkien', 366, true));
addToLibrary(new Book('The Fellowship of the Ring', 'JRR Tolkien', 527, true));
addToLibrary(new Book('The Two Towers', 'JRR Tolkien', 447, false));
addToLibrary(new Book('The Return of the King', 'JRR Tolkien', 385, false));

redrawBooks();

// draw library

function redrawBooks() {
  clearBookshelf();
  myLibrary.forEach((book, i) => {
    let bookCard = document.createElement('div');
    let bookMarkup = `
        <h3>${book.title}</h3>
        <p>${book.info()}</p>
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
      let cardText = document.querySelector(`#book-${btn.value} p`);
      cardText.textContent = myLibrary[btn.value].info();
    });
  });
};

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
};

// delete button

function activateDeleteBtns() {
  let deleteBtns = bookshelf.querySelectorAll('.delete-btn');
  deleteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      myLibrary.splice(btn.value, 1);
      console.log('deleting');
      redrawBooks();
    });
  });
};