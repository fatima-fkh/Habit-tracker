require("dotenv").config()
const express = require("express")
const cors = require("cors")
const habitRouter = require("./routes/habitRoutes")

const app = express();
app.use(cors())
app.use(express.json())
app.use("/habits", habitRouter)


app.get("/", (req, res) => {
    res.json({ status: "ok" })
})


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Server running!!!")
});