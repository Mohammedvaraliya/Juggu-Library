console.log('This is ES6 version of project 2');

const uid = function () {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  };

class Book {

    constructor(name, author, type) {
        this.id = uid();
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display {
    add(book) {
        console.log('Adding to UI');
        let tableBody = document.getElementById('tableBody')
        let uiString = `<tr class="tableBody" id="tableBody">
                            <td id="search">${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.type}</td>
                            <td><input type="button" value="Delete Row" class="btn btn-outline-danger" onclick="RemoveRow()"></td>
                        </tr>`;
        tableBody.innerHTML += uiString;

        // save the data to the browser's local storage -----
        const books = JSON.parse(localStorage.getItem("books"));
        // console.log(books);
        if (!books.some((oldBook) => oldBook.id === book.id)) books.push(book);
        localStorage.setItem("books", JSON.stringify(books));

    }
    

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        }
        else {
            return true;
        }
    }

    show (type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if (type === 'success'){
            boldText = 'Success';
        }
        else{
            boldText = 'Error!';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>`
    
        setTimeout(function () {
            message.innerHTML = '';
        }, 5000);
    
    }
}

function handleDelete(event) {
    event.stopPropagation(); // Stops the event from propogating
    const key = this.getAttribute("data-key");
  
    const notes = JSON.parse(localStorage.getItem("books"));
  
    const newBooks = [];
    books.forEach((element) => {
      if (element.date === key) {
        return;
      }
      return newBooks.push(element);
    });
  
    localStorage.setItem("books", JSON.stringify([]));
    showBooks();
  }

// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('You have submitted library form')
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    console.log(book);

    let display = new Display();
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show('success', 'Your book has been successfully added')
    }
    else {
        // show error to the user
        display.show('danger', 'Sorry you cannot add this book.')
    }

    e.preventDefault();
}

(() => {
    const display = new Display();
    let books = localStorage.getItem("books");
    if (books) {
      books = JSON.parse(books);
      books.forEach((book) => display.add(book));
    }
    else
        localStorage.setItem("books", JSON.stringify([])); 
})();

function RemoveRow(id) {
    // event.target will be the input element.
    let td1 = event.target.parentNode; 
    let tr1 = td1.parentNode; 
    tr1.parentNode.removeChild(tr1);// the row to be removed
    const newBooks= books.filter(book=> book.id !== td1.id)
    localStorage.setItem("books", JSON.stringify(newBooks));
}
