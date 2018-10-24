//Defining a Book class
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;

    }
}

//Defining a UI Class
class UI{
    addBookToList(book){
    const list =  document.getElementById('book-list');
   
   //create tr element
   const row = document.createElement('tr');

   //Append cols
    row.innerHTML =`
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href=# class="delete">X<a></td>
    `;

    list.appendChild(row);
    }

    showAlert(msg, className){
    //Create a div
    const div = document.createElement('div');
    //Add Classes
    div.className = `alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(msg));
    //Get parent
    const container = document.querySelector('.container');
    //Getting the form element
    const form = document.querySelector('#book-form');
    //Insert Alert
    container.insertBefore(div, form);
    //Timeout after three seconds
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);

    }

    //Deleting a book from the list, since the whole row contains 
    //information about the book, this is done by removing the whole row

    deleteBook(target){
        if (target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }

    }

    //A method to clear all user input fields and set the fields to blank and ready to accept another value 
    // after each addition of book
    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

}

//Local Storage Class ----- Local storage was given a class of its own with some static methods
class Store {
    static getBooks(){
        let books;
        if (localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI;
            //Add book to the UI since we've declared it before
            ui.addBookToList(book);

        });

    }
    static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));

    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach(function(book, index){
            if (book.isbn === isbn){
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//DOM Load Event

document.addEventListener('DOMContentLoaded', Store.displayBooks);






//Eventlisteners
document.getElementById('book-form').addEventListener('submit', function(e){
    //Getting form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    //Instantiating a book
    const book = new Book(title, author, isbn);

    //Instantiate the UI object
    const ui = new UI();

    //Validate 
    if(title === '' || author === '' || isbn === ''){
        //Error Alert
        ui.showAlert('Please fill in all fields', 'error');

    } else {
        //Add book to list ui
        ui.addBookToList(book);

        //ADD to local storage
        Store.addBook(book);

        //Show success
        ui.showAlert('Book successfully added!', 'success');

        //Clear the fields;
        ui.clearFields();
    }
        
    
    e.preventDefault();
});

//event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
    //instantiate the UI
    const deleteUi = new UI();

    //Delete book
    deleteUi.deleteBook(e.target);

    //Remove Book from local storage when the delete icon is clicked
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);


    e.preventDefault();
})