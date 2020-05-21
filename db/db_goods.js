//1.引入mongoose
const mongoose = require('mongoose')

//2.连接数据库
mongoose.connect("mongodb://localhost:27017/clothesmall_user")
mongoose.connection.once('open',function(){
  console.log('数据库连接成功')
})

//3.定义模型
var schema = new mongoose.Schema({
  userId: { //账号名
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  checked: {
    type: Boolean,
    required: true
  }
})

const goodsModel = mongoose.model('Good',schema)//表名为goods

// new goodsModel({
//   userId: '1',
//   id: '1',
//   desc: 'desc',
//   count: 1,
//   img: 'src',
//   title: 'title',
//   price: '123'
// }).save(function(err,data){
//   if(err){
//     console.log('err')
//   }else{
//     console.log(data)
//   }
// })

// goodsModel.find({userId: '1'},function(err,data){
//   if(data){
//     console.log(data)
//   }
// })

module.exports = goodsModel