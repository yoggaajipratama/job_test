const BookServices = require('../../application/services/bookServices')

class BookController{
    static async getBooks(req, res){
        try {
            const books = await BookServices.getBooks()
            res.status(200).json(books)
        } catch (error) {
            res.status(500).json({error: error})
        }
    }
}

module.exports = BookController