export const createbook = (newBook) => {
  console.log("go", newBook);

  return fetch("http://localhost:8000/addbooks", {
    method: "POST",
    body: JSON.stringify({ newBook }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const updateBook = (bookId, updatedBook) => {
  console.log("Updating book:", updatedBook);

  return fetch(`http://localhost:8000/updatebooks/${bookId}`, {
    method: "PUT",
    body: JSON.stringify(updatedBook),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const deleteBook = (bookId) => {
  console.log("Deleting book with ID:", bookId);

  return fetch(`http://localhost:8000/deletebooks/${bookId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const returnbook = (bookId) => {
  console.log("Deleting book with ID:", bookId);

  return fetch(`http://localhost:8000/returnbook/${bookId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const issueBook = (issueData) => {
  console.log("go", issueData);

  return fetch("http://localhost:8000/issueData", {
    method: "POST",
    body: JSON.stringify({ issueData }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
