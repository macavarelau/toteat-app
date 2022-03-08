<template>
  <div class="dashboard">
    <div class="main-info">
      <div class="medium-card">
        <img src="../assets/bistec.jpg" alt="" />
        <br />
        <b>{{ mostSoldPlate }}</b>
        <hr />
        <img src="../assets/cerveza.jpg" alt="" />
        <br />
        <b>{{ mostSoldDrink }}</b>
        <p>
          Plato principal y trago más <b style="color: orange">consumidos</b>
        </p>
      </div>
      <div class="small-container">
        <div class="small-card">
          <img src="../assets/mesero.jpg" alt="" />
          <br />
          <b>{{ mostProactiveWaiter }}</b>
          <p>Mesero más <b style="color: orange">proactivo</b></p>
        </div>
        <div class="small-card">
          <img src="../assets/salon.jpg" alt="" />
          <br />
          <b>{{ mostVisitedZone }}</b>
          <p>Zona más <b style="color: orange">demandada</b></p>
        </div>
      </div>
      <div class="chart-card">
        <div class="chart-title">
          <h2 v-if="chart_type === 0">Comensales <b>v/s</b> Hora</h2>
          <h2 v-else-if="chart_type === 1">Comensales <b>v/s</b> Día</h2>
          <h2 v-else-if="chart_type === 2">Comensales <b>v/s</b> Mes</h2>
          <h2 v-else-if="chart_type === 3">Ingresos <b>v/s</b> Día</h2>
          <h2 v-else-if="chart_type === 4">Ingresos <b>v/s</b> Día</h2>
          <h2 v-else>Ingresos <b>v/s</b> Día</h2>
          <b-dropdown aria-role="list" v-model="chart_type">
            <template #trigger="{ active }">
              <b-button :class="active ? 'menu-up' : 'menu-down'"
                >Seleccionar gráfico<font-awesome-icon
                  icon="fa-solid fa-angle-down"
              /></b-button>
            </template>

            <b-dropdown-item aria-role="listitem" :value="0"
              >Comensales v/s Hora</b-dropdown-item
            >
            <b-dropdown-item aria-role="listitem" :value="1"
              >Comensales v/s Día</b-dropdown-item
            >
            <b-dropdown-item aria-role="listitem" :value="2"
              >Comensales v/s Mes</b-dropdown-item
            >
            <b-dropdown-item aria-role="listitem" :value="3"
              >Ingresos v/s Hora</b-dropdown-item
            >
            <b-dropdown-item aria-role="listitem" :value="4"
              >Ingresos v/s Día</b-dropdown-item
            >
            <b-dropdown-item aria-role="listitem" :value="5"
              >Ingresos v/s Mes</b-dropdown-item
            >
          </b-dropdown>
        </div>
        <div v-if="chart_type === 0">
          <LineChartA :info="info" />
        </div>
        <div v-else-if="chart_type === 1">
          <LineChartB :info="info" />
        </div>
        <div v-else-if="chart_type === 2">
          <LineChartC :info="info" />
        </div>
        <div v-else-if="chart_type === 3">
          <BarChartA :info="info" />
        </div>
        <div v-else-if="chart_type === 4">
          <BarChartB :info="info" />
        </div>
        <div v-else>
          <BarChartC :info="info" />
        </div>
      </div>
    </div>
    <div class="bottom-info">
      <p>
        * La información presente en el dashboard implica datos del año 2019 del
        restaurant, desde
        {{ historicalMinDate }}
        hasta
        {{ historicalMaxDate }}
      </p>
      .
    </div>
  </div>
</template>

<script>
import LineChartA from "@/components/LineChartA.vue";
import LineChartB from "@/components/LineChartB.vue";
import LineChartC from "@/components/LineChartC.vue";
import BarChartA from "@/components/BarChartA.vue";
import BarChartB from "@/components/BarChartB.vue";
import BarChartC from "@/components/BarChartC.vue";
export default {
  name: "DashBoard",
  data() {
    return {
      chart_type: 0,
    };
  },
  props: {
    info: Array,
    waiters: Object,
    cashiers: Object,
    zones: Object,
    food: Object,
    drinks: Object,
    dates: Array,
  },
  components: {
    LineChartA,
    LineChartB,
    LineChartC,
    BarChartA,
    BarChartB,
    BarChartC,
  },
  computed: {
    mostProactiveWaiter() {
      return Object.keys(this.waiters).reduce((a, b) =>
        this.waiters[a].sellsAndTablesByCostumer.length >
        this.waiters[b].sellsAndTablesByCostumer.length
          ? a
          : b
      );
    },
    mostVisitedZone() {
      return Object.keys(this.zones).reduce((a, b) =>
        this.zones[a].totalRecurrence > this.zones[b].totalRecurrence ? a : b
      );
    },
    mostSoldPlate() {
      return Object.keys(this.food).reduce((a, b) =>
        this.food[a].totalConsumed > this.food[b].totalConsumed ? a : b
      );
    },
    mostSoldDrink() {
      return Object.keys(this.drinks).reduce((a, b) =>
        this.drinks[a].totalConsumed > this.drinks[b].totalConsumed ? a : b
      );
    },
    historicalMinDate() {
      return (
        new Date(Math.min.apply(null, this.dates)).getDate() +
        "-" +
        (parseInt(new Date(Math.min.apply(null, this.dates)).getMonth()) + 1) +
        "-" +
        new Date(Math.min.apply(null, this.dates)).getFullYear()
      );
    },
    historicalMaxDate() {
      return (
        new Date(Math.max.apply(null, this.dates)).getDate() +
        "-" +
        (parseInt(new Date(Math.max.apply(null, this.dates)).getMonth()) + 1) +
        "-" +
        new Date(Math.max.apply(null, this.dates)).getFullYear()
      );
    },
  },
  mounted() {},
};
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.main-info {
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.bottom-info {
  display: flex;
  justify-content: flex-start;
  margin-left: 10%;
  font-size: 10px;
}
.medium-card {
  height: 100%;
  margin: 1%;
  width: 14%;
  background-color: rgb(255, 255, 255);
  border-radius: 20px 20px 20px 20px;
  padding: 1%;
  box-shadow: 8px 1px 10px rgb(196, 196, 196);
}

.small-container {
  width: 14%;
  height: 100%;
  margin: 1%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.small-card {
  height: 47%;
  width: 100%;
  background-color: white;
  border-radius: 20px 20px 20px 20px;
  padding: 5%;
  box-shadow: 8px 1px 10px rgb(196, 196, 196);
}

.chart-card {
  height: 100%;
  margin: 1%;
  width: 50%;
  background-color: white;
  border-radius: 20px 20px 20px 20px;
  padding: 1% 3% 3% 3%;
  box-shadow: 8px 1px 10px rgb(196, 196, 196);
  display: flex;
  flex-direction: column;
}

.chart-title {
  height: 60%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 12%;
}

.chart-title svg {
  margin-left: 5%;
}

.chart-title h2 {
  font-size: 24px;
  font-weight: 400;
}

.medium-card img {
  width: 95%;
  height: 30%;
  border-radius: 20px;
}

.medium-card p {
  margin-top: 9%;
}

.small-card img {
  width: 95%;
  height: 75%;
  border-radius: 20px;
}

hr {
  margin: 5% 0 10% 0;
}

p {
  font-size: 12px;
}

.dropdown {
  text-align: left !important;
  height: 50% !important;
}
</style>
