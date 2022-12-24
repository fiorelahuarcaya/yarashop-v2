<script lang="ts">
  import { onMount } from "svelte";
  import { getProductoByTienda } from "../../../firebase/routesTienda";
  import type { ProductoTienda } from "../../../types/Tienda";

  let productList: ProductoTienda[] = [];
  let ingresos = 0;
  let egresos = 0;
  let ganancia = 0;

  onMount(async () => {
    //TODO: Cambiar el estático
    let dataTienda = (
      await getProductoByTienda("Wv26f1xfsB7DQOZipYuc")
    ).forEach((doc) => {
      let data = doc.data({ serverTimestamps: "estimate" }) as ProductoTienda;
      data["idProducto"] = doc.id;
      productList = [...productList, data];

      ingresos += data.vendidos * data.precioVentaR;
      egresos += (data.vendidos + data.cantidad) * data.precioCosto;
    });

    ganancia = ingresos - egresos;
  });
</script>

<div class="indicadores">
  <div class="item-dash">
    <p class="number">S/.{ingresos}</p>
    <p>Ingresos</p>
  </div>
  <div class="item-dash">
    <p class="number">S/.{egresos}</p>
    <p>Egresos</p>
  </div>
  <div class="item-dash">
    <p class="number">S/.{ganancia}</p>
    <p>Ganancia</p>
  </div>
</div>

<style>
  .indicadores {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 24px;

    margin-bottom: 48px;
  }

  .item-dash {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 48px;
    gap: 32px;
    background-color: var(--primary-100);
    box-shadow: inset 0px -4px 8px rgba(0, 0, 0, 0.25);
    border-radius: 12px;

    min-width: 350px;
  }

  .item-dash .number {
    font-weight: 600;
    font-size: 48px;
    line-height: 140%;
  }
</style>
