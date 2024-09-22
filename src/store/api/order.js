import axios from "axios";

export default {
    namespaced: true,
    state: {
        orders: [],
    },
    mutations: {
        setOrders(state, orders) {
            state.orders = orders;
        },
    },
    actions: {
        async getOrders() {
            const response = await axios.get("http://localhost:5136/api/dev/orders",
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
            const orders = await response.data;
            console.log(orders);
            
            return orders;
        },
    },
    getters: {
        allOrders(state) {
            return state.orders;
        },
    },
};