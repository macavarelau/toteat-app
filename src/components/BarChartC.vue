<script>
import { Bar } from "vue-chartjs";

export default {
  props: {
    info: Array,
  },
  extends: Bar,
  data() {
    return {
      chartData: {
        labels: ["Enero", "Febrero", "Marzo"],
        datasets: [
          {
            label: "Monto CLP",
            data: [0, 0, 0],
            fill: true,
            borderColor: "orange",
            backgroundColor: "rgba(255, 188, 57, 0.36)",
            borderWidth: 3,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                callback: function (value) {
                  return (
                    (value / 1e6).toLocaleString("es-CL", {
                      style: "currency",
                      currency: "CLP",
                    }) + " M"
                  );
                },
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
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
      if (new Date(e.date_opened).getMonth() === 0) {
        e.payments.forEach((i) => {
          this.chartData.datasets[0].data[0] += i.amount;
        });
      } else if (new Date(e.date_opened).getMonth() === 1) {
        e.payments.forEach((i) => {
          this.chartData.datasets[0].data[1] += i.amount;
        });
      } else if (new Date(e.date_opened).getMonth() === 2) {
        e.payments.forEach((i) => {
          this.chartData.datasets[0].data[2] += i.amount;
        });
      }
    });
    this.renderChart(this.chartData, this.options);
  },
};
</script>
