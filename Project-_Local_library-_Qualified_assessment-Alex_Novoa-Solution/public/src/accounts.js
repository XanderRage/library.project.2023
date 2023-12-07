//returns the account object that has the matching ID
function findAccountById(accounts, id) {
  for (let account in accounts){
    let customer = accounts[account];
    if (customer.id === id ){
      return customer;
    }
  }
}
//returns a SORTED array of the provided account objects.
//sorted alphabetically by last name.
function sortAccountsByLastName(accounts) {
  const sortedAccounts = [...accounts];

  sortedAccounts.sort((a, b) => {
      const lastNameA = a.name.last.toLowerCase();
      const lastNameB = b.name.last.toLowerCase();

      return lastNameA > lastNameB ? 1 : -1;
  });

  return sortedAccounts;
}

function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;

  // Count the occurrences of account ID in borrows arrays of all books
  const totalBorrows = books.reduce((acc, book) => {
    const borrowCount = book.borrows.filter((borrow) => borrow.id === accountId).length;
    return acc + borrowCount;
  }, 0);

  return totalBorrows;
}

/*Returns an array of book objects, including author info
that represents ALL BOOKS CURRENTLY CHECKED OUT by the given account. */
function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;

  // Filter and retrieve books currently checked out by the account
  const checkedOutBooks = books.filter((book) => {
    const currentBorrow = book.borrows[0]; // Latest borrow record is assumed at index 0
    return currentBorrow.id === accountId && !currentBorrow.returned;
  });

  // Add author information to each checked-out book object
  const checkedOutBooksInfo = checkedOutBooks.map((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    return {
      ...book,
      author: {
        id: author.id,
        name: {
          first: author.name.first,
          last: author.name.last,
        },
      },
    };
  });

  return checkedOutBooksInfo;
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
