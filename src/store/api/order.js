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
        async getOrders(_, queryParameters) {
            const apiBaseUrl = process.env.VUE_APP_API_URL;
            const clientUrl = process.env.VUE_APP_CLIENT_URL;
            const shippedStatus = queryParameters.shippedStatus;
            const queryString = shippedStatus ? `?orderStatusType=${shippedStatus}` : "";
            const response = await axios.get(`${apiBaseUrl}/api/dev/orders${queryString}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": `${clientUrl}`,
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
        async syncOrders() {
            const apiBaseUrl = process.env.VUE_APP_API_URL;
            const clientUrl = process.env.VUE_APP_CLIENT_URL;
            const response = await axios.get(`${apiBaseUrl}/api/dev/syncorders`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": `${clientUrl}`,
                    },
                }
            );
            console.log(response.status);
            if (!response.status === 200) {
                throw new Error("Something went wrong!");
            }
            return true;
        },
        async updateOrder(_, order) {
            console.log("test Order");
            console.log(order.id);
            const apiBaseUrl = process.env.VUE_APP_API_URL;
            const clientUrl = process.env.VUE_APP_CLIENT_URL;
            const response = await axios.put(
                `${apiBaseUrl}/api/dev/orders/${order.id}?status=1`,
                null,  // Kein Request-Body nötig für Query-Parameter
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": `${clientUrl}`,
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
        async createOrder(_, order) {
            const apiBaseUrl = process.env.VUE_APP_API_URL;
            const clientUrl = process.env.VUE_APP_CLIENT_URL;
            console.log("test create ----- Order ------", order);
            const response = await axios.post(
                `${apiBaseUrl}/api/dev/orders`,
                order.order,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": `${clientUrl}`,
                    },
                }
            );
            console.log(response.status);
            if (!response.status === 200) {
                throw new Error("Something went wrong!");
            }
            const createdOrder = await response.data;
            console.log(createdOrder);
            
            return createdOrder;
        }
    },
    getters: {
        allOrders(state) {
            return state.orders;
        },
    },
};