const MemberRepository = require('../../domain/repository/memberRepository')

class BookServices{
    static async getMembers(){
        return await MemberRepository.getMembers()
    }
    static async borrowBook(bookCode, memberCode){
        return await MemberRepository.borrowBook(bookCode, memberCode)
    }
    static async returnBook(bookCode, memberCode){
        return await MemberRepository.returnBook(bookCode, memberCode)
    }
}

module.exports = BookServices