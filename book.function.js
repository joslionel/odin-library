function Book(title, author, noOfPages, read) {
    this.title = title;
    this.author = author;
    this.noOfPages = noOfPages;
    this.read = read;

    this.info = function () {
        if (this.read==='read'){
        return `${title} by ${author}. ${noOfPages} pages. Already read it.`;
    } else {return `${title} by ${author}. ${noOfPages} pages. Not read yet.`;
}
    }
}

const theHobbit = new Book("the hobbit", "jrr tolkier", 295, "not read");

console.log(theHobbit.info())