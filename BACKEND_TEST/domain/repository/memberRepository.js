const Member = require('../model/members')
const conn = require('../../database/connection')

class MemberRepository {
    static getMembers() {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT 
                members.*, 
                SUM(CASE 
                        WHEN borrow.return_date IS NULL AND borrow.borrow_date IS NOT NULL THEN 1 
                        ELSE 0 
                    END) AS total_borrow
                FROM 
                    members
                LEFT JOIN 
                    borrow ON members.member_code = borrow.member_code
                GROUP BY 
                    members.member_code`, (err, result) => {
                if (err) {
                    console.log(err)
                    return reject(err)
                }
                else {
                    const members = result.map(row => new Member(
                        row.member_id,
                        row.member_code,
                        row.member_name,
                        row.penalty,
                        row.total_borrow
                    ))
                    resolve(members)
                }
            })
        })
    }

    static borrowBook(bookCode, memberCode) {
        return new Promise((resolve, reject) => {
            const sql_check_book = `SELECT COUNT(book_code) as found_book FROM books WHERE books.book_code = '${bookCode}'`
            const sql_member_check = `SELECT members.*, COUNT(member_code) as found_member FROM members WHERE member_code = '${memberCode}'`
            const sql_count_book_borrowed = `SELECT COUNT(book_code) as count_book FROM borrow WHERE book_code = '${bookCode}' AND borrow.return_date IS NULL`
            const sql_count_member_borrowed = `SELECT COUNT(member_code) as count_member FROM borrow WHERE member_code = '${memberCode}' AND borrow.return_date IS NULL`
            const sql_update_book_stock = `UPDATE books SET book_stock = book_stock-1 WHERE book_code = '${bookCode}'`
            const sql_insert_into_borrow_table = `INSERT INTO borrow(member_code, book_code) VALUES('${memberCode}', '${bookCode}')`

            conn.query(sql_check_book, (err, result) => {
                if (err) {
                    throw err
                }
                else {
                    result.forEach(element => {
                        if (element.found_book > 0) {
                            conn.query(sql_member_check, (err, result) => {
                                result.forEach(element => {
                                    const dueDate = new Date(element.penalty);
                                    const currentDate = new Date();
                                    // console.log(element)
                                    if (element.penalty == null && element.found_member > 0 || dueDate < currentDate && element.found_member > 0) {
                                        conn.query(sql_count_book_borrowed, (err, result) => {
                                            result.forEach(element => {
                                                if (element.count_book < 1) {
                                                    conn.query(sql_count_member_borrowed, (err, result) => {
                                                        result.forEach(element => {
                                                            if (element.count_member < 2) {
                                                                conn.query(sql_update_book_stock, (err, result) => {
                                                                    if (err) {
                                                                        return reject(err)
                                                                    }
                                                                    else {
                                                                        conn.query(sql_insert_into_borrow_table, (err, result) => {
                                                                            if (err) {
                                                                                return reject(err)
                                                                            }
                                                                            else {
                                                                                resolve({ status: 200, msg: `You have successfully borrowed a book with code ${bookCode}` })
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                            else {
                                                                resolve({ status: 400, msg: `You're not allowed, because you already borrow 2 books!` })
                                                            }
                                                        })
                                                    })
                                                }
                                                else {
                                                    resolve({ status: 409, msg: `The book with code ${bookCode} already borrowed!` })
                                                }
                                            })
                                        })
                                    }
                                    else {
                                        resolve({ status: 403, msg: `You're in penalty, you can't borrow the book 3 days after return or your member code is wrong!` })
                                    }
                                })
                            })
                        }
                        else {
                            resolve({ status: 404, msg: `The book with code ${bookCode} not found!` })
                        }
                    })
                }
            })
        })
    }

    static returnBook(bookCode, memberCode) {
        return new Promise((resolve, reject) => {
            const sql_find_right_member = `SELECT COUNT(borrow.member_code) as found_member FROM borrow WHERE borrow.member_code = '${memberCode}' AND borrow.book_code = '${bookCode}' AND borrow.return_date IS NULL`
            const sql_penalty_check = `SELECT borrow.*, DATEDIFF(CURDATE(), borrow.borrow_date) AS days_late FROM borrow LEFT JOIN members ON borrow.member_code = members.member_code WHERE borrow.return_date IS NULL AND borrow.member_code = '${memberCode}' AND borrow.book_code = '${bookCode}'`
            const sql_update_book_stock = `UPDATE books SET books.book_stock = books.book_stock+1 WHERE books.book_code = '${bookCode}'`
            const sql_update_return_date = `UPDATE borrow SET borrow.return_date = current_timestamp() WHERE borrow.book_code = '${bookCode}' AND borrow.member_code = '${memberCode}'`
            const sql_update_penalty = `UPDATE members SET members.penalty = DATE_ADD(CURDATE(), INTERVAL 3 DAY) WHERE members.member_code = '${memberCode}'`

            conn.query(sql_find_right_member, (err, result) => {
                if (err) {
                    return reject(err)
                }
                else {
                    result.forEach(element => {
                        if (element.found_member > 0) {
                            conn.query(sql_penalty_check, (err, result) => {
                                if (err) {
                                    return reject(err)
                                }
                                else {
                                    result.forEach(element => {
                                        if (element.days_late < 1) {
                                            conn.query(sql_update_book_stock, (err, result) => {
                                                if (err) {
                                                    return reject(err)
                                                }
                                                else {
                                                    conn.query(sql_update_return_date, (err, result) => {
                                                        if (err) {
                                                            return reject(err)
                                                        }
                                                        else {
                                                            resolve({ status: 200, msg: `Return book successful` })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                        else {
                                            conn.query(sql_update_book_stock, (err, result) => {
                                                if (err) {
                                                    return reject(err)
                                                }
                                                else {
                                                    conn.query(sql_update_return_date, (err, result) => {
                                                        if (err) {
                                                            return reject(err)
                                                        }
                                                        else {
                                                            conn.query(sql_update_penalty, (err, result) => {
                                                                if (err) {
                                                                    return reject(err)
                                                                }
                                                                resolve({ status: 200, msg: `You're already late ${element.days_late} days, and you're will be banned 3 days` })
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    });
                                }
                            })
                        }
                        else {
                            resolve({ status: 200, msg: "You're member code or book code isn't right, please return book with the right member!" })
                        }
                    })
                }
            })
        })
    }
}

module.exports = MemberRepository