

let currentPage = 1;
const itemsPerPage = 12;

// Store borrowed books in localStorage to persist between sessions
let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
console.log(borrowedBooks.length);
document.querySelector('#amount').innerHTML = borrowedBooks.length;

function saveBorrowedBooks() {
    localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));
    document.querySelector('#amount').innerHTML = borrowedBooks.length;
}

async function gettingData() {
    try {
        const response = await fetch("https://openlibrary.org/search.json?q=book");
        const result = await response.json();
        console.log(result);
        setupPagination(result.docs);
        displayPage(result.docs, currentPage);
        displayBorrowedBooks(); // Display any previously borrowed books
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

function displayPage(data, page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    const container = document.getElementById('task');
    container.innerHTML = '';

    paginatedData.forEach((element) => {
        // Handle cases where data might be missing
        const title = element.title;
        const author = element.author_name[0];
        const coverId = element.cover_i;
        const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;

        let storydiv = document.createElement('div');
        storydiv.className = 'book-item';
        storydiv.innerHTML = `
            <div class="card" style="width: 18rem; margin: 10px;">
                <img src="${coverUrl}" class="card-img-top" alt="${title}">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${author}</p>
                    <a href="https://openlibrary.org${element.key}" class="btn btn-primary" target="_blank">View Book</a>
                    <button class="btn btn-success borrow-btn">Borrow Book</button>
                </div>
            </div>
        `;
        container.appendChild(storydiv);

        // Add event listener to borrow button
        const borrowBtn = storydiv.querySelector('.borrow-btn');
        borrowBtn.addEventListener('click', () => {
            // Check if book is already borrowed
            const isAlreadyBorrowed = borrowedBooks.some(book =>
                book.title === title && book.author === author
            );

            if (!isAlreadyBorrowed) {
                borrowedBooks.push({
                    id: element.key || Date.now().toString(),
                    title: title,
                    author: author,
                    coverId: coverId,
                    borrowDate: new Date().toLocaleDateString()
                });
                saveBorrowedBooks();
                displayBorrowedBooks();
                // Show toast notification instead of alert
                const toastEl = document.querySelector('.toast');
                const toastBody = toastEl.querySelector('.toast-body');
                toastBody.textContent = `"${title}" has been borrowed!`;
                const toast = new bootstrap.Toast(toastEl);
                toast.show();
            } else {
                // Show toast notification for already borrowed
                const toastEl = document.querySelector('.toast');
                const toastBody = toastEl.querySelector('.toast-body');
                toastBody.textContent = 'You have already borrowed this book!';
                const toast = new bootstrap.Toast(toastEl);
                toast.show();
            }
        });
    });
}

function displayBorrowedBooks() {
    const borrowedContainer = document.getElementById('borrowedBooks');
    if (!borrowedContainer) {
        console.error('Borrowed books container not found!');
        return;
    }

    borrowedContainer.innerHTML = '<h3>Borrowed Books</h3>';

    if (borrowedBooks.length === 0) {
        borrowedContainer.innerHTML += '<p>No books borrowed yet.</p>';
        return;
    }

    borrowedBooks.forEach((book, index) => {
        const coverUrl = book.coverId ?
            `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg` :
            'placeholder.jpg';

        const borrowedItem = document.createElement('div');
        borrowedItem.className = 'borrowed-item';
        borrowedItem.innerHTML = `
            <div class="card mb-3 container" style="display-flex;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${coverUrl}" class="img-fluid rounded-start" alt="${book.title}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text">${book.author}</p>
                            <p class="card-text"><small class="text-muted">Borrowed on: ${book.borrowDate}</small></p>
                            <button class="btn btn-warning return-btn" data-index="${index}">Return Book</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        borrowedContainer.appendChild(borrowedItem);

        // Add event listener to return button
        const returnBtn = borrowedItem.querySelector('.return-btn');
        returnBtn.addEventListener('click', () => {
            const bookIndex = parseInt(returnBtn.getAttribute('data-index'));
            const removedBook = borrowedBooks.splice(bookIndex, 1)[0];
            saveBorrowedBooks();
            displayBorrowedBooks();
            // Show toast notification instead of alert
            const toastEl = document.querySelector('.toast');
            const toastBody = toastEl.querySelector('.toast-body');
            toastBody.textContent = `"${removedBook.title}" has been returned!`;
            const toast = new bootstrap.Toast(toastEl);
            toast.show();
        });
    });
}

function setupPagination(data) {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) {
        console.error('Pagination container not found!');
        return;
    }

    paginationContainer.innerHTML = '';

    // Create Previous Button
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.className = 'btn btn-secondary me-2';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayPage(data, currentPage);
            setupPagination(data);
        }
    });
    paginationContainer.appendChild(prevButton);

    // Add page indicator
    const pageIndicator = document.createElement('span');
    pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
    pageIndicator.className = 'mx-2';
    paginationContainer.appendChild(pageIndicator);

    // Create Next Button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.className = 'btn btn-secondary ms-2';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayPage(data, currentPage);
            setupPagination(data);
        }
    });
    paginationContainer.appendChild(nextButton);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    gettingData();
});


// main.js

