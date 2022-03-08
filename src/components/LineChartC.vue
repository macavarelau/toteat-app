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
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ],
        datasets: [
          {
            label: "Flujo de comensales",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
      if (new Date(e.date_opened).getMonth() === 0) {
        this.chartData.datasets[0].data[0] += e.diners;
      } else if (new Date(e.date_opened).getMonth() === 1) {
        this.chartData.datasets[0].data[1] += e.diners;
      } else if (new Date(e.date_opened).getMonth() === 2) {
        this.chartData.datasets[0].data[2] += e.diners;
      } else if (new Date(e.date_opened).getMonth() === 3) {
        this.chartData.datasets[0].data[3] += e.diners;
      } else if (new Date(e.date_opened).getMonth() === 4) {
        this.chartData.datasets[0].data[4] += e.diners;
      } else if (new Date(e.date_opened).getMonth() === 5) {
        this.chartData.datasets[0].data[5] += e.diners;
      } else if (new Date(e.date_opened).getMonth() === 6) {
        this.chartData.datasets[0].data[6] += e.diners;
      } else if (new Date(e.date_opened).getMonth() === 7) {
        this.chartData.datasets[0].data[7] += e.diners;
      } else if (new Date(e.date_opened).getMonth() === 8) {
        this.chartData.datasets[0].data[8] += e.diners;
      } else if (new Date(e.date_opened).getMonth() === 9) {
        this.chartData.datasets[0].data[9] += e.diners;
      } else if (new Date(e.date_opened).getMonth() === 10) {
        this.chartData.datasets[0].data[10] += e.diners;
      } else if (new Date(e.date_opened).getMonth() === 11) {
        this.chartData.datasets[0].data[11] += e.diners;
      }
    });
    this.renderChart(this.chartData, this.options);
  },
};
</script>
