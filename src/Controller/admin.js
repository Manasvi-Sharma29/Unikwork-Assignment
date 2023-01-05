const userModel = require('../Model/userModel')
const bcrypt = require('bcrypt')
const admin = async function (req, res){
    try {
        let newAdmin = {
            name:"Jay Saxena",
            email:"jaysaxena@gmail.com",
            password:"jay76&%#$",
            role:"admin",
            phone:"8976345217"
        }
        newAdmin.codedPassword = await bcrypt.hash(newAdmin.password, 10)
        await userModel.create(newAdmin)
      } catch (error) {
        console.log(error.message)
      }
}

module.exports = {admin}