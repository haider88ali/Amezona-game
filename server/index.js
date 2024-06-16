const express = require('express')
const cors = require('cors')
const app = express() 
const bodyParser = require('body-parser');
const authroute = require('./router/auth-routes')
const taskroute = require('./router/task-route');
const linkroute = require('./router/link-route');
const chargeroute = require('./router/charge-route');

const { connectDB, db } = require('./db/connection'); // Import connectDB function and db connection from db.js
const sequelize = require('./db/connection');

app.use(express.json())
app.use(bodyParser.urlencoded({ extended:false}))
app.use(bodyParser.json())
app.use(cors())

const PORT = process.env.PORT || 8080;




app.use("/api",authroute)
app.use("/api",taskroute)
app.use("/api",linkroute)
app.use("/api",chargeroute)

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
});
// app.post('/employees/create-employee', employeesController.createEmployee);
