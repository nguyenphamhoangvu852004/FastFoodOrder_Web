import { Request, Response } from "express-serve-static-core"
import mySqlInstance from "../configs/database.config"
import { ProductResponse } from "../types/response";
import { RowDataPacket } from "mysql2";

export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const mysql = await mySqlInstance();
    const [response] = await mysql.query<ProductResponse & RowDataPacket[]>(`
SELECT 
p.name AS 'Product Name',
    pc.value AS 'Category',
    s.value AS 'Size',
    pe.description AS 'Description',
    pe.unitPrice AS 'Price'
FROM product p
JOIN productEntry pe ON p.id = pe.productId
JOIN size s ON pe.sizeId = s.id
JOIN productCategory pc ON p.productCategoryId = pc.id
ORDER BY pc.value, p.name, s.id;
`)
    if ([response].length > 0) {
      res.status(201).json({
        success: true,
        data: response
      })
    } else throw Error;

  } catch (error) {
    res.status(400).json({
      success: false,
      mess: error
    })
  }
}

export const getAllPizza = async (req: Request, res: Response) => {

  try {
    const mysql = await mySqlInstance();
    const [response] = await mysql.query(`
SELECT p.id AS 'id',
    p.name AS 'Product Name',
    s.value AS 'Size',
    pe.description AS 'Description',
    pe.unitPrice AS 'Price'
FROM product p
JOIN productEntry pe ON p.id = pe.productId
JOIN size s ON pe.sizeId = s.id
JOIN productCategory pc ON p.productCategoryId = pc.id
WHERE pc.value = 'Pizza'
ORDER BY p.name, s.id;
`)
    if ([response].length > 0) {
      res.status(201).json({
        success: true,
        data: response
      })
    } else throw Error;

  } catch (error) {
    res.status(400).json({
      success: false,
      mess: error
    })
  }
}

export const getAllHamburger = async (req: Request, res: Response) => {
  try {
    const mysql = await mySqlInstance();
    const [response] = await mysql.query(`
SELECT p.id AS 'id',
    p.name AS 'Product Name',
    s.value AS 'Size',
    pe.description AS 'Description',
    pe.unitPrice AS 'Price'
FROM product p
JOIN productEntry pe ON p.id = pe.productId
JOIN size s ON pe.sizeId = s.id
JOIN productCategory pc ON p.productCategoryId = pc.id
WHERE pc.value = 'Hamburger'
ORDER BY p.name, s.id;
`)
    if ([response].length > 0) {
      res.status(201).json({
        success: true,
        data: response
      })
    } else throw Error;

  } catch (error) {
    res.status(400).json({
      success: false,
      mess: error
    })
  }
}

export const getAllDrink = async (req: Request, res: Response) => {
  try {
    const mysql = await mySqlInstance();
    const [response] = await mysql.query(`
SELECT p.id AS 'id',
    p.name AS 'Product Name',
    s.value AS 'Size',
    pe.description AS 'Description',
    pe.unitPrice AS 'Price'
FROM product p
JOIN productEntry pe ON p.id = pe.productId
JOIN size s ON pe.sizeId = s.id
JOIN productCategory pc ON p.productCategoryId = pc.id
WHERE pc.value = 'Drink'
ORDER BY p.name, s.id;
`)
    if ([response].length > 0) {
      res.status(201).json({
        success: true,
        data: response
      })
    } else throw Error;

  } catch (error) {
    res.status(400).json({
      success: false,
      mess: error
    })
  }
}
