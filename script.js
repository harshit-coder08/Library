const myLibrary =[];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}
Book.prototype.toggleRead = function() {
    this.read = !this.read;
};


function addBookToLibrary(title,author,pages,read) {
    let book = new Book(title,author,pages,read);
    myLibrary.push(book);
}

function displayBooks() {
    const shelf = document.querySelector("#shelf"); // could also use getElementById, it won't matter in this case
    shelf.textContent = "";
    
    for (let i=0; i<myLibrary.length;i++){
        const card = document.createElement("div");
        card.classList.add("card");

        const buttonDiv =  document.createElement("div");
        buttonDiv.classList.add("card_buttons");
        
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        
        const toggleButton = document.createElement("button");
        toggleButton.textContent = "Toggle Read";

        card.textContent = `Title: ${myLibrary[i].title}, Author: ${myLibrary[i].author}, Pages: ${myLibrary[i].pages}, Read: ${myLibrary[i].read}`;
        removeButton.id = `${myLibrary[i].id}`;
        shelf.appendChild(card); // makes card the child node of shelf even we didn't define this beforehand
        buttonDiv.appendChild(toggleButton);
        buttonDiv.appendChild(removeButton);
        card.appendChild(buttonDiv);
        

        removeButton.addEventListener("click", ()=>{
            for (const x of myLibrary) {
                if (x.id === removeButton.id) {
                    myLibrary.splice(myLibrary.indexOf(x),1);
                    card.remove();
                    displayBooks();
                    break;// stops indexOf from going any further. we could have also used findIndex instead of indexOf
                }
            }
        })
        toggleButton.addEventListener("click", ()=>{
            myLibrary[i].toggleRead();
            displayBooks();
        })
    }
}

const form = document.querySelector("#book_form");
const addBook = document.querySelector('#new_book');
addBook.addEventListener("click", ()=>{
    form.hidden = false;
})

form.addEventListener("submit", (event)=>{
    event.preventDefault();

    const title = document.getElementById("book_name").value;
    const author = document.getElementById("author").value;
    const pages = Number(document.getElementById("pages").value);
    const read = document.getElementById("read").checked;

    addBookToLibrary(title, author, pages, read);
    displayBooks();
    form.reset();
    form.hidden = true;

});