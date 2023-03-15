var library = [];

function Book(title, author, pages, readStatus) {
    // PROPERTIES
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;

    // METHODS
    /* returns book info in readable string expression */
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${readStatus}`;
    }

    /* checks if book's properties equals a given book's properties */
    this.equals = function(otherBook) {
        if(this.title === otherBook.title && this.author === otherBook.author && this.pages === otherBook.pages && this.readStatus === otherBook.readStatus) {
            return true;
        }
        return false;
    }

    /* checks if the title contains a given string (case-insensitive) */
    this.titleContains = function(query) {
        return this.title.toLowerCase().includes(query.toLowerCase());
    }

    /* checks if the title contains a given string (case-insensitive) */
    this.authorContains = function(query) {
        return this.author.toLowerCase().includes(query.toLowerCase());
    }

    /* checks if either the title or author contains a given string (case-insensitive)*/
    this.contains = function(query) {
        if( this.titleContains(query) || this.authorContains(query)) {
            return true;
        }
        return false;
    }
}

/* adds new book to library array */
function addBook(title, author, pages, readStatus) {
    library.push(new Book(title, author, pages, readStatus))
}

/* find matching book in library array and deletes it */
function deleteBook(bookToDelete) {
    library = library.filter(book => !book.equals(bookToDelete))
}

/* creates new card for each book and prints to page */
function displayLibrary(library) {
    const bookListDiv = document.querySelector('#book-list');
    bookListDiv.textContent = '';
    if(library.length > 0) {
        library.forEach((book, index) => {
            // create card div
            const newCardDiv = document.createElement('div');
            newCardDiv.classList.add('card');
    
            // add title to div
            const cardTitle = document.createElement('p');
            cardTitle.classList.add('card-title', 'book-info');
            cardTitle.innerText = book.title;
            newCardDiv.append(cardTitle);
    
            // add author button to div
            const cardAuthor = document.createElement('button');
            cardAuthor.classList.add("card-author", "book-info");
            cardAuthor.innerText = book.author;
            newCardDiv.append(cardAuthor);
    
            // add pages to div
            const cardPages = document.createElement('p');
            cardPages.classList.add("card-pages", "book-info");
            cardPages.innerText = book.pages;
            newCardDiv.append(cardPages);
    
            // add read status selector to div
            const cardReadStatusDiv = document.createElement('div');
            cardReadStatusDiv.classList.add("card-read-status", "book-info");
            const cardReadStatusSelector = document.createElement('select');
            cardReadStatusSelector.data = index;
            cardReadStatusSelector.classList.add("read-status-selector");
            cardReadStatusSelector.name = "read-status";
            const optionRead = document.createElement('option');
            optionRead.value = "read";
            optionRead.innerText = "read";
            cardReadStatusSelector.append(optionRead);
            const optionReading = document.createElement('option');
            optionReading.value = "reading";
            optionReading.innerText = "reading";
            cardReadStatusSelector.append(optionReading);
            const optionNotRead = document.createElement('option');
            optionNotRead.value = "not read";
            optionNotRead.innerText = "not read";
            cardReadStatusSelector.append(optionNotRead);
            cardReadStatusSelector.value = book.readStatus;
    
            cardReadStatusDiv.append(cardReadStatusSelector);
            newCardDiv.append(cardReadStatusDiv);
    
            // add delete button to div
            const cardDeleteBtn = document.createElement('button');
            cardDeleteBtn.classList.add("card-delete-btn", "book-info");
            cardDeleteBtn.data = index;
            cardDeleteBtn.innerText = 'x';
            newCardDiv.append(cardDeleteBtn);
    
            // add card to book list div
            bookListDiv.append(newCardDiv);
        })
        setUpAuthorLinks();
        setUpCardDeleteButtons();
        setUpReadStatusSelectors();
    } else {
        // empty library
        // add empty library image
        const emptyLibraryImg = document.createElement('img');
        emptyLibraryImg.classList.add('empty-library-img');
        emptyLibraryImg.src = "./assets/empty-library.svg";

        // add empty library header
        const emptyLibraryHeader = document.createElement('h3');
        emptyLibraryHeader.classList.add('empty-library-header');
        emptyLibraryHeader.textContent = 'your library is empty, try adding a book!';
        
        bookListDiv.append(emptyLibraryImg);
        bookListDiv.append(emptyLibraryHeader);
    }
    
}

/* add event listeners to read status selectors; updates read status when changed */
function setUpReadStatusSelectors() {
    const readStatusSelectors = document.querySelectorAll(".read-status-selector");
    readStatusSelectors.forEach((selector) => {
        selector.addEventListener("change", () => {
            library[selector.data].readStatus = selector.value;
            displayLibrary(library);
        })
    })
}

/* add event listener to search bar; updates list with each change*/
const searchQuery = document.querySelector("#search-query");
searchQuery.addEventListener("input", () => {
    const query = searchQuery.value;
    var tempLibrary = library.filter((book) => book.contains(query))
    displayLibrary(tempLibrary);
})

/* add event listeners to all author links;
    filters library for books by selected author */
function setUpAuthorLinks() {
    const authorLinks = document.querySelectorAll('.card-author');
    authorLinks.forEach((link) => {
        link.addEventListener("click", () => {
            const tempLibrary = library.filter((book) => book.author === link.textContent);
            displayLibrary(tempLibrary);
        })
    })
}

/* add event listeners to all delete card buttons;
    removes book from library and updates book list on page */
function setUpCardDeleteButtons() {
    const cardDeleteBtns = document.querySelectorAll('.card-delete-btn');
    cardDeleteBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            library.splice(btn.data, 1);
            displayLibrary(library);
        })
    })
}

/* add event listener to add book button */
const addBookBtn = document.querySelector('#add-book-btn');
addBookBtn.addEventListener("click", () => {
    const addBookModal = document.querySelector("#add-book-modal");
    addBookModal.classList.add('active');
})

/* add event listener to close modal button */
const closeModalBtn = document.querySelector("#modal-close-btn");
closeModalBtn.addEventListener("click", () => {
    const addBookModal = document.querySelector("#add-book-modal");
    addBookModal.classList.remove("active");
    clearInputs();
})

/* clear inputs in add book form */
function clearInputs() {
    document.querySelector("#form-title").value = '';
    document.querySelector('#form-author').value = '';
    document.querySelector('#form-pages').value = '';
}

/* add event listener to form submit button;
    creates new book with given inputs */
const addBookForm = document.querySelector('#add-book-form');
addBookForm.addEventListener("submit", (e) => {
    const addBookModal = document.querySelector("#add-book-modal");
    const title = document.querySelector('#form-title').value;
    const author = document.querySelector('#form-author').value;
    const pages = document.querySelector('#form-pages').value;
    const readStatus = document.querySelector('#form-read-status').value;
    e.preventDefault();

    /* add book to library */
    addBook(title, author, pages, readStatus);

    addBookModal.classList.remove("active");
    clearInputs();
    displayLibrary(library);
})

/* testing */
addBook("weapons of math destruction", "cathy o'neil", 274, "read");
addBook("picture of dorian gray", "oscar wilde", 288, "reading");
addBook("fake book", "fake author", 560, "not read");
addBook('importance of being earnest', 'oscar wilde', 58, 'read');
addBook('the postmortal', 'drew magary', 402, 'not read');
addBook('twilight', 'stephenie meyer', 498, 'read');
displayLibrary(library);