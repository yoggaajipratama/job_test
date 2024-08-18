const Book = require('../model/books')
const conn = require('../../database/connection')

class BookRepository {
    static getBooks() {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM books WHERE book_stock > 0', (err, result) => {
                if (err) {
                    return reject(err)
                }
                else {
                    const books = result.map(row=> new Book(
                        row.book_id,
                        row.book_code,
                        row.book_title,
                        row.book_author,
                        row.book_stock
                    ))
                    resolve(books)
                    // res.json(result);
                }
            })
        })
    }
}

module.exports = BookRepository