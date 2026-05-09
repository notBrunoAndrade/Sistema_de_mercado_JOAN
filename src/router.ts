import { Router } from "express";

import {
  createUser,
  getUsers,
  getUsersById,
  updateUser,
} from "./controllers/clientes";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "./controllers/produtos";
import { createSale, getSaleById, getSales } from "./controllers/venda";

const router = Router();

// ROTAS CLIENTES

router.post("/createUser", createUser);

router.get("/getUsers", getUsers);

router.get("/getUsers/:id", getUsersById);

router.put("/updateUser/:id", updateUser);

// ROTAS PRODUTOS

router.post("/createProduct", createProduct);

router.get("/getProducts", getProducts);

router.get("/getProducts/:id", getProductById);

router.put("/updateProduct/:id", updateProduct);

router.delete("/deleteProduct/:id", deleteProduct);

// ROTAS DE VENDA

router.post("/createSale", createSale);
router.get("/getSales", getSales);
router.get("/getSales/:id", getSaleById);


export default router;
