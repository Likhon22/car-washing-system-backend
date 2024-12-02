import express, { Request } from "express"
import cors from "cors"
export const app = express()

app.use(express.json())
app.use(cors())
app.get("/", (req: Request, res) => {
  res.send("Hello World!")
})
