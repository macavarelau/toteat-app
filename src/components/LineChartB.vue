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
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes",
          "Sábado",
          "Domingo",
        ],
        datasets: [
          {
            label: "Flujo de comensales",
            data: [0, 0, 0, 0, 0, 0, 0],
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
      if (new Date(e.date_opened).getDay() === 1) {
        this.chartData.datasets[0].data[0] += e.diners;
      } else if (new Date(e.date_opened).getDay() === 2) {
        this.chartData.datasets[0].data[1] += e.diners;
      } else if (new Date(e.date_opened).getDay() === 3) {
        this.chartData.datasets[0].data[2] += e.diners;
      } else if (new Date(e.date_opened).getDay() === 4) {
        this.chartData.datasets[0].data[3] += e.diners;
      } else if (new Date(e.date_opened).getDay() === 5) {
        this.chartData.datasets[0].data[4] += e.diners;
      } else if (new Date(e.date_opened).getDay() === 6) {
        this.chartData.datasets[0].data[5] += e.diners;
      } else if (new Date(e.date_opened).getDay() === 0) {
        this.chartData.datasets[0].data[6] += e.diners;
      }
    });
    this.renderChart(this.chartData, this.options);
  },
};
</script>
