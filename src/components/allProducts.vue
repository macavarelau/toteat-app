<template>
  <div class="container">
    <div class="table">
      <b-table
        :data="data"
        :columns="columns"
        paginated
        per-page="7"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      ></b-table>
    </div>
    <div class="medium-card">
      <div class="chart-title">
        <h3>Productos más <b>solicitados</b></h3>
        <p>
          * Cantidad de veces pedidos en los meses de enero, febrero y marzo del
          2019.
        </p>
      </div>
      <div v-for="product in ranked" :key="product[0]" class="list">
        <span
          ><b>{{ ranked.indexOf(product) + 1 + ". " }}</b>
          <i>{{ product[0] }}</i
          >: {{ product[1] }} veces</span
        >
      </div>
    </div>
    <div class="medium-card">
      <div class="chart-title">
        <h3>Ingresos <b>v/s</b> Producto</h3>
      </div>
      <RadarChart :info="products" />
    </div>
  </div>
</template>

<script>
import RadarChart from "@/components/RadarChart.vue";
export default {
  name: "allProducts",
  props: {
    products: Object,
  },
  components: {
    RadarChart,
  },
  data() {
    return {
      data: [],
      columns: [
        {
          field: "category",
          label: "Categoría",
          searchable: true,
        },
        {
          field: "name",
          label: "Nombre Producto",
          searchable: true,
        },
        {
          field: "price",
          label: "Precio",
          searchable: true,
        },
      ],
      ranked: [],
    };
  },
  mounted() {
    var formatter = new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    });
    let newDict = {};
    Object.keys(this.products).forEach((e) => {
      newDict["category"] = this.products[e].category;
      newDict["name"] = e;
      newDict["price"] = formatter.format(this.products[e].price);
      this.data.push(newDict);
      newDict = {};
      this.ranked.push([e, this.products[e].totalConsumed]);
    });
    this.ranked.sort((a, b) => {
      return b[1] - a[1];
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

.table {
  height: 90%;
  margin: 1%;
  width: 46%;
  background-color: white;
  border-radius: 20px 20px 20px 20px;
  padding: 2% 3% 2% 3%;
  box-shadow: 8px 1px 10px rgb(196, 196, 196);
  text-align: left;
}

.medium-card {
  height: 90%;
  margin: 1%;
  width: 24%;
  background-color: rgb(255, 255, 255);
  border-radius: 20px 20px 20px 20px;
  padding: 2.5% 3% 3% 3%;
  box-shadow: 8px 1px 10px rgb(196, 196, 196);
}

.chart-title {
  margin: 0% 0% 10% 0%;
}

.chart-title h3 {
  font-size: 20px;
}

.chart-title p {
  margin-top: 3%;
  font-size: 9px;
}

.list {
  margin: 5%;
  display: flex;
  flex-direction: column;
  text-align: left;
  font-size: 14px;
}

.pagination-link.is-current {
  background-color: #d38c4a !important;
  border-color: #d38c4a !important;
  color: #fff;
}
</style>
