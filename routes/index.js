var express = require('express');
var router = express.Router();
var userModel = require('../db/db_user')
var goodsModel = require('../db/db_goods')
var md5 = require('blueimp-md5')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  res.send('data')
});

router.get('/aa',function(req,res){
  // res.header('Access-Control-Allow-Origin','*')
  // res.send(req.body)
  res.send({
    code: 1
  })
})

/*注册*/ 
router.post('/register',function(req,res){


  res.header('Access-Control-Allow-Origin','*')

  var data = JSON.parse(Object.keys(req.body)[0])

  // var data = req.body
    console.log(data)
  const {username,password} = data

  //查询该账号是否已经注册
  userModel.findOne({username},function(err,user){
    if(user){//该账号已存在
      res.send({
        code: 1,
        msg: '该账号已存在'
      })
    }else{//将账号的密码存储到数据库中
      new userModel({username,password:md5(password)}).save(function(err,user){
        if(!user){
          res.send({//注册失败
            code: 2,
            msg: '注册失败，请重新注册'
          })
        }else{//注册成功

          //生成一个cookie，交给浏览器保存
          // res.cookie('userId',user._id,{maxAge: 1000*60*60*24})
          res.send({
            code: 0,
            data: {username, _id: user._id} //响应数据中不要携带密码
          })
        }
      })
    }
  })
})


/*登录 */
router.post('/login',function(req,res){

  res.header('Access-Control-Allow-Origin','*')

  var data = JSON.parse(Object.keys(req.body)[0])
  console.log(data)
  const {username,password} = data

  userModel.findOne({username,password:md5(password)},function(err,user){
    if(user){//登录成功
      // res.cookie('userId',user._id,{maxAge: 1000*60*60*24})
      res.send({
        code: 0,
        data: {username, _id: user._id}
      })
    }else{//登录失败
      res.send({
        code: 1,
        msg: '账号或密码错误'
      })
    }
  })
})

//添加商品
router.post('/addGoods',function(req,res){
  res.header('Access-Control-Allow-Origin','*')

  var goods = JSON.parse(Object.keys(req.body)[0])
  console.log(goods)

  new goodsModel(goods).save(function(err,data){
    if(err){
      res.send({
        code: 1,
        msg: '添加失败'
      })
    }else{
      res.send({
        code: 0,
        msg: '添加成功'
      })
    }
  })
})


//删除商品
router.post('/deleteGoods',function(req,res){
  res.header('Access-Control-Allow-Origin','*')
  
  var data = JSON.parse(Object.keys(req.body)[0])
  goodsModel.findOneAndDelete({
    id: data.id,
    userId: data.userId
  },function(err,data){
    if(err){
      res.send({
        code: 1,
        msg: '删除失败'
      })
    }else{
      res.send({
        code: 0,
        msg: '删除成功'
      })
    }
  })
})
//查询商品
router.post('/findGoods',function (req,res){
  res.header('Access-Control-Allow-Origin','*')

  const userId = JSON.parse(Object.keys(req.body)[0])
  console.log(userId)
  goodsModel.find(userId,function(err,data){
    if(err){
      res.send({
        code: 1,
        msg: '查询失败'
      })
    }else{
      res.send({
        code: 0,
        data: data
      })
    }
  })
})
//商品数量修改
router.post('/updateCount',function(req,res){
  res.header('Access-Control-Allow-Origin','*')

  const {data,newCount} = JSON.parse(Object.keys(req.body)[0])
  
  console.log(data,newCount)

  goodsModel.findOneAndUpdate(data,{ count: newCount },function(err,data){
      if(err){
        res.send({
          code: 1,
          msg: '修改失败'
        })
      }else{
        res.send({
          code: 0,
          data: data
        })
      }
    })
})

module.exports = router;
