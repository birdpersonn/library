var library = [];

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;

    // methods
    /* returns book info in readable string expression */
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${readStatus}`;
    }

    /* returns index of book that matches all given properties;
    returns -1 if book is not in array */

    /* checks if bo */
    function equals() {
    if(this.title === book.title && this.author === book.author && this.pages === book.pages && this.readStatus === book.readStatus) {
        return true;
    }
    return false;
}
}


/* creates new card for each book and prints to page */
function displayLibrary() {
    const bookListDiv = document.querySelector('#book-list');
    library.forEach((book) => {
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

        // add read status to div
        const cardReadStatus = document.createElement('p');
        cardReadStatus.classList.add("card-read-status", "book-info");
        cardReadStatus.innerText = book.readStatus;
        newCardDiv.append(cardReadStatus);

        // add delete button to div
        const cardDeleteBtn = document.createElement('button');
        cardDeleteBtn.classList.add("card-delete-btn", "book-info");
        cardDeleteBtn.innerText = 'X';
        newCardDiv.append(cardDeleteBtn);

        bookListDiv.append(newCardDiv);
    })
}

/* adds new book to library array */
function addBook(title, author, pages, readStatus) {
    library.push(new Book(title, author, pages, readStatus))
}

/* deletes book from library array */
function deleteBook(){

}

addBook("boosh", "noel fielding", 420, "read");
addBook("dorian", "oscar wilde", 190, "not read")
displayLibrary();
console.log()
