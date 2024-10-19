import { Router } from "express";
import { getAllDrink, getAllHamburger, getAllPizza, getAllProduct } from "../controllers/products.controller";

const productRoute: Router = Router();

// get all products
productRoute.get('/', getAllProduct)

productRoute.get('/pizzas', getAllPizza)

productRoute.get('/hamburgers', getAllHamburger)

productRoute.get('/drinks', getAllDrink)


export default productRoute



