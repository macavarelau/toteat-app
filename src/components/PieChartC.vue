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
            backgroundColor: ["#C9D0F5", "#5F6378", "#9DA3BF"],
            borderWidth: 3,
          },
        ],
      },
      options: {
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              var value = data.datasets[0].data[tooltipItem.index];
              if (parseInt(value) >= 1000) {
                return (
                  " $" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                );
              } else {
                return " $" + value;
              }
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
        e.payments.forEach((i) => {
          this.chartData.datasets[0].data[0] += i.amount;
        });
      } else if (e.zone === "Terraza") {
        e.payments.forEach((i) => {
          this.chartData.datasets[0].data[1] += i.amount;
        });
      } else if (e.zone === "Vip") {
        e.payments.forEach((i) => {
          this.chartData.datasets[0].data[2] += i.amount;
        });
      }
    });
    this.renderChart(this.chartData, this.options);
  },
};
</script>
