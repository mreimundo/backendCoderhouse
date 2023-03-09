const bcrypt = require('bcrypt')

const generateHash = password =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

const isValidPassword = (user, password) =>{
    return bcrypt.compareSync(password, user.password)
}

module.exports = {generateHash, isValidPassword}