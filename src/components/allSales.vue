<template>
  <div class="container">
    <div class="table">
      <b-table
        :data="data"
        :columns="columns"
        paginated
        per-page="4"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      ></b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "allSales",
  props: {
    info: Array,
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
          field: "waiter",
          label: "Garzon(a)",
          searchable: true,
        },
        {
          field: "amount",
          label: "Monto",
          searchable: true,
        },
        {
          field: "payment_type",
          label: "Medio de Pago",
          searchable: true,
        },
        {
          field: "cashier",
          label: "Cajero(a)",
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
      newDict["date"] = element.date_closed;
      newDict["zone"] = element.zone;
      newDict["table"] = element.table;
      newDict["waiter"] = element.waiter;
      newDict["cashier"] = element.cashier;
      newDict["amount"] = 0;
      newDict["payment_type"] = "";
      element.payments.forEach((i) => {
        newDict["amount"] += i.amount;
        if (element.payments.indexOf(i) === element.payments.length - 1) {
          newDict["payment_type"] += i.type;
        } else {
          newDict["payment_type"] += i.type + ", ";
        }
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

/* .medium-card {
  height: 90%;
  margin: 1%;
  width: 24%;
  background-color: rgb(255, 255, 255);
  border-radius: 20px 20px 20px 20px;
  padding: 2.5% 3% 3% 3%;
  box-shadow: 8px 1px 10px rgb(196, 196, 196);
} */

/* .chart-title {
  margin: 0% 0% 10% 0%;
}

.chart-title h3 {
  font-size: 20px;
}

.chart-title p {
  margin-top: 5%;
  font-size: 9px;
} */

.table {
  height: 90%;
  margin: 1%;
  width: 100%;
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
