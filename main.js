const bookname = document.querySelector('#book-name');
const bookauthor = document.querySelector('#book-author');
const bookpages = document.querySelector('#book-pages');
const bookread = document.querySelector('#book-read');
const submitButton = document.querySelector('.addButton');
const main = document.querySelector('main');
const modalButton = document.querySelector('.open-modal-form');
const modal = document.querySelector('#dialog');
const closeButton = document.querySelector('.close-button');
const BooksAvailable = document.querySelector('h2');

let myLibrary = [
    {
        title: "The Forgotten Chronicles",
        author: "Emily Parker",
        pages: 248,
        read: 'true'
    },
    {
        title: "Echoes of Eternity",
        author: "James Mitchell",
        pages: 475,
        read: 'false'
    },
    {
        title: "Whispers in the Moonlight",
        author: "Sarah Montgomery",
        pages: 312,
        read: 'true'
    }
    ];

class Book {
    constructor(title, author, pages, read) {
        this.title = title,
        this.author = author,
        this.pages = pages,
        this.read = read;
    }
};

function addBooktoLibrary() {

    if(bookauthor.value === '' || bookname.value === '' || bookpages.value === '') return;

    let newBook =  new Book(
        bookname.value,
        bookauthor.value,
        bookpages.value,
        bookread.value
    );
    
    bookname.value = bookauthor.value = bookpages.value = '';

    myLibrary.push(newBook);
    
    main.appendChild(createCard(newBook));
    indexUpdate();
    modal.close();
}

function createCard(object) {
    const div = document.createElement('div');
    const title = document.createElement('p');
    const pname = document.createElement('p');
    div.appendChild(title);
    div.appendChild(pname);
    const title2 = document.createElement('p');
    const pautor = document.createElement('p');
    div.appendChild(title2);
    div.appendChild(pautor);
    const title3 = document.createElement('p');
    const ppages = document.createElement('p');
    div.appendChild(title3);
    div.appendChild(ppages);
    const pread = document.createElement('p');
    div.appendChild(pread);
    const removeButton = document.createElement('button');
    div.appendChild(removeButton);

    title.classList.add('title');
    title2.classList.add('title');
    title3.classList.add('title');
    div.classList.add('card');

    title.textContent = "Book title:"
    title2.textContent = "Book author:"
    title3.textContent = "Book Length:"
    pname.textContent = object.title;
    pautor.textContent = object.author;
    ppages.textContent = object.pages + " pages";
    
    if(object.read === 'true') {
        pread.classList.add('read');
        pread.textContent = 'READ';
        pread.addEventListener('click', BookReadUpdate);
    } else {
        pread.classList.add('not-read');
        pread.textContent = 'NOT READ';
        pread.addEventListener('click', BookNotReadUpdate);
    };


    removeButton.textContent = "Remove book"
    removeButton.addEventListener('click', removeBook);

    BooksAvailable.textContent = "Books Avalaible: " + myLibrary.length;

    return div;
}

function indexUpdate() {

    let divArray = Array.from(document.querySelectorAll('.card'));
    let divs = document.querySelectorAll('.card');
    
    for(div in divArray) {
    divs[div].dataset.index = div;
    }
}

function removeBook(e){
    myLibrary = myLibrary.filter(item => item != myLibrary[e.target.parentNode.dataset.index]);
    e.target.parentNode.remove();
    BooksAvailable.textContent = "Books Avalaible: " + myLibrary.length;
    indexUpdate();
};

function BookReadUpdate(BookStatus) {
    BookStatus.target.classList.remove('read');
    BookStatus.target.classList.add('not-read');
    BookStatus.target.textContent = 'NOT READ';
    BookStatus.target.addEventListener('click', BookNotReadUpdate);
    BookStatus.target.removeEventListener('click', BookReadUpdate);
    myLibrary[BookStatus.target.parentNode.dataset.index].read = 'false';
    console.log(myLibrary);
};

function BookNotReadUpdate(NotReadStatus){
    NotReadStatus.target.classList.remove('not-read');
    NotReadStatus.target.classList.add('read');
    NotReadStatus.target.textContent = 'READ';
    NotReadStatus.target.addEventListener('click', BookReadUpdate);
    NotReadStatus.target.removeEventListener('click', BookNotReadUpdate);
    myLibrary[NotReadStatus.target.parentNode.dataset.index].read = 'true';
    console.log(myLibrary);
};

indexUpdate();

for(book in myLibrary) {
    main.appendChild(createCard(myLibrary[book]))
}

submitButton.parentNode.addEventListener('submit', (e) => e.preventDefault());
submitButton.addEventListener('click', addBooktoLibrary);

modalButton.addEventListener('click', () => modal.showModal());
closeButton.addEventListener('click', () => modal.close());






