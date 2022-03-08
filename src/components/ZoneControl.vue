<template>
  <div class="container">
    <div class="medium-card">
      <div class="chart-title">
        <h3>Comensales <b>v/s</b> Zona</h3>
        <p>* Para los meses enero, febrero y marzo del año 2019.</p>
      </div>
      <PieChartA :info="info" />
    </div>
    <div class="medium-card">
      <div class="chart-title">
        <h3>Mesas <b>v/s</b> Zona</h3>
        <p>* Para los meses enero, febrero y marzo del año 2019.</p>
      </div>
      <PieChartB :info="info" />
    </div>
    <div class="medium-card">
      <div class="chart-title">
        <h3>Ingresos <b>v/s</b> Zona</h3>
        <p>* Para los meses enero, febrero y marzo del año 2019.</p>
      </div>
      <PieChartC :info="info" />
    </div>
  </div>
</template>

<script>
import PieChartA from "@/components/PieChartA.vue";
import PieChartB from "@/components/PieChartB.vue";
import PieChartC from "@/components/PieChartC.vue";
export default {
  name: "allSales",
  props: {
    info: Array,
  },
  components: {
    PieChartA,
    PieChartB,
    PieChartC,
  },
  data() {
    return {
      data: [],
      columns: [
        {
          field: "date",
          label: "Fecha",
          searchable: true,
        },
        {
          field: "zone",
          label: "Zona",
          searchable: true,
        },
        {
          field: "table",
          label: "Mesa",
          searchable: true,
        },
        {
          field: "diners",
          label: "Comensales",
          searchable: true,
        },
        {
          field: "waiter",
          label: "Garzon(a)",
          searchable: true,
        },
        {
          field: "amount",
          label: "Monto",
          searchable: true,
        },
      ],
    };
  },
  mounted() {
    var formatter = new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    });
    let newDict = {};
    this.info.forEach((element) => {
      newDict["date"] = element.date_closed.split(" ")[0];
      newDict["zone"] = element.zone;
      newDict["table"] = element.table;
      newDict["diners"] = element.diners;
      newDict["waiter"] = element.waiter;
      newDict["amount"] = 0;
      element.payments.forEach((i) => {
        newDict["amount"] += i.amount;
      });
      newDict["amount"] = formatter.format(newDict["amount"]);
      this.data.push(newDict);
      newDict = {};
    });
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
}

.medium-card {
  height: 90%;
  margin: 1%;
  width: 32%;
  background-color: rgb(255, 255, 255);
  border-radius: 20px 20px 20px 20px;
  padding: 2.5% 3% 3% 3%;
  box-shadow: 8px 1px 10px rgb(196, 196, 196);
}

.chart-title {
  margin-bottom: 8%;
}

.chart-title h3 {
  font-size: 20px;
}

.chart-title p {
  font-size: 9px;
}

.table {
  height: 90%;
  margin: 1%;
  width: 72%;
  background-color: white;
  border-radius: 20px 20px 20px 20px;
  padding: 2% 3% 2% 3%;
  box-shadow: 8px 1px 10px rgb(196, 196, 196);
  text-align: left;
}

.b-table .pagination-link .is-current {
  background-color: orange !important;
  border-color: orange !important;
}
</style>
