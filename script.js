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
        <button class="read-status-btn" value="${i}">Change Read Status</button>`;
    bookCard.className = 'book-card';
    bookCard.id = `book-${i}`;
    bookCard.insertAdjacentHTML('afterbegin', bookMarkup);
    bookshelf.appendChild(bookCard);
  });
  activateReadStatusBtns();
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
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    newBookOverlay.style.display = 'none';
  }
});

// window.addEventListener('click', (e) => {
//   if (e.target === newBookOverlay) {
//     newBookOverlay.style.display = 'none';
//   }
// });