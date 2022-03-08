<template>
  <div class="main" v-if="info">
    <div class="title">
      <h1>Toteat</h1>
      <h2>TestApp</h2>
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    <div class="nav-bar">
      <NavigationBar @change-component="changeComponent" />
    </div>
    <div v-if="component_value === 0" class="dash-container">
      <DashBoard
        v-if="info"
        :waiters="waiters"
        :cashiers="cashiers"
        :zones="zones"
        :food="all_food"
        :drinks="all_drinks"
        :info="info"
        :dates="dates"
      />
    </div>
    <div v-else-if="component_value === 1" class="dash-container">
      <allProducts v-if="info" :products="all_products" />
    </div>
    <div v-else-if="component_value === 2" class="dash-container">
      <allWorkers v-if="info" :waiters="waiters" :cashiers="cashiers" />
    </div>
    <div v-else-if="component_value === 3" class="dash-container">
      <zonesControl v-if="info" :info="info" />
    </div>
    <div v-else class="dash-container">
      <allSales v-if="info" :info="info" />
    </div>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationButtons.vue";
import DashBoard from "@/components/DashBoard.vue";
import allProducts from "@/components/allProducts.vue";
import allWorkers from "@/components/allWorkers.vue";
import zonesControl from "@/components/ZoneControl.vue";
import allSales from "@/components/allSales.vue";
// import sells from "../ventas.json";
import axios from "axios";

export default {
  name: "HomeView",
  data: function () {
    return {
      info: null,
      cashiers: {},
      waiters: {},
      all_products: {},
      all_food: {},
      all_drinks: {},
      zones: {},
      tables: {},
      all_payments: {},
      dates: [],
      component_value: 0,
    };
  },
  components: {
    NavigationBar,
    DashBoard,
    allProducts,
    allWorkers,
    zonesControl,
    allSales,
  },
  methods: {
    changeComponent(value) {
      this.component_value = value;
    },
    processedData(sells) {
      sells.forEach((element) => {
        // DATA CAJEROS
        if (!(element.cashier in this.cashiers)) {
          this.cashiers[element.cashier] = {
            totalSells: 0,
            WorkedDates: [],
          };
          element.payments.forEach((e) => {
            this.cashiers[element.cashier].totalSells += e.amount;
          }),
            this.cashiers[element.cashier].WorkedDates.push(
              element.date_closed
            );
        } else {
          element.payments.forEach((e) => {
            this.cashiers[element.cashier].totalSells += e.amount;
          }),
            this.cashiers[element.cashier].WorkedDates.push(
              element.date_closed
            );
        }
        // DATA GARZONES
        if (!(element.waiter in this.waiters)) {
          this.waiters[element.waiter] = {
            totalSells: 0,
            sellsAndTablesByCostumer: [],
            WorkedDates: [],
          };
          element.payments.forEach((e) => {
            this.waiters[element.waiter].totalSells += e.amount;
          }),
            this.waiters[element.waiter].sellsAndTablesByCostumer.push([
              element.date_opened,
              element.table,
            ]);
          this.waiters[element.waiter].WorkedDates.push(element.date_opened);
        } else {
          element.payments.forEach((e) => {
            this.waiters[element.waiter].totalSells += e.amount;
          }),
            this.waiters[element.waiter].sellsAndTablesByCostumer.push([
              element.date_opened,
              element.table,
            ]);
          this.waiters[element.waiter].WorkedDates.push(element.date_opened);
        }
        // DATA PRODUCTOS
        element.products.forEach((prod) => {
          if (!(prod.name in this.all_products)) {
            this.all_products[prod.name] = {
              category: prod.category,
              price: prod.price,
              totalConsumed: prod.quantity,
              totalConsumedByDate: [
                element.date_closed,
                prod.quantity,
                prod.price,
              ],
            };
          } else {
            this.all_products[prod.name].totalConsumed += prod.quantity;
            this.all_products[prod.name].totalConsumedByDate.push([
              element.date_closed,
              prod.quantity,
              prod.price * prod.quantity,
            ]);
          }
          // DATA PRODUCTOS: PLATO PRINCIPAL
          if (prod.category === "Plato Principal") {
            if (!(prod.name in this.all_food)) {
              this.all_food[prod.name] = {
                category: prod.category,
                price: prod.price,
                totalConsumed: prod.quantity,
                totalConsumedByDate: [
                  element.date_closed,
                  prod.quantity,
                  prod.price,
                ],
              };
            } else {
              this.all_food[prod.name].totalConsumed += prod.quantity;
              this.all_food[prod.name].totalConsumedByDate.push([
                element.date_closed,
                prod.quantity,
                prod.price * prod.quantity,
              ]);
            }
          }
          // DATA PRODUCTOS: TRAGOS
          if (prod.category === "Tragos") {
            if (!(prod.name in this.all_drinks)) {
              this.all_drinks[prod.name] = {
                category: prod.category,
                price: prod.price,
                totalConsumed: prod.quantity,
                totalConsumedByDate: [
                  element.date_closed,
                  prod.quantity,
                  prod.price,
                ],
              };
            } else {
              this.all_drinks[prod.name].totalConsumed += prod.quantity;
              this.all_drinks[prod.name].totalConsumedByDate.push([
                element.date_closed,
                prod.quantity,
                prod.price * prod.quantity,
              ]);
            }
          }
        });
        // DATA ZONAS
        if (!(element.zone in this.zones)) {
          this.zones[element.zone] = {
            totalRecurrence: 1,
            visitedByDate: [element.date_opened],
          };
        } else {
          this.zones[element.zone].totalRecurrence += 1;
          this.zones[element.zone].visitedByDate.push(element.date_opened);
        }
        // DATA MESAS
        if (!(element.table in this.tables)) {
          this.tables[element.table] = {
            totalRecurrence: 1,
            dinersAndStay: [
              [element.diners, element.date_opened, element.date_closed],
            ],
          };
        } else {
          this.tables[element.table].totalRecurrence += 1;
          this.tables[element.table].dinersAndStay.push([
            element.diners,
            element.date_opened,
            element.date_closed,
          ]);
        }
        // DATA PAGOS
        element.payments.forEach((pay) => {
          if (!(pay.type in this.all_payments)) {
            this.all_payments[pay.type] = {
              totalAmount: pay.amount,
            };
          } else {
            this.all_payments[pay.type].totalAmount += pay.amount;
          }
        });
        // DATA FECHAS
        this.dates.push(
          new Date(element.date_opened),
          new Date(element.date_closed)
        );
      });
    },
  },
  created() {
    const path = "https://toteat-test-backend.herokuapp.com/";
    axios
      .get(path)
      .then((res) => {
        this.info = res.data;
        this.processedData(this.info);
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style scoped>
.main {
  background-color: #f3f2f7;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.title {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 2% 0 2% 0;
  font-size: 50px;
}

.title h1 {
  font-weight: 700;
}

.title h2 {
  font-weight: 300;
}

.dash-container {
  height: 100%;
  margin: 0 3% 2% 3%;
  padding: 1%;
  align-content: center;
}

.home {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.navbar {
  width: 100%;
}

img {
  width: 4%;
  margin-left: 0.5%;
}
</style>
