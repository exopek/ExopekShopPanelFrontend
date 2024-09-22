import { createStore } from "vuex";
import orderModul from "./api/order.js";
import productModul from "./api/product.js";

const store = createStore({
    modules: {
        order: orderModul,
        product: productModul  
    }
})

export default store;