import {Router} from "express";
import ProductManager from "../ProductManager.js";

const productsRouter = Router();
const PM = new ProductManager();

productsRouter.get("/", (req, res) => {
    const products = PM.getProducts();
    let {limit} = req.query;

    res.send({products:limit ? products.slice(0, limit) : products});
});

productsRouter.get("/:pid", (req, res) => {
    const products = PM.getProducts();
    let pid = Number(req.params.pid);
    
    res.send({product:products.find(item => item.id === pid) || "El ID de producto que buscas no se encuentra existente"});
});

productsRouter.post("/", (req, res) => {
    let {title, description, code, price, status, stock, category, thumbnails} = req.body;

    if (!title) {
        res.status(400).send({status:"error", message:"No fue posible cargar el campo Title"});
        return false;
    }

    if (!description) {
        res.status(400).send({status:"error", message:"No fue posible cargar el campo Description"});
        return false;
    }

    if (!code) {
        res.status(400).send({status:"error", message:"No fue posible cargar el campo Code"});
        return false;
    }

    if (!price) {
        res.status(400).send({status:"error", message:"No fue posible cargar el campo Price"});
        return false;
    }

    status = !status && true;

    if (!stock) {
        res.status(400).send({status:"error", message:"No fue posible cargar el campo Stock"});
        return false;
    }

    if (!category) {
        res.status(400).send({status:"error", message:"No fue posible cargar el campo Category"});
        return false;
    }

    if (!thumbnails) {
        res.status(400).send({status:"error", message:"Error! No fue posible cargar el campo Thumbnails"});
        return false;
    } else if ((!Array.isArray(thumbnails)) || (thumbnails.length == 0)) {
        res.status(400).send({status:"error", message:"Debes ingresar al menos una imagen en el Array Thumbnails"});
        return false;
    }

    if (PM.addProduct({title, description, code, price, status, stock, category, thumbnails})) {
        res.send({status:"ok", message:"El Producto fue agregado correctamente"});
    } else {
        res.status(500).send({status:"error", message:"No fue posible agregar el Producto"});
    }
});

productsRouter.put("/:pid", (req, res) => {
    let pid = Number(req.params.pid);
    let {title, description, code, price, status, stock, category, thumbnails} = req.body;

    if (!title) {
        res.status(400).send({status:"error", message:"No se cargó correctamente el campo Title"});
        return false;
    }

    if (!description) {
        res.status(400).send({status:"error", message:"No se cargó correctamente el campo Description"});
        return false;
    }

    if (!code) {
        res.status(400).send({status:"error", message:"No se cargó correctamente el campo Code"});
        return false;
    }

    if (!price) {
        res.status(400).send({status:"error", message:"No se cargó correctamente el campo Price"});
        return false;
    }

    status = !status && true;

    if (!stock) {
        res.status(400).send({status:"error", message:"No se cargó correctamente el campo Stock"});
        return false;
    }

    if (!category) {
        res.status(400).send({status:"error", message:"No se cargó correctamente el campo Category"});
        return false;
    }

    if (!thumbnails) {
        res.status(400).send({status:"error", message:"No se cargó correctamente el campo Thumbnails"});
        return false;
    } else if ((!Array.isArray(thumbnails)) || (thumbnails.length == 0)) {
        res.status(400).send({status:"error", message:"Debes ingresar al menos una imagen en el Array Thumbnails"});
        return false;
    }

    if (PM.updateProduct(pid, {title, description, code, price, status, stock, category, thumbnails})) {
        res.send({status:"ok", message:"El Producto fue actualizado correctamente"});
    } else {
        res.status(500).send({status:"error", message:"No fue posible actualizar el Producto"});
    }
});

productsRouter.delete("/:pid", (req, res) => {
    let pid = Number(req.params.pid);

    if (PM.deleteProduct(pid)) {
        res.send({status:"ok", message:"El Producto fue eliminado correctamente"});
    } else {
        res.status(500).send({status:"error", message:"No fue posible eliminar el Producto"});
    }
});

export default productsRouter;