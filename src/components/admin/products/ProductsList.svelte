<script lang="ts">
  import { onMount } from "svelte";
  import type { Producto } from "../../../types/Producto";
  import { getProducts, deleteProduct } from "../../../firebase/routesProducts";
  import Spinner from "../../Spinner.svelte";
  import IconConfig from "../../svg/icon-config.svelte";
  import IconDelete from "../../svg/icon-delete.svelte";

  let productList: Producto[] = [];

  const actualizarProducto = (idProducto: string) => {
    const win: Window = window;
    win.location = `/admin/productos/actualizar?id=${idProducto}`;
  };

  const eliminarProducto = (idProducto: string) => {
    deleteProduct(idProducto);
    alert("Producto Eliminado");
  };

  onMount(async () => {
    await getProducts((col) => {
      productList = [];
      col.docs.forEach((doc) => {
        let data = doc.data({ serverTimestamps: "estimate" }) as Producto;
        data["idProducto"] = doc.id;
        productList = [...productList, data];
      });
    });
  });

  const headers = [
    "N°",
    "Nombre",
    "Descripción",
    "Proveedor",
    "Costo",
    "Venta",
    "Acciones",
  ];
</script>

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
        <td>
          <button
            class="btn1"
            on:click={actualizarProducto(product.idProducto)}
          >
            <IconConfig /></button
          >
          <button class="btn2" on:click={eliminarProducto(product.idProducto)}
            ><IconDelete /></button
          >
        </td>
      </tr>
    {/each}
  </table>
{:else}
  <Spinner />
{/if}

<style>
  .btn1,
  .btn2 {
    padding: 8px;
  }
</style>
