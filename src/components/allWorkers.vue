<template>
  <div class="container">
    <div class="table">
      <div class="table-title">GARZONES/AS</div>
      <b-table
        :data="dataA"
        :columns="columnsA"
        paginated
        per-page="6"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
        hoverable
      ></b-table>
    </div>
    <div class="table">
      <div class="table-title">CAJEROS/AS</div>
      <b-table
        :data="dataB"
        :columns="columnsB"
        paginated
        per-page="7"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
        hoverable
      ></b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "allProducts",
  props: {
    waiters: Object,
    cashiers: Object,
  },
  data() {
    return {
      dataA: [],
      columnsA: [
        {
          field: "name",
          label: "Nombre",
          searchable: true,
        },
        {
          field: "served_tables",
          label: "# Mesas Atendidas",
          searchable: true,
        },
        {
          field: "attention_amount",
          label: "Monto Total Atención",
          searchable: true,
        },
      ],
      dataB: [],
      columnsB: [
        {
          field: "name",
          label: "Nombre",
          searchable: true,
        },
        {
          field: "served_tables",
          label: "# Mesas Cobradas",
          searchable: true,
        },
        {
          field: "amount_charged",
          label: "Monto Total Cobrado",
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
    Object.keys(this.waiters).forEach((e) => {
      newDict["name"] = e;
      newDict["served_tables"] =
        this.waiters[e].sellsAndTablesByCostumer.length;
      newDict["attention_amount"] = formatter.format(
        this.waiters[e].totalSells
      );
      this.dataA.push(newDict);
      newDict = {};
    });
    let newDictB = {};
    Object.keys(this.cashiers).forEach((e) => {
      newDictB["name"] = e;
      newDictB["served_tables"] = this.cashiers[e].WorkedDates.length;
      newDictB["amount_charged"] = formatter.format(
        this.cashiers[e].totalSells
      );
      this.dataB.push(newDictB);
      newDictB = {};
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

.table-title {
  font-size: 20px;
  text-align: center;
  font-weight: 700;
  color: "orange";
  margin: 1%;
}

.table {
  height: 90%;
  margin: 1%;
  width: 48%;
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
