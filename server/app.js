import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'

import authRoutes from './routes/Auth.js'
import documentRoutes from "./routes/Document.js";

dotenv.config()

const app = express()
const PORT = 3000

const CONNECTION_URL = process.env.ATLAS_URL

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello Express!')
})

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/documents', documentRoutes)

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log('listening at port ' + PORT)))
    .catch((err) => console.log('error in connection with mongoDB = \n', err))