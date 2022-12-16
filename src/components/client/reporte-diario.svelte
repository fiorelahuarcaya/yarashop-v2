<script lang="ts">
  import IconCalendar from "../svg/icon-calendar.svelte";
  import Spinner from "../Spinner.svelte";
  import { onMount } from "svelte";
  import { getVentaByTienda } from "../../firebase/routesReportes";
  import type { Venta, ItemLista } from "../../types/Tienda";

  let ventasList: Venta[] = [];
  let today = new Date();
  let fecha =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  const headers = [
    "N°",
    "Boleta",
    "Cliente/Productor",
    "Monto",
    "En deuda",
    "Hora",
    "Detalle",
  ];

  onMount(async () => {
    //TODO: Cambiar el estático
    let dataTienda = (await getVentaByTienda("Wv26f1xfsB7DQOZipYuc")).forEach(
      (doc) => {
        let data = doc.data({ serverTimestamps: "estimate" }) as Venta;
        data["idVenta"] = doc.id;
        
        if()
        ventasList = [...ventasList, data];
      }
    );
  });
</script>

<div class="reporte-diario">
  <div class="header">
    <h4>Reporte del día:</h4>
    <div class="fecha">
      <span>{fecha}</span>
      <IconCalendar />
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

      {#each ventasList as venta, i}
        <tr>
          <td>{i + 1}</td>
          <td>{venta.idVenta}</td>
          <td>{venta.nombreCliente}</td>
          <td> S/. {venta.total}</td>
          <td>S/. {venta.deuda}</td>
          <td>{venta.fechaHora}</td>
          <td
            ><svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.5 15H1.5C0.671562 15 0 14.3284 0 13.5V2.5C0 1.67156 0.671562 1 1.5 1H14.5C15.3284 1 16 1.67156 16 2.5V13.5C16 14.3284 15.3284 15 14.5 15ZM4 3.75C3.30966 3.75 2.75 4.30966 2.75 5C2.75 5.69034 3.30966 6.25 4 6.25C4.69034 6.25 5.25 5.69034 5.25 5C5.25 4.30966 4.69034 3.75 4 3.75ZM4 6.75C3.30966 6.75 2.75 7.30966 2.75 8C2.75 8.69034 3.30966 9.25 4 9.25C4.69034 9.25 5.25 8.69034 5.25 8C5.25 7.30966 4.69034 6.75 4 6.75ZM4 9.75C3.30966 9.75 2.75 10.3097 2.75 11C2.75 11.6903 3.30966 12.25 4 12.25C4.69034 12.25 5.25 11.6903 5.25 11C5.25 10.3097 4.69034 9.75 4 9.75ZM13 5.5V4.5C13 4.29291 12.8321 4.125 12.625 4.125H6.375C6.16791 4.125 6 4.29291 6 4.5V5.5C6 5.70709 6.16791 5.875 6.375 5.875H12.625C12.8321 5.875 13 5.70709 13 5.5ZM13 8.5V7.5C13 7.29291 12.8321 7.125 12.625 7.125H6.375C6.16791 7.125 6 7.29291 6 7.5V8.5C6 8.70709 6.16791 8.875 6.375 8.875H12.625C12.8321 8.875 13 8.70709 13 8.5ZM13 11.5V10.5C13 10.2929 12.8321 10.125 12.625 10.125H6.375C6.16791 10.125 6 10.2929 6 10.5V11.5C6 11.7071 6.16791 11.875 6.375 11.875H12.625C12.8321 11.875 13 11.7071 13 11.5Z"
                fill="#8F589F"
              />
            </svg>
          </td>
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
    gap: 8px;
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
