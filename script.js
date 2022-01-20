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

function addToLibrary(...books) {
  for (let book of books) {
    myLibrary.push(book);
  }
};

// create and add sample books

const bookOne = new Book('The Hobbit', 'JRR Tolkien', 366, true);
const bookTwo = new Book('The Fellowship of the Ring', 'JRR Tolkien', 527, true);
const bookThree = new Book('The Two Towers', 'JRR Tolkien', 447, false);
const bookFour = new Book('The Return of the King', 'JRR Tolkien', 385, false);

addToLibrary(bookOne, bookTwo, bookThree, bookFour);

// draw library

const bookshelf = document.querySelector('.bookshelf');

function drawBooks() {
  myLibrary.forEach(book => {
    let bookCard = document.createElement('div');
    let bookMarkup = `
        <h3>${book.title}</h3>
        <p>${book.info()}</p>`;
    bookCard.classList.add('book-card');
    bookCard.insertAdjacentHTML('afterbegin', bookMarkup);
    bookshelf.appendChild(bookCard);
  });
}

drawBooks();

// 'add new book' button and form popup

const newBookBtn = document.querySelector('.new-book-btn');
const newBookOverlay = document.querySelector('.new-book-overlay');
const closeBtn = document.querySelector('.close-btn');

newBookBtn.addEventListener('click', () => {
  newBookOverlay.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  newBookOverlay.style.display = 'none';
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    newBookOverlay.style.display = 'none';
  }
});

window.addEventListener('click', (e) => {
  if (e.target === newBookOverlay) {
    newBookOverlay.style.display = 'none';
  }
});