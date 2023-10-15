var express = require('express');
var mongoose = require('mongoose')
var userRoutes = require("./routes/user.js")
var employeeRoutes = require("./routes/employee.js")


const SERVER_PORT = 8080
const DB_CONNECTION_STRING = "mongodb+srv://mustafaismailmab:mumu123@cluster0.kmefq4m.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority"
mongoose.connect(DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection;


db.on("connected", () => {
    console.log("Mongoose is connected")
});
db.on("error", (error) => {
    console.log(error)
});

var app = express();
var apiV1 = express();
app.use(express.json())
apiV1.use("/user", userRoutes)
apiV1.use("/emp", employeeRoutes)
app.use("/api/v1/", apiV1);


app.get("/api/v1", (req, res) =>{
  res.status(200).send('<h1>api/v1</h1>');
});

app.route("/")
    .get((req, res) => {
        res.send("<h1>COMP 3095 Assignment 1</h1>")
    })

app.listen(SERVER_PORT, () =>{
  console.log(`Server running at http://localhost:${SERVER_PORT}/`)
})
