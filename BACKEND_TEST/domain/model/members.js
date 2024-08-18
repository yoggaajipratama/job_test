class Member{
    constructor(id, code, name, penalty, borrow){
        this.member_id = id,
        this.member_code = code,
        this.member_name = name,
        this.member_penalty = penalty,
        this.total_borrow = borrow
    }
}

module.exports = Member