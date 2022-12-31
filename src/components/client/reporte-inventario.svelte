<script lang="ts">
  import { onMount } from "svelte";
  import { getProductoByTienda } from "../../firebase/routesTienda";
  import type { ProductoTienda } from "../../types/Tienda";
  import Spinner from "../Spinner.svelte";
  import IconConfig from "../svg/icon-config.svelte";
  import IconDelete from "../svg/icon-delete.svelte";

  let productList: ProductoTienda[] = [];

  onMount(async () => {
    //TODO: Cambiar el estático
    let dataTienda = (
      await getProductoByTienda("Wv26f1xfsB7DQOZipYuc")
    ).forEach((doc) => {
      let data = doc.data({ serverTimestamps: "estimate" }) as ProductoTienda;
      data["idProducto"] = data.idProducto;
      productList = [...productList, data];
    });
  });

  const headers = [
    "N°",
    "Nombre",
    "Descripción",
    "Proveedor",
    "Costo",
    "Venta",
    "Cantidad",
    "Vendidos",
    "Acciones",
  ];
</script>

<div class="reporte-inventario">
  <div class="header">
    <h4>Reporte de Inventario</h4>
  </div>
  <!-- {#if false} -->
  {#if productList.length > 0}
    <table>
      <tr>
        {#each headers as head}
          <th>{head}</th>
        {/each}
      </tr>
      {#each productList as product, i}
        <tr>
          <td>{i + 1}</td>
          <td>{product.nombre}</td>
          <td>{product.descripcion}</td>
          <td>{product.rucProvee}</td>
          <td>S/. {product.precioCosto}</td>
          <td>S/. {product.precioVentaR}</td>
          <td>{product.cantidad}</td>
          <td>{product.vendidos}</td>
          <td>
            <button class="btn1"> <IconConfig /></button>
            <button class="btn2"><IconDelete /></button>
          </td>
        </tr>
      {/each}
    </table>
  {:else}
    <Spinner />
  {/if}
</div>

<style>
  .reporte-inventario {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 48px 32px;
    gap: 24px;
    background: var(--light);
  }

  .reporte-inventario .header {
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 24px;
  }

  .btn1,
  .btn2 {
    padding: 8px;
  }
</style>
