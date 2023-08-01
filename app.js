import express from "express";
import productsRouter from "./src/routes/products.router.js";
import cartsRouter from "./src/routes/carts.router.js";

const PORT = 8080;
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/products/", productsRouter);
app.use("/api/carts/", cartsRouter);

app.listen(PORT, () => {
  console.log(`Servidor conectado al puerto: http://localhost:${PORT}`);
});