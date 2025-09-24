import type { CreateProductDto, Product } from "../types/products.ts";

let products: Product[] = [
  { id: 1, title: "tomato" },
  { id: 2, title: "cucumber" },
  { id: 3, title: "carrot" },
];

export const productsRepository = {
  getProducts(searchTitle: string): Product[] {
    if (searchTitle) {
      const searchedTitle = searchTitle.toString();
      const filteredProducts = products.filter((product) => product.title.indexOf(searchedTitle) !== -1);
      return filteredProducts;
    } else {
      return products;
    }
  },

  getProductById(id: number): Product | undefined {
    return products.find((product) => product.id === id);
  },

  createProduct(product: CreateProductDto): Product {
    const newProduct = { id: products.length + 1, title: product.title };
    products.push(newProduct);
    return newProduct;
  },

  updateProduct(id: number, product: CreateProductDto): Product | null {
    const targetProduct = products.find((product) => product.id === id);
    if (targetProduct) {
      const updatedProduct = { ...targetProduct, ...product };
      products = products.map((product) => product.id === id ? updatedProduct : product);
      return updatedProduct;
    }
    return null;
  },

  deleteProduct(id: number): Product | null {
    const targetProduct = products.find((product) => product.id === id);
    if (targetProduct) {
      products = products.filter((product) => product.id !== id);
      return targetProduct;
    }
    return null;
  },
};