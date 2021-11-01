const express = require('express'); // express의 패키지를 불어오는 것
const path = require('path'); // path 패키지를 가져옴
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const users = require('./routes/users');
const config = require('./config/database');

//ConnecttoDatabase
mongoose.connect(config.database);

//onConnection
mongoose.connection.on('connected',()=>{
  console.log('ConnectedtoDatabase'+config.database);
});

//onError
mongoose.connection.on('error',(err)=>{
  console.log('Databaseerror:'+err);
});


const app = express(); // 가져온 것을 실행

// port number
const port = process.env.PORT || 3000; //포트 넘버 3000을 할당

// // 콘솔에 요청시간을 표시하는 미들웨어
// app.use(function (req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });

// CORS 미들웨어
app.use(cors());
//JSON 활용을 위한 미들웨어
app.use(express.json());
//URL 인코딩된 데이터의 활용을 위한 미들웨어
app.use(express.urlencoded({ extended: true}));
// Static Folder 기능을 제공하는 미들웨어
app.use(express.static(path.join(__dirname,'public')));
// Passport 미들웨어
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
// 라우팅 설정을 위한 미들웨어 (마지먹에 넣을 것)
app.use('/users', users);



// app.get('/', (req, res) => {
//   res.send('<h1>서비스 준비중입니다... ㅎㅎㅎ </h1>');
// });

// app.get('/eng', (req, res) => {
//   res.send('<h1>Under construction... </h1>');
// });

//start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
