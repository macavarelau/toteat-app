<script>
import { Line } from "vue-chartjs";

export default {
  props: {
    info: Array,
  },
  extends: Line,
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
            label: "Flujo de comensales",
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
        this.chartData.datasets[0].data[0] += e.diners;
      } else if (new Date(e.date_opened).getHours() === 12) {
        this.chartData.datasets[0].data[1] += e.diners;
      } else if (new Date(e.date_opened).getHours() === 13) {
        this.chartData.datasets[0].data[2] += e.diners;
      } else if (new Date(e.date_opened).getHours() === 14) {
        this.chartData.datasets[0].data[3] += e.diners;
      } else if (new Date(e.date_opened).getHours() === 15) {
        this.chartData.datasets[0].data[4] += e.diners;
      } else if (new Date(e.date_opened).getHours() === 16) {
        this.chartData.datasets[0].data[5] += e.diners;
      } else if (new Date(e.date_opened).getHours() === 17) {
        this.chartData.datasets[0].data[6] += e.diners;
      } else if (new Date(e.date_opened).getHours() === 18) {
        this.chartData.datasets[0].data[7] += e.diners;
      } else if (new Date(e.date_opened).getHours() === 19) {
        this.chartData.datasets[0].data[8] += e.diners;
      } else if (new Date(e.date_opened).getHours() === 20) {
        this.chartData.datasets[0].data[9] += e.diners;
      } else if (new Date(e.date_opened).getHours() === 21) {
        this.chartData.datasets[0].data[10] += e.diners;
      } else if (new Date(e.date_opened).getHours() === 22) {
        this.chartData.datasets[0].data[11] += e.diners;
      } else if (new Date(e.date_opened).getHours() === 23) {
        this.chartData.datasets[0].data[12] += e.diners;
      }
    });
    this.renderChart(this.chartData, this.options);
  },
};
</script>
