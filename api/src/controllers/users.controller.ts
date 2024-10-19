import { Request, Response } from "express-serve-static-core";
import { User as UserRequest } from "../types/request";

export function getUsers(req: Request, res: Response) {
  res.send(`Get all users route access success`)
}

export function getUserById(req: Request, res: Response) {
  res.send(`Get user by id route access success`)
}

export function createUser(req: Request<UserRequest>, res: Response) {
  res.status(201).json({
    id: 1,
    username: `anson`,
    email: `Nkldsjafl@gmail.com`
  })


}
