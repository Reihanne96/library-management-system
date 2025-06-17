const api = '/api/books';

const bookForm = document.getElementById('book-form');
const bookList = document.getElementById('book-list');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const isbnInput = document.getElementById('isbn');
const idInput = document.getElementById('book-id');

const borrowForm = document.getElementById('borrow-form');
const returnForm = document.getElementById('return-form');
const borrowBookIdInput = document.getElementById('borrow-book-id');
const userIdInput = document.getElementById('user-id');
const returnBookIdInput = document.getElementById('return-book-id');
const messageBox = document.getElementById('message');

function showMessage(type, text) {
  messageBox.className = `alert alert-${type}`;
  messageBox.textContent = text;
  messageBox.classList.remove('d-none');
  setTimeout(() => messageBox.classList.add('d-none'), 3000);
}

async function fetchBooks() {
  const res = await fetch(api);
  const books = await res.json();
  bookList.innerHTML = books.map(book => `
    <div class="card mb-2 p-3 ${book.status === 'Borrowed' ? 'border-danger' : 'border-success'}">
      <h5>${book.title}</h5>
      <p>${book.author} | ${book.isbn}</p>
      <p><small><b>ID:</b> ${book._id}</small></p>
      <span class="badge ${book.status === 'Borrowed' ? 'bg-danger' : 'bg-success'}">${book.status}</span>
      <div class="mt-2">
        <button class="btn btn-sm btn-warning" onclick="editBook('${book._id}')">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteBook('${book._id}')">Delete</button>
      </div>
    </div>
  `).join('');
}

bookForm.onsubmit = async e => {
  e.preventDefault();
  const book = {
    title: titleInput.value,
    author: authorInput.value,
    isbn: isbnInput.value
  };
  const id = idInput.value;
  try {
    if (id) {
      await fetch(`${api}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(book) });
      showMessage('success', 'Book updated successfully');
    } else {
      await fetch(api, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(book) });
      showMessage('success', 'Book added successfully');
    }
    bookForm.reset();
    fetchBooks();
  } catch (error) {
    showMessage('danger', 'Error saving book');
  }
};

borrowForm.onsubmit = async e => {
  e.preventDefault();
  try {
    await fetch('/api/borrow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bookID: borrowBookIdInput.value,
        userID: userIdInput.value
      })
    });
    borrowForm.reset();
    showMessage('success', 'Book borrowed successfully');
    fetchBooks();
  } catch (error) {
    showMessage('danger', 'Error borrowing book');
  }
};

returnForm.onsubmit = async e => {
  e.preventDefault();
  try {
    const res = await fetch('/api/return', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookID: returnBookIdInput.value })
    });
    const result = await res.json();
    if (res.ok) {
      showMessage('success', 'Book returned successfully');
      fetchBooks();
    } else {
      showMessage('danger', result.error || 'Error returning book');
    }
    returnForm.reset();
  } catch (error) {
    showMessage('danger', 'Error returning book');
  }
};

async function editBook(id) {
  const res = await fetch(`${api}/${id}`);
  const book = await res.json();
  titleInput.value = book.title;
  authorInput.value = book.author;
  isbnInput.value = book.isbn;
  idInput.value = book._id;
}

async function deleteBook(id) {
  await fetch(`${api}/${id}`, { method: 'DELETE' });
  fetchBooks();
  showMessage('success', 'Book deleted successfully');
}

fetchBooks();