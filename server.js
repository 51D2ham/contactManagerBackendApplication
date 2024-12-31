const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/db.Connection");
const dotenv = require("dotenv").config();


connectDb();
const app = express();

const port = process.env.PORT ||5002

// middlewares 
app.use(express.json());         // inbuilt middleware pass the data received from client (act as a parser) 
app.use("/api/contact", require("./routes/contactRoutes"))     //middleware for contacts 
app.use("/api/users", require("./routes/userRoutes"))     //middleware for users
app.use(errorHandler);     // its a costume middleware for error handling 


app.listen(port,() => {
    console.log(`server is listening at port ${port}`)
})