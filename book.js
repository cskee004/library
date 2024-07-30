/**
 * Adds event listener to submut button in form
 */
const addButton = document.querySelector(".add-button");
addButton.addEventListener("click", addBookToLibrary, false);

//-------------------------------------------------------------------------->>
/**
 * @param {myLibrary} - An array of book objects
 * @param {bookID} - Used for identifying the correct book for status change and remove
 */
const myLibrary = [];
let bookID = 0;

//-------------------------------------------------------------------------->>
const book1 = new Book("The Hobbit", "J.R.R. Tolkein", 295, randomStatus(), 1);
const book2 = new Book("Animal Farm", "George Orwell", 140, randomStatus(), 2);
const book3 = new Book("Don Quixote", "Miguel De Cervantes Saavedra", 1072, randomStatus(), 3);
const book4 = new Book("The Adventures of Huckleberry Finn", "Mark Twain", 224, randomStatus(), 4);
const book5 = new Book("The Odyssey", "Homer", 541, false, 5);

const testArray = [book1, book2, book3, book4, book5];

function testLibrary() {

    testArray.forEach(element => {
        updateLibrary(element);
    });
}

function randomStatus() {
    let result = Math.random();
    if (result >= 0.5){
        return true;
    }
    else {
        return false;
    }
}
//--------------------------------------------------------------------------->>
/**
 * 
 * @param {title} - Title of book 
 * @param {author} - Author of book
 * @param {pages} - How many pages are in the book
 * @param {readStatus} - If the book has been completed or not
 */
function Book(title, author, pages, readStatus, ID) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.ID = ID;
    
    
    /**
     * 
     * @returns information about the book 
     */
    this.info = function() {
        if (readStatus == "No") {
            return "The " + title +" by " + author + ", " + pages + ", not read yet.";
        }
        else {
            return "The " + title +" by " + author + ", " + pages + ", has been read.";
        }
    }
}
//--------------------------------------------------------------------------->>
/**
 * A function to add book to array
 * @param {event} - Represents the click of the submit button on book form
 */
function addBookToLibrary(event) {
    event.preventDefault();
    
    title = document.querySelector("#book-title").value;
    author = document.querySelector("#book-author").value;
    pages = document.querySelector("#book-pages").value;
    
    readStatus = document.getElementById("option-1").checked;
    if(readStatus == true) {
        bookID++;
        const bookToAdd = new Book(title, author, pages, true, bookID);
        myLibrary.push(bookToAdd);
        updateLibrary(bookToAdd);
    }
    else {
        bookID++;
        const bookToAdd = new Book(title, author, pages, false, bookID);
        myLibrary.push(bookToAdd);
        updateLibrary(bookToAdd);
    }
}
//--------------------------------------------------------------------------->>
/**
 * A function to remove book from array and table
 * @param {event} -  
 */
function removeBook(event) {
    
    let bookIdButton = event.currentTarget.parentElement.getAttribute("data");
    let bookIdParent = event.currentTarget.parentElement;
    let bookTable = document.querySelector('.book-table');

    for(let i = 0; i < myLibrary.length; i++) {
        let currentBookID = myLibrary[i].ID
        if (currentBookID == bookIdButton) {
            myLibrary.splice(i, 1);
        }
    }
    
    bookTable.removeChild(bookIdParent);
    
}
//--------------------------------------------------------------------------->>
/**
 * A function to toggle the read status of book object and to update table
 * @param {event} - 
 */
function statusChange(event) {
    
    let bookStatus = event.currentTarget.parentElement.getAttribute("data");
    for(let i = 0; i < myLibrary.length; i++) {
        let searchItem = myLibrary[i].ID
        if (searchItem == bookStatus) {
            if (myLibrary[i].readStatus == true) {
                myLibrary[i].readStatus = false;
                event.target.innerHTML = "false"
            }
            else {
                myLibrary[i].readStatus = true;
                event.target.innerHTML = "true"
            }
        }
    }
    console.table(myLibrary)
}
//--------------------------------------------------------------------------->>
/**
 * Adds book to table
 * @param {bookToAdd} - Represents a book object 
 */
function updateLibrary(bookToAdd) {

    read = document.getElementsByName("read-type");
    let table = document.querySelector(".book-table");
    let newRow = document.createElement("tr");
    newRow.setAttribute('class', "book-row")
    newRow.setAttribute('data', bookToAdd.ID);

    let addTitle = document.createElement("td");
    let addAuthor = document.createElement("td");
    let addPages = document.createElement("td");
    let status = document.createElement("td");
    let remove = document.createElement("td");
    let statusButton = document.createElement("button");
    let removeButton = document.createElement("button");

    status.setAttribute('id', "status-container");
    remove.setAttribute('id', "remove-container");
    
    statusButton.setAttribute('id', "status-button");
    removeButton.setAttribute('id', "remove-button");

    status.addEventListener("click", statusChange, false);
    remove.addEventListener("click", removeBook, false);

    addTitle.innerHTML = bookToAdd.title;
    addAuthor.innerHTML = bookToAdd.author;
    addPages.innerHTML = bookToAdd.pages;
    statusButton.innerHTML = bookToAdd.readStatus;
    removeButton.innerHTML = "Remove"
    
    newRow.append(addTitle);
    newRow.append(addAuthor);
    newRow.append(addPages);
    newRow.append(status);
    status.append(statusButton);
    newRow.append(remove);
    remove.append(removeButton);
    table.append(newRow);
}
//--------------------------------------------------------------------------->>


