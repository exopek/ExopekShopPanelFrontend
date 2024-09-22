<template>
    <div id="col-2">
        <table id="test">
        <thead>
            <tr>
                <th>Index</th>
                <th>Total</th>
                <th>Ordered At</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            
            <tr v-for="(order, index) in orders" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ order.total }}</td>
                <td>{{ formatOrderDate(order.createdAt) }}</td>
                <td>{{ order.status }}</td>
            </tr>
            
        </tbody>
    </table>

    <div id="col-3">
        <table id="test">
        <thead>
            <tr>
                <th>Index</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Change</th>
            </tr>
        </thead>
        <tbody>
            
            <tr v-for="(product, index) in products" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.quantity }}</td>
                <td>
                    <div id="col-2">
                        <input v-model="product.quantity">
                        <button @click="changeProduct(product)">Change</button>
                    </div>
                </td>
            </tr>
            
        </tbody>
    </table>
    </div>

    <div>
        <table id="test">
        <thead>
            <tr>
                <th>Index</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                
            </tr>
        </thead>
        <tbody>
            
            <tr v-for="(component, index) in components" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ component.name }}</td>
                <td>{{ component.price }}</td>
                <td>{{ component.quantity }}</td>
                
            </tr>
            
        </tbody>
    </table>
    </div>
    
    </div>
    
</template>

<script>

import Order from "../domain/models/Order";

export default {
    name: 'TestZone',
    data() {
        return {
            orders: [],
            products: [],
            components: []
        }
    },
    methods: {
        formatOrderDate(date) {
            return new Date(date).toLocaleDateString();
        },
        changeProduct(product) {
            console.log('changeProduct', product.id);
            this.$store.dispatch('product/updateProduct', {
                
                
                    id: product.id,
                    quantity: product.quantity
                
            });
        }
    },
    computed: {
        styleObject() {
            return {
                backgroundColor: 'green'
            }
        }
    },
    async created() {
        console.log('TestZone created');
        const result = await this.$store.dispatch({
            type: 'order/getOrders'
        });
        /* map to list to of orders */
        const mappedOrders = result.map((x) => {
                console.log(x);
                var order = new Order(
                    {
                        id: x.id,
                        createdAt: x.createdAt,
                        total: x.total,
                        status: x.status,
                    }
                );
                return order;
            }); 
        this.orders = mappedOrders;
        
        console.log('result', this.orders);

        const productResult = await this.$store.dispatch({
            type: 'product/getProducts'
        });

        this.products = productResult;

        const componentResult = await this.$store.dispatch({
            type: 'product/getComponents'
        });
        console.log('componentResult', componentResult);

        this.components = componentResult;
    },
    mounted() {
        console.log('TestZone mounted');
    }
}
</script>


<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ccc;
}

#test {
    width: 100%;
    font-family: Arial, sans-serif;
    background-color: rgb(157, 157, 157);
    border-collapse: collapse;
    border: 1px solid #2d2a2a;
}

th {
    background-color: #bd4949;
    padding: 8px;
}

td {
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #f9f9f9;
}

tr:hover {
    background-color: #e6e6e6;
}

#col-2 {
    float: left;
    width: 80%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    gap: 10px;
}

#col-3 {
    float: right;
    justify-content: space-between;
}
</style>