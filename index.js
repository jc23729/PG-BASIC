const express = require('express');
const app = express();
const pool = require('./db')

app.use(express.json()); // => req.body (will allow us to get the Json Data )

// app.get('/dogs', function(request, response) {
//     return response.send('Dogs go brk brk');
//   });
//
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
    // console.log(req.params.id);
    const { id } = req.params
    try {
      const todos = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
        id
      ]);
      res.json(todos.rows[0]);

    }catch(err){
      console.log(err.message);
    }
  });


  // create a todo
app.put('/todos', async (req, res) => {
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
  app.put('/todos/:id', async (req, res) => {
    try{
      const {id} = req.params; //WHERE
      const {description} = req.body; //SET


      const updateTodo = await pool.query(
        "UPDATE todo SET description = $1 WHERE todo_id = $2",
        [description, id]
      );
      // //await
      // console.log(req.body);
      res.json("Todo was updated successfully");
    }catch(err){
      console.error(err.message);
    }
  });

  // delete a todo 
app.delete('/todos/:id', async (req, res) => {
  try{
    const {id} = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", 
    [id]);
    res.json("Todo was deleted successfully");
  }catch(err){
    console.error(err.message);
  }
})


  app.listen(3000, function(){
    console.log('App on port 3000');
  })


////////////////NOTES///////////

//touch index.js sets up the file right away in terminal 


// psql Common Commands
// \l ??? List all databases
// \c DB_NAME ??? connect to DB_NAME
// \dt ???- List all tables (in current db)
// \d TABLE_NAME ??? Get details about TABLE_NAME (in current db)
// \q ??? Quit psql (can also type <Control-D>)
// Juans-Air:PG-BASIC juancruz$ psql -U postgres

// Databases
// List databases
// \l
// Copy to clipboardErrorCopied
// // List all databases using \l (or \list) (psql)

// List databases
// \l+
// Copy to clipboardErrorCopied
// // List all databases using \l+ with more details (including description, tablespace & DB size) (psql)

// Help on CREATE DATABASE command syntax
// \h CREATE DATABASE

// Create database
// CREATE DATABASE mytest;
// Copy to clipboardErrorCopied
// // Creates a new database ???mytest??? (SQL)

// By default, the owner of the database is the current login user.

// Create database
// \c test
// You are now connected to database "test" as user "postgres".
// Copy to clipboardErrorCopied
// // Connect to a PostgreSQL database ???test??? as ???postgres??? user (psql)

// Tables
// Show table
// \d TABLE_NAME
// Copy to clipboardErrorCopied
// Show table definition including indexes, constraints & triggers (psql)

// Show details
// \d+ TABLE_NAME
// Copy to clipboardErrorCopied
// // More detailed table definition including description and physical disk size (psql)

// List tables from current schema
// \dt
// Copy to clipboardErrorCopied
// // List tables from current schema (psql)

// List tables from all schemas
// \dt *.*
// Copy to clipboardErrorCopied
// // List tables from all schemas (psql)

// List tables for a schema
// \dt <name-of-schema>.*
// Copy to clipboardErrorCopied
// // List the tables in a specific schema (psql)

// Copy table data to CSV file
// \copy (SELECT * FROM __table_name__) TO 'file_path_and_name.csv' WITH CSV
// Copy to clipboardErrorCopied
// // Export a table as CSV (psql)

// Check indexes for a table using sql
// SELECT * FROM pg_indexes WHERE tablename='__table_name__' AND
// schemaname='__schema_name__';
// Copy to clipboardErrorCopied
// // Show table indexes (SQL)

// Collects statistics about the contents of tables
// ANALYZE [__table__]
// Copy to clipboardErrorCopied
// // Analyze a table and store the results in the pg_statistic system catalog (SQL)

// With no parameter, ANALYZE examines every table in the current database

// Adding comment on table/column
// Comment on table employee is 'Stores employee records';
// Copy to clipboardErrorCopied
// // Comment on table (SQL)

// Comment on column employee.ssn is 'Employee Social Security Number';
// Copy to clipboardErrorCopied
// // Comment on column (SQL)

// Approximate Table Row count / Table Cardinality
// SELECT reltuples AS card FROM pg_class WHERE relname = '<table_name>';
// Copy to clipboardErrorCopied
// // Use this to do fast (but not exact) counts from tables. Helpful if table has millions / billions of records and you just want estimated rows quickly. (SQL)

