import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import chatbotRoutes from './routes/chatbot.route.js'
import cors from 'cors';
const app = express()
app.use(cors());

dotenv.config()

const port = process.env.PORT || 3000
app.use(express.json())

//Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Database Connected")
}).catch((error)=>{
    console.log(error.message)
}
)

//Defining ROutes
app.use('/bot/v1/',chatbotRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
