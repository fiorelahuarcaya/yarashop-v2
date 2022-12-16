<script lang="ts">
  import IconDetail from "../svg/icon-detail.svelte";
  import Spinner from "../Spinner.svelte";
  import { onMount } from "svelte";
  import { getVentaByTienda } from "../../firebase/routesReportes";
  import type { Venta, ItemLista } from "../../types/Tienda";

  let ventasList: Venta[] = [];
  let today = new Date();
  let mes = today.getMonth() + 1;
  let anio = today.getFullYear();
  let result = new Map();

  const headers = ["N°", "Fecha", "Monto Ventas", "Detalle"];

  onMount(async () => {
    let dataTienda = (await getVentaByTienda("Wv26f1xfsB7DQOZipYuc")).forEach(
      (doc) => {
        let data = doc.data({ serverTimestamps: "estimate" }) as Venta;
        data["idVenta"] = doc.id;
        ventasList = [...ventasList, data];
      }
    );

    ventasList.forEach((venta) => {
      let day = venta.fechaHora.toDate().getDate();
      let month = venta.fechaHora.toDate().getMonth() + 1;
      let year = venta.fechaHora.toDate().getFullYear();
      let key = `${day}-${month}-${year}`;
      let value = result.get(key);

      if (value) {
        const total = value + venta.total;
        result.set(key, total);
      } else {
        result.set(key, venta.total);
      }
    });

    console.log(result);
  });

  const onChange = () => {
    result.forEach((element) => {
      element[0].fecha;
    });
  };
</script>

<div class="reporte-diario">
  <div class="header">
    <h4>Reporte del mes:</h4>
    <div class="fecha">
      <select name="mes" id="mes" on:change={onChange}>
        <option value="">{mes}</option>
        <option value="">{mes + 1}</option>
      </select>
      <select name="anio" id="anio" on:change={onChange}>
        <option value="">{anio}</option>
      </select>
    </div>
  </div>
  <div class="table-modificator" />

  {#if ventasList.length > 0}
    <table>
      <tr>
        {#each headers as head}
          <th>{head}</th>
        {/each}
      </tr>

      {#each [...result] as [key, value], i}
        <tr>
          <td>{i + 1}</td>
          <td>{key}</td>
          <td>{value}</td>
          <td><IconDetail /></td>
        </tr>
      {/each}
    </table>
  {:else}
    <Spinner />
  {/if}
</div>

<style>
  .reporte-diario {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 48px 32px;
    gap: 24px;
    background: var(--light);
  }

  .reporte-diario .header {
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 24px;
  }

  .reporte-diario .header .fecha {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 4px 16px;

    background-color: var(--primary-100);
    border-radius: 4px;

    font-family: "Raleway";
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 140%;
  }

  .reporte-diario h4 {
    color: var(--primary-900);
  }

  table td {
    text-align: center;
  }
</style>
