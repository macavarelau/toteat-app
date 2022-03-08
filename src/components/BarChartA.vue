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
        labels: [
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
          "22:00",
          "23:00",
        ],
        datasets: [
          {
            label: "Monto total",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
      if (new Date(e.date_opened).getHours() === 11) {
        e.payments.forEach((i) => {
          this.chartData.datasets[0].data[0] += i.amount;
        });
      } else if (new Date(e.date_opened).getHours() === 12) {
        e.payments.forEach((i) => {
          this.chartData.datasets[0].data[1] += i.amount;
        });
      } else if (new Date(e.date_opened).getHours() === 13) {
        e.payments.forEach((i) => {
          this.chartData.datasets[0].data[2] += i.amount;
        });
      } else if (new Date(e.date_opened).getHours() === 14) {
        e.payments.forEach((i) => {
          this.chartData.datasets[0].data[3] += i.amount;
        });
      } else if (new Date(e.date_opened).getHours() === 15) {
        e.payments.forEach((i) => {
          this.chartData.datasets[0].data[4] += i.amount;
        });
      } else if (new Date(e.date_opened).getHours() === 16) {
        e.payments.forEach((i) => {
          this.chartData.datasets[0].data[5] += i.amount;
        });
      } else if (new Date(e.date_opened).getHours() === 17) {
        e.payments.forEach((i) => {
          this.chartData.datasets[0].data[6] += i.amount;
        });
      } else if (new Date(e.date_opened).getHours() === 18) {
        e.payments.forEach((i) => {
          this.chartData.datasets[0].data[7] += i.amount;
        });
      } else if (new Date(e.date_opened).getHours() === 19) {
        e.payments.forEach((i) => {
          this.chartData.datasets[0].data[8] += i.amount;
        });
      } else if (new Date(e.date_opened).getHours() === 20) {
        e.payments.forEach((i) => {
          this.chartData.datasets[0].data[9] += i.amount;
        });
      } else if (new Date(e.date_opened).getHours() === 21) {
        e.payments.forEach((i) => {
          this.chartData.datasets[0].data[10] += i.amount;
        });
      } else if (new Date(e.date_opened).getHours() === 22) {
        e.payments.forEach((i) => {
          this.chartData.datasets[0].data[11] += i.amount;
        });
      } else if (new Date(e.date_opened).getHours() === 23) {
        e.payments.forEach((i) => {
          this.chartData.datasets[0].data[12] += i.amount;
        });
      }
    });
    this.renderChart(this.chartData, this.options);
  },
};
</script>
