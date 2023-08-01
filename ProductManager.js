const ARCHIVO = "products.json";
const fs = require("fs");

class ProductManager {
  constructor() {
    this.products = [];
    this.path = ARCHIVO;
    this.automaticId = 1;
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      const existentCode = this.products.find((prod) => prod.code === code);
      if (existentCode) {
        return console.log(
          `El código ${code} ya se encuentra existente, y pertenece al producto ${existentCode.title}`
        );
      }
      const product = {
        id: this.automaticId++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      const existentId = this.products.find(
        (prod) => prod.id === this.automaticId
      );

      if (existentId) {
        return console.log(
          `Ya existe un producto con el id ${this.automaticId}`
        );
      }

      if (!title || !description || !price || !thumbnail || !code || !stock) {
        return console.log(`Complete todos los campos para continuar`);
      }

      this.products.push(product);
      console.log(
        `El producto ${product.title} se agregó correctamente`
      );

      let text = JSON.stringify(this.products, null, 2);

      fs.writeFileSync(ARCHIVO, text, (error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    try {
      return (this.products = readProducts(this.path));
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const existentProduct = this.products.find((prod) => prod.id === id);

      if (!existentProduct) {
        console.log(
          `Not Found`
        );
      } else {
        console.log(
          `El producto con el id ${id} se encuentra existente`
        );
        return existentProduct;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, fieldUpdate, newValue) {
    try {
      const product = this.products.find((prod) => prod.id === id);
      if (!product) {
        console.log(`El producto con el id ${id} no fue encontrado`);
        return;
      }

      product[fieldUpdate] = newValue;

      fs.writeFile(
        this.path,
        JSON.stringify(this.products, null, 2),
        (error) => {
          if (error) {
            console.log("Error al guardar los cambios en el archivo");
          } else {
            console.log(
              `El producto con el id ${id} fue actualizado correctamente`
            );
            console.log(product);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const productIndex = this.products.findIndex((prod) => prod.id === id);

      if (productIndex === -1) {
        console.log(
          `El producto con el id ${id} no se encuentra existente`
        );
        return;
      } else {
        console.log(
          `El id ${id} fue eliminado exitosamente`
        );
      }

      this.products.splice(productIndex, 1);

      fs.readFile(ARCHIVO, "utf-8", (error, data) => {
        if (error) {
          console.log("Ocurrió un error al leer el archivo");
        }

        let productsData = JSON.parse(data);

        productsData = this.products;
        const contenidoActualizado = JSON.stringify(productsData, null, 2);

        fs.writeFile(ARCHIVO, contenidoActualizado, (error) => {
          if (error) {
            console.log("Ocurrió un error al actualizar el archivo");
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}

async function readProducts(file) {
  try {
    const data = await fs.promises.readFile(file, "utf-8");
    const products = JSON.parse(data);
    return products;
  } catch (error) {
    console.log("Error al leer los archivos");
  }
}

module.exports = {ProductManager};