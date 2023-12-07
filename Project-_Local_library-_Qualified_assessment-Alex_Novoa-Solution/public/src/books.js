//returns the author object that has the matching ID.
function findAuthorById(authors, id) {
  const match = authors.find((author) => author.id === id);
  return match;
}

//returns the book object that has the matching ID.
function findBookById(books, id) {
  const match = books.find((book) => book.id === id);
  return match;
}

/*Returns an ARRAY with 2 ARRAYS inside it.
The first array contains book objects that represent books currently checked out
the second array contains book objects that represent books that are returned. */
function partitionBooksByBorrowedStatus(books) {
  let borrowed = [];
  let returned = [];
 
  books.forEach((book) => {
      const currentBorrow = book.borrows[0]; //get the first borrow status 
      if (currentBorrow.returned === false) {
        borrowed.push(book);
    } else {
        returned.push(book);  
    }
  });

  return [borrowed, returned];
}

/* should return an ARRAY of ten or fewer account objects that represents the accounts given by
the IDs in the provided book's borrows array.
each account object should include the returned entry from the corresponding transaction 
object in the borrow array.*/
function getBorrowersForBook(book, accounts) {
  const accountObjects = [];

  // Check if the book object and its borrows array exist and it's an array
  if (book && book.borrows) {
    const borrowTransactions = book.borrows.slice(0, 10); // Limit the borrow transactions to at most 10

    borrowTransactions.forEach((borrow) => {
      const { id, returned } = borrow;

      // Find the corresponding account object in the accounts array
      const account = accounts.find((acc) => acc.id === id);

      if (account) {
        const { picture, age, name, company, email, registered } = account;
        const accountObject = {
          id: id,
          returned: returned,
          picture: picture,
          age: age,
          name: {
            first: name.first,
            last: name.last,
          },
          company: company,
          email: email,
          registered: registered,
        };
        accountObjects.push(accountObject);
      }
    });
  }

  return accountObjects;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
