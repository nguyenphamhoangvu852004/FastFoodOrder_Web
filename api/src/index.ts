import express from "express";
import productRoute from "./routes/products.route";
import { Request, Response } from "express-serve-static-core"
const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send(`WELCOME TO FASTFOOD API ROUTE`)
})


app.use('/api/v1/products', productRoute)


app.use('/api/v1/products', productRoute)


app.use('/api/v1/products', productRoute)


app.use('/api/v1/products', productRoute)


export default app 
