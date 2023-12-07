//returns the total books that are in the array
function getTotalBooksCount(books) {
  let total = 0;
  for (let book in books){
    total += 1;
  }
  return total;
}

function getTotalAccountsCount(accounts) {
  let total = 0;
  for (let account in accounts){
    total += 1;
  }
  return total;
}

function getBooksBorrowedCount(books) {
  let totalCount = 0;
  books.forEach((book) => {
    const count = book.borrows.filter((borrow) => borrow.returned === false).length;
    totalCount += count;
  });
  return totalCount;
}

//returns an array containing five objects or fewer that represents the 
//most common occurring genres, ordered from most common to least.
function getMostCommonGenres(books){
  const genreCounts = books.reduce((count, book) => {
      const { genre } = book;
      count[genre] = (count[genre] || 0) + 1;
      return count;
  }, {});

  const sortedGenres = Object.keys(genreCounts).map((genre) => 
  ({name: genre, count: genreCounts[genre] })).sort((a, b) => b.count - a.count);

  return sortedGenres.slice(0,5);

}

//It returns an array containing five objects or fewer that represents the most 
//popular books in the library. 
//Popularity is represented by the number of times a book has been borrowed.
function getMostPopularBooks(books) {
  const borrowedCount = books.map((book) => {
    const borrowCount = book.borrows.length;
    return { name: book.title, count: borrowCount };
  });

  const sortedBooks = borrowedCount
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return sortedBooks;
}

// Helper function
function getAuthorFullName(authors, authorId) {
  const author = authors.find((author) => authorId === author.id);
  if (author) {
    const { first, last } = author.name;
    return `${first} ${last}`;
  }
}

//getMostPopularAuthors function using the helper function
function getMostPopularAuthors(books, authors) {
  const borrowedCount = books.map((book) => {
    const borrowCount = book.borrows.length;
    const fullName = getAuthorFullName(authors, book.authorId);

    return { name: fullName, count: borrowCount };
  });

  const sortedAuthors = borrowedCount.sort((a, b) => b.count - a.count).slice(0, 5);

  return sortedAuthors;
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
