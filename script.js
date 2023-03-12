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
function displayLibrary() {
    const bookListDiv = document.querySelector('#book-list');
    bookListDiv.textContent = '';
    library.forEach((book, index) => {
        // create card div
        const newCardDiv = document.createElement('div');
        newCardDiv.classList.add('card');

        // add title to div
        const cardTitle = document.createElement('p');
        cardTitle.classList.add('card-title', 'book-info');
        cardTitle.innerText = book.title;
        newCardDiv.append(cardTitle);

        // add author to div
        const cardAuthor = document.createElement('p');
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
        console.log(cardReadStatusSelector.data);
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
    setUpCardDeleteButtons();
    setUpReadStatusSelectors();
}

/* adds event listeners to read status selectors; updates read status when changed */
function setUpReadStatusSelectors() {
    const readStatusSelectors = document.querySelectorAll(".read-status-selector");
    readStatusSelectors.forEach((selector) => {
        selector.addEventListener("change", () => {
            library[selector.data].readStatus = selector.value;
            displayLibrary();
        })
    })
}

/* add event listeners to all delete card buttons;
    removes book from library and updates book list on page */
function setUpCardDeleteButtons() {
    const cardDeleteBtns = document.querySelectorAll('.card-delete-btn');
    console.log(cardDeleteBtns);
    cardDeleteBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            library.splice(btn.data, 1);
            displayLibrary();
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

/* testing */
addBook("weapons of math destruction", "cathy o'neil", 274, "read");
addBook("picture of dorian gray", "oscar wilde", 288, "reading");
addBook("fake book", "fake author", 560, "not read");
const boosh = new Book("boosh", "noel fielding", 420, "read");
//deleteBook(boosh);
displayLibrary();