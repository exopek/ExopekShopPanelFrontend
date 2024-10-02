<template>
  <div>
    <Dialog v-model:visible="visible" :style="{ width: '50vw' }" header="Create Order">
            <p>Customer Information</p>
            <div style="column-count: 1;">
                <label for="firstname">Firstname</label>
                <span style="margin-right: 10px;"></span>
                <InputText v-model="firstName" id="firstname" autocomplete="off" />
                <span style="margin-right: 10px;"></span>
                <label for="lastname">Lastname</label>
                <span style="margin-right: 10px;"></span>
                <InputText v-model="lastName" id="lastname" autocomplete="off" />
            </div>
            
            <div style="column-count: 1; margin-top: 10px;">
                <label for="email">Email</label>
                <span style="margin-right: 10px;"></span>
                <InputText v-model="email" id="email" autocomplete="off" />
                <span style="margin-right: 10px;"></span>
                <label for="phone">Phone</label>
                <span style="margin-right: 10px;"></span>
                <InputText v-model="phone" id="phone" autocomplete="off" />
            </div>
            
            <p>Billing Address</p>
            <div style="column-count: 1;">
                <label for="street">Street</label>
                <span style="margin-right: 10px;"></span>
                <InputText v-model="street" id="street" autocomplete="off" />
                <span style="margin-right: 10px;"></span>
                <label for="housenumber">HouseNumber</label>
                <span style="margin-right: 10px;"></span>
                <InputText v-model="houseNumber" id="housenumber" autocomplete="off" />
            </div>

            <div style="column-count: 1; margin-top: 10px;">
                <label for="postalcode">PostalCode</label>
                <span style="margin-right: 10px;"></span>
                <InputText v-model="postalCode" id="postalcode" autocomplete="off" />
                <span style="margin-right: 10px;"></span>
                <label for="city">City</label>
                <span style="margin-right: 10px;"></span>
                <InputText v-model="city" id="city" autocomplete="off" />
                
            </div>
            <div style="column-count: 1; margin-top: 10px;">
                <label for="state">State</label>
                <span style="margin-right: 10px;"></span>
                <InputText v-model="state" id="state" autocomplete="off" />
                <span style="margin-right: 10px;"></span>
                <label for="country">Country</label>
                <span style="margin-right: 10px;"></span>
                <InputText v-model="country" id="country" autocomplete="off" />
            </div>
            <p>Product Information</p>
            <div style="column-count: 1;">
                <label for="total">Total</label>
                <span style="margin-right: 10px;"></span>
                <InputText v-model="total" id="total" autocomplete="off" />
                <span style="margin-right: 10px;"></span>
                <label for="totaltax">Total Tax</label>
                <span style="margin-right: 10px;"></span>
                <InputText v-model="totalTax" id="totaltax" autocomplete="off" />
            </div>
            <div style="column-count: 1; margin-top: 10px;">
              <MultiSelect v-model="selectedProducts" display="chip" :options="productSelections" optionLabel="name" filter placeholder="Select Products"
              :maxSelectedLabels="3" class="w-full md:w-80" />
              <DataTable :value="selectedProducts" tableStyle="min-width: 50rem">
                <Column field="sku" header="Sku"></Column>
                <Column field="name" header="Name"></Column>
                
                <Column field="quantity" header="Quantity">
                  <template #body="slotProps">
                    <InputText v-model="slotProps.data.quantity" />
                  </template>
                </Column>
              </DataTable>
            </div>
            <div style="margin-top: 20px;">
              <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
              <span style="margin-right: 10px;"></span>
              <Button type="button" label="Save" @click="createOrder"></Button>
            </div>
        </Dialog>
        <header class="dashboard-header">
      <h1>Order Management System</h1>
      <nav>
        <a href="#">Dashboard</a>
        <a href="#">Orders</a>
        <a href="#">Products</a>
        <a href="#">Settings</a>
      </nav>
    </header>

    <main class="dashboard-main">
      <aside class="dashboard-sidebar">
        <Button @click="syncOrders" class="sidebar-button">Refresh Tasks</Button>
        <Button @click="visible = true" class="sidebar-button">Create Order</Button>
      </aside>

      <div class="dashboard-content">
        <section class="dashboard-section">
          <h2>Sales Overview</h2>
          <Chart
            class="chart-container"
            type="bar"
            :data="chartData"
            :options="ChartOptions"
          />
        </section>

        <section class="dashboard-section">
          <h2>Open Tasks</h2>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Total</th>
                  <th>Ordered</th>
                  <th>WC-Status</th>
                  <th>SH-Status</th>
                </tr>
              </thead>
              <tbody v-if="orderTasks.length !== 0">
                <tr v-for="(order, index) in orderTasks.slice(0, 10)" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ order.total }}</td>
                  <td>{{ formatOrderDate(order.createdAt) }}</td>
                  <td>{{ statusType(order.status) }}</td>
                  <td v-if="order.shippedStatus === 2">
                    <Button class="button" @click="changeOrder(order)">Shipped</Button>
                  </td>
                  <td v-else>
                    <p>Undefined</p>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="5">No open tasks</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="dashboard-section">
          <h2>Products</h2>
          <div class="table-container">
            <table>
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
                    <div class="add-product">
                      <InputText v-model="productInputs[product.id]" />
                      <Button class="button" @click="changeProduct(product)">Add</Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="dashboard-section">
          <h2>Components</h2>
          <div class="table-container">
            <table>
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
        </section>
      </div>
    </main>

    <footer class="dashboard-footer">
      <p>&copy; 2024 EXOPEK GmbH. All rights reserved.</p>
      <nav>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Contact Us</a>
      </nav>
    </footer>
  </div>
