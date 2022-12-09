<script lang="ts">
  import { onMount } from "svelte";
  import type { Producto } from "../../../types/Producto";
  import { createProduct } from "../../../firebase/routesProducts";
  import Spinner from "../../Spinner.svelte";
  import { Proveedor } from "../../../types/Proveedor";
  import { getProvee } from "../../../firebase/routesProveedor";
  import { getSubCat } from "../../../firebase/routesSubCat";
  import { SubCategoria } from "../../../types/SubCategoria";

  let idProducto = "";
  let nombre = "";
  let descripcion = "";
  let idSubcategoria = "";
  let precioCosto = 0;
  let precioVentaR = 0;

  let rucProvee = "";
  let direccionProvee = "";
  let paginaProvee = "";
  let telefonoProvee = "";

  let proveeList: Proveedor[] = [];
  let subCatList: SubCategoria[] = [];

  const addProduct = () => {
    createProduct({
      idProducto,
      nombre,
      descripcion,
      idSubcategoria,
      precioCosto,
      precioVentaR,
      rucProvee,
    });

    alert("Producto Creado");
  };

  const onChange = () => {
    const index = proveeList
      .map((object) => object.idProveedor)
      .indexOf(rucProvee);
    direccionProvee = proveeList[index].direccionProvee;
    paginaProvee = proveeList[index].paginaProvee;
    telefonoProvee = proveeList[index].telefonoProvee;
  };

  onMount(async () => {
    await getProvee((col) => {
      proveeList = [];
      col.docs.forEach((doc) => {
        let data = doc.data({ serverTimestamps: "estimate" }) as Proveedor;
        data["idProveedor"] = doc.id;
        proveeList = [...proveeList, data];
      });

      rucProvee = proveeList[0].rucProvee;
      direccionProvee = proveeList[0].direccionProvee;
      paginaProvee = proveeList[0].paginaProvee;
      telefonoProvee = proveeList[0].telefonoProvee;
    });

    /****************************************/

    await getSubCat((col) => {
      subCatList = [];
      col.docs.forEach((doc) => {
        let data = doc.data({ serverTimestamps: "estimate" }) as SubCategoria;
        data["idSubCategoria"] = doc.id;
        subCatList = [...subCatList, data];
      });

      idSubcategoria = subCatList[0].idSubCategoria;
    });
  });
</script>

<!-- {#if false} -->
{#if proveeList.length > 0}
  <div class="content">
    <div class="column">
      <div class="form">
        <h3 class="button-text">Información de proveedor</h3>
        <div class="form-product">
          <div class="input">
            <label for="razonSocial">Razón social:</label>
            <select
              bind:value={rucProvee}
              name="razonSocial"
              on:change={onChange}
            >
              {#each proveeList as provee}
                <option value={provee.idProveedor}>{provee.razonSocial}</option>
              {/each}
            </select>
          </div>
          <div class="input">
            <label for="pagina">Página:</label>
            <input
              type="text"
              id="pagina"
              name="pagina"
              bind:value={paginaProvee}
              readonly
            />
          </div>
          <div class="input">
            <label for="telefono">Teléfono:</label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              bind:value={telefonoProvee}
              readonly
            />
          </div>
          <div class="input">
            <label for="direccion">Dirección:</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              bind:value={direccionProvee}
              readonly
            />
          </div>
          <div class="input">
            <label for="ruc">RUC:</label>
            <input
              type="text"
              id="ruc"
              name="ruc"
              bind:value={rucProvee}
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
            <select bind:value={idSubcategoria} name="categoria">
              {#each subCatList as subCat}
                <option value={subCat.idSubCategoria}>{subCat.nombre}</option>
              {/each}
            </select>
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
        <button class="btn1 button-text" on:click={addProduct}
          >Añadir producto</button
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

  .input input,
  .input select {
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
