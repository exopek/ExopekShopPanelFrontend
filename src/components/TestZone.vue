<template>
  <div>
    <div id="col-2">
      <Line :chartD="chartData" />
      <div>
        <table id="test">
        <thead>
          <tr>
            <th>Index</th>
            <th>Total</th>
            <th>Ordered</th>
            <th>wc-Status</th>
            <th>Sh-Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders.slice(0,8)" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ order.total }}</td>
            <td>{{ formatOrderDate(order.createdAt) }}</td>
            <td>{{ statusType(order.status) }}</td>
            <td v-if="order.shippedStatus === 2">
              <div id="col-3">
                <button @click="changeOrder(order)" style="background-color: cadetblue;">Ship</button>
              </div>
            </td>
            <td v-else>
              <div id="col-3">
                <p>Shipped</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
      
    </div>

    <div id="col-2">
      <table id="test">
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Add Product</th>
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
                <input v-model="productInputs[product.id]"/>
                <button @click="changeProduct(product)">Add</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

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
  </div>
</template>

<script>
import Order from "../domain/models/Order";
import Line from "./LineChart.vue";

export default {
  name: "TestZone",
  components: {
    Line,
  },
  data() {
    return {
      orders: [],
      products: [],
      components: [],
      addQuantity: 0,
      productInputs: {}
    };
  },
  methods: {
    changeOrder(order) {
        console.log("changeOrder", order.id);
        const orderUpdateResult = this.$store.dispatch("order/updateOrder", {
            id: order.id,
        });
        if (orderUpdateResult !== null) {
            console.log("orderUpdateResult", orderUpdateResult);
            this.init();
        }
    },
    async init() {
        const result = await this.$store.dispatch({
      type: "order/getOrders",
    });
    /* map to list to of orders */
    const mappedOrders = result.map((x) => {
      console.log(x);
      var order = new Order({
        id: x.id,
        createdAt: x.createdAt,
        total: x.total,
        status: x.status,
        shippedStatus: x.shippedStatus,
      });
      return order;
    });
    this.orders = mappedOrders;

    console.log("result", this.orders);

    const productResult = await this.$store.dispatch({
      type: "product/getProducts",
    });

    this.products = productResult;
    this.products.forEach((product) => {
      this.productInputs[product.id] = 0;
    });

    const componentResult = await this.$store.dispatch({
      type: "product/getComponents",
    });
    console.log("componentResult", componentResult);

    this.components = componentResult;
    },
    formatOrderDate(date) {
      return new Date(date).toLocaleDateString();
    },
    changeProduct(product) {
      console.log("changeProduct", product.id);
      const quantity = this.productInputs[product.id]
      const productUpdateResult = this.$store.dispatch("product/updateProduct", {
        id: product.id,
        quantity: quantity,
      });
      if (productUpdateResult !== null) {
        console.log("productUpdateResult", productUpdateResult);
        this.init();
      }
    },
    statusType(type) {
      if (type === 0) {
        return "Undefined";
      }
      if (type === 1) {
        return "Pending";
      }
      if (type === 2) {
        return "Processing";
      }
        if (type === 3) {
            return "OnHold";
        }
        if (type === 4) {
            return "Completed";
        }
        if (type === 5) {
            return "Cancelled";
        }
        if (type === 6) {
            return "Refunded";
        }
        if (type === 7) {
            return "Failed";
        }
      return "";
    },
    getMonthString(date) {
      if (date === 0) {
        return "January";
      }
      if (date === 1) {
        return "February";
      }
      if (date === 2) {
        return "March";
      }
      if (date === 3) {
        return "April";
      }
      if (date === 4) {
        return "May";
      }
      if (date === 5) {
        return "June";
      }
      if (date === 6) {
        return "July";
      }
      if (date === 7) {
        return "August";
      }
      if (date === 8) {
        return "September";
      }
      if (date === 9) {
        return "October";
      }
      if (date === 10) {
        return "November";
      }
      if (date === 11) {
        return "December";
      }
      return "";
    },
    lableAsMonth(datesArray) {
      var monthsStrings = [];
      console.log("datesArray", datesArray);
      datesArray.forEach((date) => {
        monthsStrings.push(this.getMonthString(date));
      });
      return monthsStrings;
    },
  },
  computed: {
    styleObject() {
      return {
        backgroundColor: "green",
      };
    },
    chartData() {
      const labels = this.orders
        .filter((x) => new Date(x.createdAt).getFullYear() === 2024)
        .map((x) => new Date(x.createdAt).getMonth());
      const distinctLabels = [...new Set(labels)];
      console.log("distinctLabels", distinctLabels);
      const countedEqualLabels = distinctLabels.map(
        (x) => labels.filter((y) => y === x).length
      );
      console.log("countedEqualLabels", countedEqualLabels);
      const labelsAsMonths = this.lableAsMonth(distinctLabels);
      console.log("labelsAsMonths", labelsAsMonths);
      return {
        labels: labelsAsMonths,
        datasets: [
          {
            label: "Orders",
            fill: false,
            borderColor: "#f87920",
            backgroundColor: "#f87920",
            tension: 0.1,
            data: countedEqualLabels,
          },
        ],
      };
    },
  },
  async created() {
    console.log("TestZone created");
    await this.init();
  },
  mounted() {
    console.log("TestZone mounted");
  },
};
</script>


<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #525050;
}

#test {
  width: 100%;
  font-family: Arial, sans-serif;
  background-color: rgb(60, 58, 58);
  border-collapse: collapse;
  border: 1px solid #2d2a2a;
  border-radius: 10px;
}

th {
  background-color: #bd4949;
  padding: 8px;
}

td {
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #504f4f;
}

tr:hover {
  background-color: #b35555;
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

.row {
  justify-content: space-between;
  flex-direction: row;
  gap: 10px;
}

.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(to bottom, #000000, #333333);
  color: white;
}
</style>