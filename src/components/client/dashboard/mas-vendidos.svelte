<script lang="ts">
  import Chart from "chart.js/auto";
  import type { ChartConfiguration, ChartData, Plugin } from "chart.js/auto";
  import { onMount } from "svelte";
  import { getProductoByTienda } from "../../../firebase/routesTienda";
  import type { ProductoTienda } from "../../../types/Tienda";

  let productList: ProductoTienda[] = [];
  type ChartConfigurationWithPlugins = ChartConfiguration & {
    options: {
      plugins: { [key: string]: unknown };
    };
  };

  let chart: HTMLCanvasElement;

  function randomNumber() {
    return Math.floor(Math.random() * 100);
  }

  onMount(async () => {
    let labelsTemp = ["1"];
    let values = [1];
    //TODO: Cambiar el estático
    let dataTienda = (
      await getProductoByTienda("Wv26f1xfsB7DQOZipYuc")
    ).forEach((doc) => {
      let data = doc.data({ serverTimestamps: "estimate" }) as ProductoTienda;
      data["idProducto"] = doc.id;
      productList = [...productList, data];

      labelsTemp.push(data.nombre);
      values.push(data.vendidos);
    });

    const data: ChartData = {
      labels: labelsTemp.slice(1),
      datasets: [
        {
          label: "",
          data: values.slice(1),
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
      type: "bar",
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
            ticks: {
              // display: false,
              backdropColor: "#313359",
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
  <h4>Productos según ventas</h4>
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
