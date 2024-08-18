
/**
 * @openapi
 * /api/books:
 *   get:
 *     summary: returns a list of books
 *     responses:
 *       200:
 *         description: Send json data containing a list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 book_id:
 *                   type: Number
 *                   example: 1
 *                 book_code:
 *                   type: String
 *                   example: JK-45
 *                 book_title:
 *                   type: String
 *                   example: Harry Potter
 *                 book_author:
 *                   type: String
 *                   examples: J.K Rowling
 *                 book_stock:
 *                   type: Number
 *                   example: 1
*/


/**
 * @openapi
 * /api/members:
 *   get:
 *     summary: returns a list of members
 *     responses:
 *       200:
 *         description: Send json data containing a list of members
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 member_id:
 *                   type: Number
 *                   example: 1
 *                 member_code:
 *                   type: String
 *                   example: M001
 *                 member_name:
 *                   type: String
 *                   example: Angga
 *                 penalty:
 *                   type: String
 *                   format: date
 *                   example: "2024-08-17"
 *                 total_borrow:
 *                   type: Number
 *                   example: 1
*/

/**
 * @openapi
 * /api/borrowBook:
 *   post:
 *     summary: Borrow a book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *                 example: "M002"
 *               bookCode:
 *                 type: string
 *                 example: "JK-45"
 *     responses:
 *       '200':
 *         description: Successful borrowing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "You have successfully borrowed a book with code JK-45"
 *       '400':
 *         description: Members may not borrow more than 2 books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "You're not allowed, because you already borrow 2 books!"
 *       '404':
 *         description: Book not found or other issues
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "The book with code JK-45 not found!"
 *       '409':
 *         description: Book already borrowed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "The book with code JK-45 already borrowed!"
 *       '403':
 *         description: Member is currently not being penalized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "You're in penalty, you can't borrow the book 3 days after return or your member code is wrong!"
 */


/**
 * @openapi
 * /api/returnBook:
 *   post:
 *     summary: Return a book
 *     requestBody:
 *       description: Information required to return a book
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *                 example: "M002"
 *               bookCode:
 *                 type: string
 *                 example: "JK-45"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Return book successful"
 *             examples:
 *               lateReturn:
 *                 summary: Book return is late
 *                 value:
 *                   status: "You're already late 5 days, and you're will be banned 3 days"
 *               invalidCode:
 *                 summary: The Book return with the member has not borrowed
 *                 value:
 *                   status: "You're member code or book code isn't right, please return book with the right member!"
 *               successfulReturn:
 *                 summary: Return book successful
 *                 value:
 *                   status: "Return book successful"
*/  

const express = require('express')
const MemberController = require('../controllers/memberController');
const BookController = require('../controllers/bookController');
const router = express.Router()


router.get('/books', BookController.getBooks)

router.get('/members', MemberController.getMembers)
router.post('/borrowBook', MemberController.borrowBook)
router.post('/returnBook', MemberController.returnBook)

module.exports = router