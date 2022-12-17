<script lang="ts">
  import Chart from "chart.js/auto";
  import type { ChartConfiguration, ChartData, Plugin } from "chart.js/auto";
  import { onMount } from "svelte";
  import type { Venta } from "../../../types/Tienda";
  import { getVentaByTienda } from "../../../firebase/routesReportes";

  let ventasList: Venta[] = [];
  let result = new Map();

  type ChartConfigurationWithPlugins = ChartConfiguration & {
    options: {
      plugins: { [key: string]: unknown };
    };
  };

  let chart: HTMLCanvasElement;

  onMount(async () => {
    let dataTienda = (await getVentaByTienda("Wv26f1xfsB7DQOZipYuc")).forEach(
      (doc) => {
        let data = doc.data({ serverTimestamps: "estimate" }) as Venta;
        data["idVenta"] = doc.id;
        ventasList = [...ventasList, data];
      }
    );
    let labels2 = [""];
    ventasList.forEach((venta) => {
      let day = venta.fechaHora.toDate().getDate();
      let month = venta.fechaHora.toDate().getMonth() + 1;
      let year = venta.fechaHora.toDate().getFullYear();
      let key = `${day}-${month}-${year}`;

      let value = result.get(key);

      if (value) {
        let total = value + venta.total;
        result.set(key, total);
      } else {
        labels2.push(key);
        result.set(key, venta.total);
      }
    });

    let labels = labels2.slice(1);

    const matrixData = labels.map((label) => result.get(label));

    const data: ChartData = {
      labels: labels,
      datasets: [
        {
          label: "",
          data: matrixData,
          borderColor: "#20223b",
          // backgroundColor: "#fff",
        },
      ],
    };

    const customBackgroundPlugin: Plugin = {
      id: "customCanvasBackgroundColor",
      beforeDraw: (chart, args, options: { color: string }) => {
        const { ctx } = chart;
        ctx.save();
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = options.color || "#99ffff";
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      },
    };

    const config: ChartConfigurationWithPlugins = {
      type: "line",
      data: data,
      options: {
        elements: {
          line: {
            backgroundColor: "rgba(255, 0, 0, 0.3)",
          },
        },
        plugins: {
          customCanvasBackgroundColor: {
            color: "#DDCDE2",
          },
          percentageSuffix: {
            suffix: "%",
          },
          legend: {
            display: false,
          },
          filler: {
            propagate: false,
          },
        },
        interaction: {
          intersect: false,
        },
        layout: {
          padding: {
            // top: 16,
            // bottom: 16,
            left: 40,
            right: 40,
          },
        },
        scales: {
          r: {
            grid: {
              color: "#fff",
              circular: false,
            },
            pointLabels: {
              color: "#fff",
            },

            max: 100,
            min: 0,
          },
        },
      },
      plugins: [customBackgroundPlugin],
    };

    new Chart(chart, config);
  });
</script>

<div class="grafica">
  <h4>Ventas por día</h4>
  <canvas id="myChart" bind:this={chart} />
</div>

<style>
  .grafica {
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;
    border-style: dotted;
    border-radius: 1rem;
    padding: 2rem;
  }

  canvas {
    width: 400px;
    height: 300px;

    background-color: var(--primary-100);
  }
</style>
