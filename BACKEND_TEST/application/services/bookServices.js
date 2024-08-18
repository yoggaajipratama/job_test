const BookRepository = require('../../domain/repository/bookRepository')

class BookServices{
    static async getBooks(){
        return await BookRepository.getBooks()
    }
}

module.exports = BookServices