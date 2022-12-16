<script lang="ts">
  import { onMount } from "svelte";
  import { getProducts } from "../../firebase/routesProducts";
  import {
    getProductoByTienda,
    createVenta,
  } from "../../firebase/routesTienda";
  import { Producto } from "../../types/Producto";
  import type {
    ProductoTienda,
    Tienda,
    Venta,
    ItemLista,
  } from "../../types/Tienda";

  let idProducto = "";
  let nombre = "-";
  let precioVentaR = 0;
  let cantidad = 1;
  let total = 0;

  let venta: Venta = {
    idVenta: "",
    fecha: "",
    hora: "",
    nombreCliente: "-",
    deuda: 0,
    total: 0,
    lista: [],
  };

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

  const vender = () => {
    let fechaHora = new Date();

    venta.fecha =
      fechaHora.getDate() +
      "-" +
      fechaHora.getMonth() +
      "-" +
      fechaHora.getFullYear();
    venta.hora =
      fechaHora.getHours() +
      ":" +
      fechaHora.getMinutes() +
      ":" +
      fechaHora.getSeconds();
    venta.total = venta.lista
      .map((item) => item.total)
      .reduce((prev, curr) => prev + curr, 0);

    console.log(venta);
    createVenta("Wv26f1xfsB7DQOZipYuc", venta);
    alert("Venta hecha");
  };

  const onChange = () => {
    const index = productList
      .map((object) => object.idProducto)
      .indexOf(idProducto);

    nombre = productList[index].nombre;
    precioVentaR = productList[index].precioVentaR;
    total = productList[index].precioVentaR * cantidad;
  };

  const onChangeCantidad = () => {
    total = precioVentaR * cantidad;
  };

  function addRow() {
    let item: ItemLista = {
      cantidad: cantidad,
      idProducto: idProducto,
      nombreProducto: nombre,
      total: total,
    };

    console.log(nombre);

    venta.lista = [...venta.lista, item];

    const tbl = document.getElementById("table-resumen");
    const row = document.createElement("tr");
    //Producto
    const cellP = document.createElement("td");
    cellP.innerText = nombre;
    row.appendChild(cellP);

    //Precio Unidad
    const cellU = document.createElement("td");
    cellU.innerText = precioVentaR + "";
    row.appendChild(cellU);

    //Cantidad
    const cellC = document.createElement("td");
    cellC.innerText = cantidad + "";
    row.appendChild(cellC);

    //Total
    const cellT = document.createElement("td");
    cellT.innerText = total + "";
    row.appendChild(cellT);

    //Acción
    const cellAc = document.createElement("td");
    var butDelete = document.createElement("button");
    butDelete.innerHTML = "Delete";
    butDelete.onclick = function (butDelete: MouseEvent) {
      // var row = but.rowIndex;
      console.log(butDelete.path[2]);
      butDelete.path[2].remove();
    };
    cellAc.appendChild(butDelete);
    row.appendChild(cellAc);

    tbl.appendChild(row);
  }
</script>

<div>
  <div class="title">
    <h4 class="large-text">Venta con listado de producto</h4>
  </div>
  <div>
    <div class="content">
      <div class="ventas">
        <table id="table-venta">
          <thead>
            <td>Producto</td>
            <td>Precio Unitario</td>
            <td>Cantidad</td>
            <td>Total</td>
            <td>Acción</td>
          </thead>
          <tr>
            <td>
              <select
                bind:value={idProducto}
                name="razonSocial"
                on:change={onChange}
              >
                {#each productList as product}
                  <option value={product.idProducto}>{product.nombre}</option>
                {/each}
              </select>
            </td>
            <td>
              <input
                type="number"
                name="precioV"
                id="precioV"
                bind:value={precioVentaR}
                readonly
              />
            </td>
            <td>
              <input
                type="number"
                name="cantidad"
                id="cantidad"
                bind:value={cantidad}
                on:change={onChangeCantidad}
              />
            </td>

            <td>
              <input
                type="number"
                name="total"
                id="total"
                bind:value={total}
                readonly
              />
            </td>
            <td>
              <button on:click={addRow}>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 9V5M5 5V1M5 5H9M5 5H1"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </table>

        <br />
        <table id="table-resumen" />
      </div>

      <div class="buttons">
        <a class="btn2 button-text" href="/clients">Cancelar Venta</a>
        <button class="btn1" on:click={vender}
          ><p class="button-text">Registrar venta</p></button
        >
      </div>
    </div>
  </div>
</div>

<style>
  .title {
    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px 0px 0px 100px;
    gap: 10px;

    width: 100%;
  }

  .ventas {
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .ventas button {
    background-color: var(--secondary-500);
    padding: 8px 16px;

    border: solid 1px;
  }
  .ventas button:hover {
    background-color: var(--secondary-600);
  }

  #table-venta {
    background-color: var(--light);
    text-align: center;
  }
  #table-venta thead {
    background-color: var(--primary-300);
    font-weight: 500;
  }

  :global(#table-resumen tr td) {
    background-color: var(--light);
    font-weight: 500;
    padding: 8px 16px;
    min-width: 120px;

    text-align: center;
  }

  #table-venta td {
    padding: 4px 8px;
    border: 1px solid var(--dark);
  }

  .content {
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }

  .buttons {
    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0px;

    width: 100%;
  }
</style>
