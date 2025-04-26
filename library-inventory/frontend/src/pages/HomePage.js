import React, { useState, useEffect } from "react";
import {
  createbook,
  updateBook,
  deleteBook,
  issueBook,
  returnbook,
} from "./api"; // Assuming you have functions for handling API requests
import axios from "axios";
import "./HomePage.css";

const HomePage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [pages, setPages] = useState("");
  const [totalCopies, settotalCopies] = useState("");
  const [books, setBooks] = useState([]); // To store the list of books
  const [editingBook, setEditingBook] = useState(null); // To track the book being edited
  const [activeTab, setActiveTab] = useState("books"); // State to handle active tab
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [department, setDepartment] = useState("");

  const [issuedBooks, setIssuedBooks] = useState([]);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format to YYYY-MM-DD
  };

  const getReturnDueDate = () => {
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 30); // Add 30 days
    return returnDate.toISOString().split("T")[0]; // Format to YYYY-MM-DD
  };

  // Automatically set dates
  const [borrowDate] = useState(getTodayDate());
  const [returnDueDate] = useState(getReturnDueDate());

  // Fetch books from the backend
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  const fetchIssuedBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/issuedBooks");
      setIssuedBooks(response.data);
    } catch (error) {
      console.error("Error fetching issued books:", error);
    }
  };
  const handleReturnBook = async (bookId) => {
    try {
      await returnbook(bookId);
      fetchIssuedBooks(); // Refresh the list after deleting
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchIssuedBooks();
  }, []);

  // Handle the change in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "author":
        setAuthor(value);
        break;
      case "genre":
        setGenre(value);
        break;
      case "pages":
        setPages(value);
        break;
      case "totalCopies":
        settotalCopies(value);
        break;
      default:
        break;
    }
  };

  // Handle form submission for creating or updating a book
  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookData = {
      title,
      author,
      genre,
      pages: Number(pages),
      totalCopies: Number(totalCopies),
    };

    try {
      if (editingBook) {
        // Update the book
        await updateBook(editingBook._id, bookData);
        setEditingBook(null); // Reset editing state
      } else {
        // Add a new book
        await createbook(bookData);
      }
      fetchBooks(); // Refresh the list of books after adding or updating
      setTitle("");
      setAuthor("");
      setGenre("");
      setPages("");
      settotalCopies("");
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  // Handle editing a book
  const handleEdit = (book) => {
    setEditingBook(book);
    setTitle(book.title);
    setAuthor(book.author);
    setGenre(book.genre);
    setPages(book.pages.toString());
    settotalCopies(book.totalCopies.toString());
  };

  // Handle deleting a book
  const handleDelete = async (bookId) => {
    try {
      await deleteBook(bookId);
      fetchBooks(); // Refresh the list after deleting
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  // Switch tabs handler
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  const handleIssueSubmit = async (e) => {
    e.preventDefault();
    const issueData = {
      bookTitle: title,
      studentName,
      studentId,
      department,
      borrowDate,
      returnDueDate,
    };

    try {
      await issueBook(issueData); // API call to issue book
      fetchIssuedBooks(); // Refresh the issued books list
      setStudentName("");
      setStudentId("");
      setDepartment("");
    } catch (error) {
      console.error("Error issuing book:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="header">Library Inventory Management</h1>

      {/* Navigation Tabs */}
      <div className="navigation-tabs">
        <button
          className={`tab-button ${activeTab === "books" ? "active" : ""}`}
          onClick={() => handleTabSwitch("books")}
        >
          Books List
        </button>
        <button
          className={`tab-button ${activeTab === "issue" ? "active" : ""}`}
          onClick={() => setActiveTab("issue")}
        >
          Issue Book
        </button>
        <button
          className={`tab-button ${
            activeTab === "issuedBooks" ? "active" : ""
          }`}
          onClick={() => setActiveTab("issuedBooks")}
        >
          Issued Books
        </button>
      </div>

      {/* Display Content Based on Active Tab */}
      {activeTab === "books" && (
        <div className="issued-books-container">
          <div className="form-container">
            <h2>{editingBook ? "Edit Book" : "Add New Book"}</h2>
            <form onSubmit={handleSubmit} className="form">
              <input
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                placeholder="Book Title"
                required
                className="input-field"
              />
              <input
                type="text"
                name="author"
                value={author}
                onChange={handleChange}
                placeholder="Author"
                required
                className="input-field"
              />
              <input
                type="text"
                name="genre"
                value={genre}
                onChange={handleChange}
                placeholder="Genre"
                required
                className="input-field"
              />
              <input
                type="number"
                name="pages"
                value={pages}
                onChange={handleChange}
                placeholder="Pages"
                required
                className="input-field"
              />
              <input
                type="number"
                name="totalCopies"
                value={totalCopies}
                onChange={handleChange}
                placeholder="Total Copies"
                required
                className="input-field"
              />
              <button type="submit" className="submit-button">
                {editingBook ? "Update Book" : "Add Book"}
              </button>
            </form>
          </div>

          <div className="book-list-container">
            <h2>Book List</h2>
            {books.length === 0 ? (
              <p>No books available</p>
            ) : (
              <table className="book-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Genre</th>
                    <th>Pages</th>
                    <th>Total Copies</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book._id}>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.genre}</td>
                      <td>{book.pages}</td>
                      <td>{book.totalCopies}</td>

                      <td>
                        <button
                          onClick={() => handleEdit(book)}
                          className="edit-button"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(book._id)}
                          className="delete-button"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {activeTab === "issue" && (
        <div className="issued-books-container">
          <h2>Issue Books</h2>
          <form onSubmit={handleIssueSubmit} className="form">
            <label>Book Title:</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Book Title"
              required
              className="input-field"
            />
            <label>Student Name:</label>
            <input
              type="text"
              name="studentName"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Student Name"
              required
              className="input-field"
            />
            <label>Student ID:</label>
            <input
              type="text"
              name="studentId"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Student ID"
              required
              className="input-field"
            />
            <label>Department:</label>
            <input
              type="text"
              name="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Department"
              required
              className="input-field"
            />
            <label>Borrow Date:</label>
            <input
              type="text"
              name="borrowDate"
              value={borrowDate}
              readOnly
              className="input-field"
            />
            <label>Return Due Date:</label>
            <input
              type="text"
              name="returnDueDate"
              value={returnDueDate}
              readOnly
              className="input-field"
            />
            <button type="submit" className="submit-button">
              Issue Book
            </button>
          </form>
        </div>
      )}

      {activeTab === "issuedBooks" && (
        <div className="issued-books-container">
          <h2>Issued Books</h2>
          {issuedBooks.length === 0 ? (
            <p>No books currently issued</p>
          ) : (
            <table className="issued-books-table">
              <thead>
                <tr>
                  <th>Book Title</th>
                  <th>Student Name</th>
                  <th>Student ID</th>
                  <th>Department</th>
                  <th>Borrow Date</th>
                  <th>Return Due Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {issuedBooks.map((issuedBook) => (
                  <tr key={issuedBook._id}>
                    <td>{issuedBook.bookTitle}</td>
                    <td>{issuedBook.studentName}</td>
                    <td>{issuedBook.studentId}</td>
                    <td>{issuedBook.department}</td>
                    <td>{issuedBook.borrowDate}</td>
                    <td>{issuedBook.returnDueDate}</td>
                    <td>
                      <button
                        onClick={() => handleReturnBook(issuedBook._id)}
                        className="return-button"
                      >
                        Return
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