</template>

<script>
import Order from "../domain/models/Order";
import Button from "primevue/button";
import Chart from "primevue/chart";
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default {
  name: "TestZone",
  components: {
    Button,
    Chart,
    Dialog,
    InputText,
    MultiSelect,
    DataTable,
    Column,
  },
  data() {
    return {
      orders: [],
      orderTasks: [],
      products: [],
      components: [],
      addQuantity: 0,
      productInputs: {},
      visible: false,
      productSelections: [
        
      ],
      selectedProducts: null,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      street: "",
      houseNumber: "",
      postalCode: "",
      city: "",
      state: "",
      country: "",
      total: "",
      totalTax: "",
    };
  },
  methods: {
    createOrder() {
      console.log("createOrder");
      const newOrder = Order.orderReadDto({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNumber: this.phone,
        street: this.street,
        houseNumber: this.houseNumber,
        postalCode: this.postalCode,
        city: this.city,
        state: this.state,
        country: this.country,
        total: this.total,
        totalTax: this.totalTax,
        orderItems: this.selectedProducts,
      });
      console.log("newOrder", newOrder);
      const result = this.$store.dispatch("order/createOrder", {
        order: newOrder
      });
      this.visible = false;
      if (result !== null) {
        console.log("result", result);
        this.init();
      }
    },
    syncOrders() {
      console.log("syncOrders");
      const result = this.$store.dispatch("order/syncOrders");
      if (result !== null) {
        console.log("result", result);
        this.init();
      }
    },
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

      const orderTaskResult = await this.$store.dispatch(
        "order/getOrders", {
          shippedStatus: 2,
        }
      );

      const mappedOrderTasks = orderTaskResult.map((x) => {
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

      this.orderTasks = mappedOrderTasks;

      const productResult = await this.$store.dispatch({
        type: "product/getProducts",
      });

      this.products = productResult;
      this.products.forEach((product) => {
        this.productInputs[product.id] = 0;
      });

      this.productSelections = productResult.map((x) => {
        return { name: x.name, sku: x.sku };
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
      const quantity = this.productInputs[product.id];
      const productUpdateResult = this.$store.dispatch(
        "product/updateProduct",
        {
          id: product.id,
          quantity: quantity,
        }
      );
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
  watch: {
    visible(val) {
      if (val) {
        // scroll lock
        document.body.style.overflow = "auto";
      }
    },
  },
  computed: {
    styleObject() {
      return {
        backgroundColor: "green",
      };
    },
    ChartOptions() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue("--p-text-color");
      const textColorSecondary = documentStyle.getPropertyValue(
        "--p-text-muted-color"
      );
      const surfaceBorder = documentStyle.getPropertyValue(
        "--p-content-border-color"
      );

      return {
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
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
.dashboard-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(to bottom, #000000, #333333);
  color: white;
}

.dashboard-header, .dashboard-footer {
  background-color: #1a1a1a;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-header h1 {
  margin: 0;
  font-size: 1.5rem;
}

.dashboard-header nav, .dashboard-footer nav {
  display: flex;
  gap: 1rem;
}

.dashboard-header a, .dashboard-footer a {
  color: white;
  text-decoration: none;
}

.dashboard-header a:hover, .dashboard-footer a:hover {
  text-decoration: underline;
}

.dashboard-main {
  display: flex;
  flex: 1;
  padding: 1rem;
}

.dashboard-sidebar {
  width: 200px;
  padding-right: 1rem;
}

.sidebar-button {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
}

.dashboard-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.dashboard-section {
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 1rem;
}

.chart-container {
  height: 300px;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #525050;
}

th {
  background-color: #bd4949;
  padding: 8px;
  text-align: left;
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

.add-product {
  display: flex;
  gap: 10px;
}

.button {
  padding: 10px 24px;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .dashboard-main {
    flex-direction: column;
  }

  .dashboard-sidebar {
    width: 100%;
    padding-right: 0;
    margin-bottom: 1rem;
  }

  .sidebar-button {
    display: inline-block;
    width: auto;
    margin-right: 1rem;
  }

  .dashboard-header, .dashboard-footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .dashboard-header nav, .dashboard-footer nav {
    margin-top: 1rem;
  }
}
</style>