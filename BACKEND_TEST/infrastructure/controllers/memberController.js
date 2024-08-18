const MemberServices = require('../../application/services/memberServices')

class MemberController {
    static async getMembers(req, res) {
        try {
            const member = await MemberServices.getMembers()
            res.status(200).json(member)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error })
        }
    }

    static async borrowBook(req, res){
        try {
            const member = await MemberServices.borrowBook(req.body.bookCode, req.body.memberCode)
            res.json(member)
        } catch (error) {
            console.log(error)
            res.status(500).json({error: error})
        }
    }
    
    static async returnBook(req, res){
        try {
            const member = await MemberServices.returnBook(req.body.bookCode, req.body.memberCode)
            res.json(member)
        } catch (error) {
            console.log(error)
            res.status(500).json({error: error})
        }
    }
}

module.exports = MemberController