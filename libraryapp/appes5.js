//Book constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


//UI constructor
function UI(){}

//Add book to list
UI.prototype.addBookToList = function(book){
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

//Show alert
UI.prototype.showAlert= function(msg, className){
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

//Clear fields prototype
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
        

}

//delete a book
UI.prototype.deleteBook = function(target){
    if (target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }

}

function Store(){}

Store.prototype.getBooks = function(){
    let books;
    if (localStorage.getItem('books') === null){
        books = [];
    }else{
        books = JSON.parse(localStorage.getItem('books'));
    }
        return books;
    }

Store.prototype.displayBooks = function(){
    const books = new Store();
    const display = books.getBooks();

    display.forEach(function(book){
        const ui = new UI;
        //Add book to the UI since we've declared it before
        ui.addBookToList(book);
        });

    }

Store.prototype.addBooks = function(book){
    const books = new Store();
    const booker = books.getBooks();

    booker.push(book);

    localStorage.setItem('booker', JSON.stringify(booker));

    }

Store.prototype.removeBook = function(){
        const books =  new Store
        const booker = booker.getBooks();

        booker.forEach(function(book, index){
            if (book.isbn === isbn){
                booker.splice(index, 1);
            }
        });
        localStorage.setItem('booker', JSON.stringify(books));


    }



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
    } else{
        //Add book to list ui
        ui.addBookToList(book);
        //Show success
        ui.showAlert('Book successfully added', 'success');

        //Add to Local Storage
        bookadd = new Store();
        bookadd.addBooks(book);

        //Clear the fields;
        ui.clearFields();
    }
        
    
    e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', function(e){
    //instantiate the UI
    const deleteUi = new UI();

    //Delete book
    deleteUi.deleteBook(e.target);

    //Remove Book from local storage when the delete icon is clicked
     Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //show Message
    deleteUi.showAlert('Book removed', 'success');


    e.preventDefault();
})