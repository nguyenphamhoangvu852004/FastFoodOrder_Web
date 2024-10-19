import e from "express";
import { getUserById, getUsers } from "../controllers/users.controller";
const router = e.Router()

router.get('/', getUsers)

router.get('/:id', getUserById)

export default router


