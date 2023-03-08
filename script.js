function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    // methods
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read}`;
    }
}

const boosh = new Book("boosh", "noel fielding", 420, "read");
Book.prototype.iprint = function() {
    console.log(this.info())
};
boosh.print = () => console.log(boosh.info());
const dorian = new Book("dorian", "oscar wilde", 190, "read")
boosh.print();
boosh.iprint();
//dorian.print();
dorian.iprint();