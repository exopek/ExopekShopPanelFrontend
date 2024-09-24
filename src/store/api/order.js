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
            const apiBaseUrl = process.env.VUE_APP_API_URL;
            const response = await axios.get(`${apiBaseUrl}/api/dev/orders`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "https://brave-smoke-07a4fba03.5.azurestaticapps.net"
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
        async updateOrder(_, order) {
            console.log("test Order");
            console.log(order.id);
            const apiBaseUrl = process.env.VUE_APP_API_URL;
            const response = await axios.put(
                `${apiBaseUrl}/api/dev/orders/${order.id}?status=1`,
                null,  // Kein Request-Body nötig für Query-Parameter
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "https://brave-smoke-07a4fba03.5.azurestaticapps.net"
                    },
                }
            );
            console.log(response.status);
            if (!response.status === 200) {
                throw new Error("Something went wrong!");
            }
            const updatedOrder = await response.data;
            console.log(updatedOrder);
            
            return updatedOrder;
        },
    },
    getters: {
        allOrders(state) {
            return state.orders;
        },
    },
};