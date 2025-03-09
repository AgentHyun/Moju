const express = require('express')
const app = express();
let id = 2;
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const todoList = [{
  id : 1,
  text : '할일 1',
  done : false,
}];

app.get('/', function (req, res) {
  res.send('Hello World!!')
})
app.get('/api/todo', (req,res) =>{
 res.json(todoList);
})
app.post('/api/todo', (req,res) =>{
  const {text, done} = req.body;
  todoList.push({
    id:id++,
    text,
    done,}
  )
  return res.send('succeess');
 });
 
app.listen(3000, ()=>{
  console.log("잘 구동됩니다");
})