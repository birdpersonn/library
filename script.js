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
        cardDeleteBtn.innerText = 'X';
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
            console.log(library);
        })
    })
}

/* add event listeners to all delete card buttons;
    removes book from library and updates book list on page */
    function setUpCardDeleteButtons() {
        const cardDeleteBtns = document.querySelectorAll('.card-delete-btn');
        console.log(cardDeleteBtns);
        cardDeleteBtns.forEach((btn) => {
            console.log("hi")
            btn.addEventListener("click", () => {
                library.splice(btn.data, 1);
                displayLibrary();
            })
        })
    }

/* testing */
addBook("boosh", "noel fielding", 420, "read");
addBook("picture of dorian gray", "oscar wilde", 288, "reading");
addBook("fake book", "fake author", 56, "not read");
const boosh = new Book("boosh", "noel fielding", 420, "read");
//deleteBook(boosh);
displayLibrary();