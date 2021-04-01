const express = require('express');
const app = express();

app.get('/dogs', function(request, response) {
    return response.send('Dogs go brk brk');
  });
  
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