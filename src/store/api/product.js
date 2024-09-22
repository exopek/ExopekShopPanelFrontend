import axios from "axios";

export default {
    namespaced: true,
    actions: {
        async getProducts() {
            const response = await axios.get("http://localhost:5136/api/dev/products",
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response.status);
            if (!response.status === 200) {
                throw new Error("Something went wrong!");
            }
            const products = await response.data;
            console.log(products);
            
            return products;
        },
        async updateProduct(_, product) {
            console.log("test Product");
            console.log(product.id);
            const response = await axios.put(
                `http://localhost:5136/api/dev/products/${product.id}?quantity=${product.quantity}`,
                null,  // Kein Request-Body nötig für Query-Parameter
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response.status);
            if (!response.status === 200) {
                throw new Error("Something went wrong!");
            }
            const updatedProduct = await response.data;
            console.log(updatedProduct);
            
            return updatedProduct;
        },
        async getComponents() {
            const response = await axios.get("http://localhost:5136/api/dev/components",
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response.status);
            if (!response.status === 200) {
                throw new Error("Something went wrong!");
            }
            const components = await response.data;
            console.log(components);
            
            return components;
        },
    },
};