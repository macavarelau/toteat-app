<script>
import { Pie } from "vue-chartjs";

export default {
  props: {
    info: Object,
  },
  extends: Pie,
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            fill: true,
            backgroundColor: [
              "#E6AAA1",
              "#AE5446",
              "#9E756F",
              "#EB8373",
              "#7E5D58",
              "#E6BEA1",
              "#AE7346",
              "#9E836F",
              "#EBA773",
              "#806A59",
              "gray",
            ],
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
    let cont = 0;
    this.chartData.labels = Object.keys(this.info);
    Object.keys(this.info).forEach((e) => {
      this.chartData.datasets[0].data[cont] =
        this.info[e].totalConsumed * this.info[e].price;
      cont += 1;
    });
    this.renderChart(this.chartData, this.options);
  },
};
</script>
