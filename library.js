// initialise the library

let library = [];

// constructor function creates a book object

function Book(id, title, author, noOfPages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.noOfPages = noOfPages;
    this.read = read;
}

// add functions to the book object prototype

Book.prototype.info = function () {
        if (this.read==='read'){
        return `${this.title} by ${this.author}. ${this.noOfPages} pages. Already read it.`;
    } else {return `${this.title} by ${this.author}. ${this.noOfPages} pages. Not read yet.`;
};
}

Book.prototype.toggleRead = function () {
    if (this.read === 'read') {
        this.read = 'unread'
        return true
    } else if (this.read === 'unread') {
        this.read = 'read'
        return false
    };
}

// takes input to create the Book object & add to library)
// run the function several times in order to populate the page

function addBookToLibrary(userInput) {
    let lastBookId = 0
    if (library.length > 0){
    const lastBook = library.slice(-1)[0]
    lastBookId = lastBook.id}
    const newBook = new Book(lastBookId+1, userInput[0], userInput[1], userInput[2], userInput[3])

    library.push(newBook);
    return library;
}



addBookToLibrary(['The Hobbit', 'J.R.R. Tolkien', 295, 'read']);
addBookToLibrary(['The Lord Of The Rings', 'J.R.R. Tolkien', 1178, 'read']);
addBookToLibrary(['The Beach', 'Alex Garland', 439, 'read']);
addBookToLibrary(['Fight Club', 'Chuck Palahnuik', 208, 'read']);
addBookToLibrary(['The Eye Of The World', 'Robert Jordan', 782, 'read']);
addBookToLibrary(['The Colour of Magic', 'Terry Pratchett', 278, 'read']);
addBookToLibrary(['New Spring', 'Robert Jordan', 304, 'unread']);
addBookToLibrary(['Mistborn: The Final Empire',  'Brandon Sanderson', 541, 'read']);

//
// iterate through the library and add the book objects as cards to the DOM
//

const loopEach = function (library) {
    const onPageLibrary = document.querySelector('.library');
    onPageLibrary.innerHTML = '';    
    const books = library.map(book => updatePage(book))
    
};

  



function updatePage(book) {
    
    const onPageLibrary = document.querySelector('.library');
    
    

    let readStatus = book.read === 'read' ? "Already read it." : "Not yet read.";

    onPageLibrary.innerHTML += `<div data-card-id=${book.id}   class="card">
        <div class="card-face">
        <div class="card-title">${book.title} <img src="book-open.svg" alt="" data-id=${book.id} class="read-icon"></div>
        <div class="card-body">by ${book.author}. ${book.noOfPages} pages. ${readStatus}</div>
        <div class="card-footer"><img src="trash-2.svg" alt="" data-id=${book.id} class="del-icon"></div>
        </div>
        </div>`

    addSelectorsToButtons()

}

function updateCard (book) {
    const bookCard = document.querySelector(`[data-card-id="${book.id}"]`)
    
    let readStatus = book.read === 'read' ? "Already read it." : "Not yet read.";

    bookCard.innerHTML = `<div class="card-face">
        <div class="card-title">${book.title} <img src="book-open.svg" alt="" data-id=${book.id} class="read-icon"></div>
        <div class="card-body">by ${book.author}. ${book.noOfPages} pages. ${readStatus}</div>
        <div class="card-footer"><img src="trash-2.svg" alt="" data-id=${book.id} class="del-icon"></div>
        </div>`

    addSelectorsToButtons()
}

//
// actually run the code to populate the webpage with book cards
//

loopEach(library);

////////////////////////////////////////////////////
//
// the webpage manipulations begin.
//
///////////////////////////////////////////////////

// select the three button types on page
// add listeners to the buttons


function addSelectorsToButtons() {
    const readButtons = document.querySelectorAll('.read-icon');
    const delButtons = document.querySelectorAll('.del-icon');
    const newBookBtn = document.querySelector('#addBook');
    const submitButton = document.querySelector('.submit-book');
    
    readButtons.forEach(button => button.addEventListener('click', readBook));
    
    delButtons.forEach(button => button.addEventListener('click', deleteBook));
    
    newBookBtn.addEventListener('click', addNewBookOpenModal);

    submitButton.addEventListener('click', addNewBook);
}







// listener functions

function readBook(e) {
    const book = library.filter(book => book.id == this.dataset.id)

    let bookCard = document.querySelector(`[data-card-id="${this.dataset.id}"]`)

    
    book[0].toggleRead()
    
    updateCard(book[0])
    
    
}

function deleteBook(e) {
    const bookId = this.dataset.id;
    
    library =  library.filter(book => book.id != bookId)
    
    loopEach(library)
    
}

function addNewBookOpenModal(e) {
    const isVisible = "is-visible";

    
    const modalId = this.dataset.open;
    const modal = document.getElementById(modalId)
    
    modal.classList.add(isVisible);
    
    modal.addEventListener('click', function(e) {
        if (e.target == modal)
        modal.classList.remove(isVisible)
    });

    
}

function addNewBook(e) {
    
    const bookTitle = document.getElementById('bookTitle').value;
    const bookAuthor = document.getElementById('bookAuthor').value;
    const bookPages = document.getElementById('bookPages').value;
    const readCheckbox = document.getElementById('readOrNot').checked;

    let readOrNot = 'unread'

    if (readCheckbox) {
        readOrNot = 'read'
    }
    if (bookTitle && bookAuthor && bookPages) {
    addBookToLibrary([bookTitle, bookAuthor, bookPages, readOrNot])
    loopEach(library)
    }

    const modal = document.getElementById('add-book-modal')
    modal.classList.remove('is-visible')
    
    

}
