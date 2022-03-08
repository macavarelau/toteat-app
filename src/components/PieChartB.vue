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
            backgroundColor: ["#F5E7C9", "#75633D", "#BFB49D"],
            borderWidth: 3,
          },
        ],
      },
      options: {
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              var value = data.datasets[0].data[tooltipItem.index];
              return " " + value + " mesas";
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
        this.chartData.datasets[0].data[0] += 1;
      } else if (e.zone === "Terraza") {
        this.chartData.datasets[0].data[1] += 1;
      } else if (e.zone === "Vip") {
        this.chartData.datasets[0].data[2] += 1;
      }
    });
    this.renderChart(this.chartData, this.options);
  },
};
</script>
