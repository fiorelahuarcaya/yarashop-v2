<script lang="ts">
  import { onMount } from "svelte";
  import type { Producto } from "../../../types/Producto";
  import {
    getProductByID,
    editProduct,
  } from "../../../firebase/routesProducts";
  import Spinner from "../../Spinner.svelte";
  import { Proveedor } from "../../../types/Proveedor";
  import { getProveeByID } from "../../../firebase/routesProveedor";

  let idProducto = "";
  let nombre = "";
  let descripcion = "";
  let idSubcategoria = "";
  let precioCosto = 0;
  let precioVentaR = 0;
  let rucProvee = "";

  let productList: Producto[] = [];
  let proveeList: Proveedor[] = [];

  const actualizarProducto = () => {
    editProduct({
      idProducto,
      nombre,
      descripcion,
      idSubcategoria,
      precioCosto,
      precioVentaR,
      rucProvee,
    });

    alert("Producto Actualizado");
  };

  onMount(async () => {
    const url = new URL(location.href);
    const id = url.searchParams.get("id");
    console.log(id);

    let data = (await getProductByID(id)).data({
      serverTimestamps: "estimate",
    }) as Producto;
    data["idProducto"] = id;
    productList = [...productList, data];

    idProducto = data["idProducto"];
    nombre = data["nombre"];
    descripcion = data["descripcion"];
    idProducto = data["idProducto"];
    idSubcategoria = data["idSubcategoria"];
    precioCosto = data["precioCosto"];
    precioVentaR = data["precioVentaR"];
    rucProvee = data["rucProvee"];

    let dataProvee = (await getProveeByID(productList[0].rucProvee)).data({
      serverTimestamps: "estimate",
    }) as Proveedor;
    dataProvee["idProveedor"] = id;
    proveeList = [...proveeList, dataProvee];
  });
</script>

<!-- {#if false} -->
{#if productList.length > 0 && proveeList.length > 0}
  <div class="content">
    <div class="column">
      <div class="form">
        <h3 class="button-text">Información de proveedor</h3>
        <div class="form-product">
          <div class="input">
            <label for="razonSocial">Razón social:</label>
            <input
              type="text"
              id="razonSocial"
              name="razonSocial"
              value={proveeList[0].razonSocial}
              readonly
            />
          </div>
          <div class="input">
            <label for="pagina">Página:</label>
            <input
              type="text"
              id="pagina"
              name="pagina"
              value={proveeList[0].paginaProvee}
              readonly
            />
          </div>
          <div class="input">
            <label for="telefono">Teléfono:</label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={proveeList[0].telefonoProvee}
              readonly
            />
          </div>
          <div class="input">
            <label for="direccion">Dirección:</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={proveeList[0].direccionProvee}
              readonly
            />
          </div>
          <div class="input">
            <label for="ruc">RUC:</label>
            <input
              type="text"
              id="ruc"
              name="ruc"
              value={proveeList[0].rucProvee}
              readonly
            />
          </div>
        </div>
      </div>
    </div>

    <div class="column">
      <div class="form">
        <h3 class="button-text">Información del producto:</h3>
        <div class="form-product">
          <div class="input">
            <label for="barras">Código de Barras:</label>
            <input
              type="text"
              id="barras"
              name="barras"
              bind:value={idProducto}
              readonly
            />
          </div>
          <div class="input">
            <label for="categoria">Categoría:</label>
            <input
              type="text"
              id="categoria"
              name="categoria"
              bind:value={idSubcategoria}
            />
          </div>
          <div class="input">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" bind:value={nombre} />
          </div>
          <div class="input">
            <label for="descripcion">Descripcion:</label>
            <input
              type="text"
              id="descripcion"
              name="descripcion"
              bind:value={descripcion}
            />
          </div>
          <div class="input">
            <label for="costo">Precio de Costo:</label>
            <input
              type="number"
              id="costo"
              name="costo"
              min="0"
              bind:value={precioCosto}
            />
          </div>
          <div class="input">
            <label for="venta">Precio de Venta:</label>
            <input
              type="number"
              id="venta"
              name="venta"
              min="0"
              bind:value={precioVentaR}
            />
          </div>
        </div>
      </div>

      <div class="buttons">
        <a class="btn2 button-text" href="/admin/productos">Cancelar</a>
        <button class="btn1 button-text" on:click={actualizarProducto}
          >Actualizar producto</button
        >
      </div>
    </div>
  </div>
{:else}
  <Spinner />
{/if}

<style>
  .content {
    display: flex;
    flex-direction: row;
    gap: 32px;
  }

  .form {
    display: flex;
    flex-direction: column;
    padding: 32px;
    gap: 32px;
    min-width: 480px;

    background: var(--light);
    border-radius: 8px;
  }

  .form .button-text {
    color: var(--dark);
    padding-bottom: 16px;
    border-bottom: 1px solid;
  }

  .form .form-product {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .form-product .input {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .input input {
    width: 240px;
    padding: 2px;
  }

  .column .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    margin-top: 32px;
  }
</style>
