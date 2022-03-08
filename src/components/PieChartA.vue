<script>
import { Pie } from "vue-chartjs";

export default {
  props: {
    info: Array,
  },
  extends: Pie,
  data() {
    return {
      chartData: {
        labels: ["Salón", "Terraza", "VIP"],
        datasets: [
          {
            label: "Monto CLP",
            data: [0, 0, 0],
            fill: true,
            backgroundColor: ["#F5D7CF", "#754B3F", "#C2AAA3"],
            borderWidth: 3,
          },
        ],
      },
      options: {
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              var value = data.datasets[0].data[tooltipItem.index];
              return " " + value + " clientes";
            },
          },
        },
        legend: {
          display: true,
          position: "bottom",
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    this.info.forEach((e) => {
      if (e.zone === "Salón") {
        this.chartData.datasets[0].data[0] += e.diners;
      } else if (e.zone === "Terraza") {
        this.chartData.datasets[0].data[1] += e.diners;
      } else if (e.zone === "Vip") {
        this.chartData.datasets[0].data[2] += e.diners;
      }
    });
    this.renderChart(this.chartData, this.options);
  },
};
</script>
