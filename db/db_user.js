const md5 = require('blueimp-md5')

//1.引入mongoose
var mongoose = require('mongoose')

//2.连接数据库
mongoose.connect('mongodb://localhost:27017/clothesmall_user')
mongoose.connection.once('open',function () {
    console.log('数据库连接成功')
})

//3.定义模型
const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const userModel = mongoose.model('User',schema)//数据库名为users
module.exports = userModel

