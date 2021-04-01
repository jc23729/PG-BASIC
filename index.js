const express = require('express');
const app = express();
const pool = require('./db')

app.use(express.json()); // => req.body (will allow us to get the Json Data )

app.get('/dogs', function(request, response) {
    return response.send('Dogs go brk brk');
  });
  
  // ROUTES 

  // get all todos
  app.get('/todos', async(req, res)=> {
    try {
      const allTodos = await pool.query(
        "SELECT * FROM todo");
        res.json(allTodos.rows);
    }catch(err){
      console.log(err.message);
    }
  });
  // get a todo

  app.get('/todos/:id', async(req, res) => {
    // console.log(req.params);
  })


  // create a todo
app.post('/todos', async (req, res) => {
  try{
    const {description} = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );
    // //await
    // console.log(req.body);
    res.json(newTodo.rows[0]);

  }catch(err){
    console.error(err.message);
  }
});


  // update a todo

  // delete a todo 



  app.listen(3000, function(){
    console.log('App on port 3000');
  })
//touch index.js sets up the file right away in terminal 


// psql Common Commands
// \l — List all databases
// \c DB_NAME — connect to DB_NAME
// \dt —- List all tables (in current db)
// \d TABLE_NAME — Get details about TABLE_NAME (in current db)
// \q — Quit psql (can also type <Control-D>)
// Juans-Air:PG-BASIC juancruz$ psql -U postgres