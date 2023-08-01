import {Router} from "express";
import CartManager from "../CartManager.js";

const cartsRouter = Router();
const CM = new CartManager();

cartsRouter.post("/", (req, res) => {
    if (CM.newCart()) {
        res.send({status:"ok", message:"Carrito creado correctamente"});
    } else {
        res.status(500).send({status:"error", message:"No fue posible crear el Carrito"});
    }
});

cartsRouter.get("/:cid", (req, res) => {
    const cid = Number(req.params.cid);
    const cart = CM.getCart(cid);

    if (cart) {
        res.send({products:cart.products});
    } else {
        res.status(400).send({status:"error", message:"No se encuentra el ID de Carrito"});
    }
});

cartsRouter.post("/:cid/products/:pid", (req, res) => {
    const cid = Number(req.params.cid);
    const pid = Number(req.params.pid);
    const cart = CM.getCart(cid);

    if (cart) {
        if (CM.addProductToCart(cid, pid)) {
            res.send({status:"ok", message:"Producto agregado correctamente"});
        } else {
            res.status(400).send({status:"error", message:"No fue posible agregar el producto al Carrito!"});
        }
    } else {
        res.status(400).send({status:"error", message:"No se encuentra el ID de Carrito"});
    }
});

export default cartsRouter;