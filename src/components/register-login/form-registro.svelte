<script>
  import { createUser } from "../../firebase/authentication";

  let correo = "";
  let contra = "";

  function continuar1() {
    const r1 = document.getElementsByClassName("r1");
    for (let i = 0; i < r1.length; i++) {
      r1[i].style.display = "none";
    }

    const r2 = document.getElementsByClassName("r2");

    for (let i = 0; i < r2.length; i++) {
      r2[i].style.display = "flex";
    }
  }

  function continuar2() {
    const r2 = document.getElementsByClassName("r2");

    for (let i = 0; i < r2.length; i++) {
      r2[i].style.display = "none";
    }

    const r3 = document.getElementsByClassName("r3");

    for (let i = 0; i < r3.length; i++) {
      r3[i].style.display = "flex";
    }
  }

  function registrar() {
    createUser(correo, contra);
  }
</script>

<div>
  <h2>Registro</h2>
</div>

<div class="form">
  <p class="bold-text">* Campos requeridos</p>
  <div class="inputs r1">
    <div class="input-RL">
      <label class="text" for="name">Nombre Completo</label>
      <input class="text" type="text" name="name" id="name" />
    </div>
    <div class="input-RL">
      <label class="text" for="email">Correo Electrónico</label>
      <input
        class="text"
        type="text"
        name="email"
        id="email"
        bind:value={correo}
      />
    </div>
    <div class="input-RL">
      <label class="text" for="telefono">Numero de Teléfono</label>
      <input class="text" type="text" name="telefono" id="telefono" />
    </div>
  </div>

  <div class="inputs r2">
    <div class="input-RL">
      <label class="text" for="direccion">Dirección</label>
      <input class="text" type="text" name="direccion" id="direccion" />
    </div>
    <div class="input-RL">
      <label class="text" for="pais">País</label>
      <input class="text" type="text" name="pais" id="pais" />
    </div>
    <div class="input-RL">
      <label class="text" for="pswd">Contraseña</label>
      <input
        class="text"
        type="password"
        name="pswd"
        id="pswd"
        bind:value={contra}
      />
    </div>

    <div class="input-RL">
      <label class="text" for="confirmoContra">Confirmar Contraseña</label>
      <input
        class="text"
        type="password"
        name="confirmoContra"
        id="confirmoContra"
      />
    </div>
  </div>

  <div class="inputs r3">
    <div class="input-RL">
      <label class="text" for="susc">Tipo de Suscripción</label>
      <input class="text" type="text" name="susc" id="susc" />
    </div>

    <div class="input-RL">
      <label class="text" for="razonSocial">Razón Social</label>
      <input class="text" type="text" name="razonSocial" id="razonSocial" />
    </div>
  </div>
</div>

<button on:click={continuar1} class="btn1 r1 ">
  <p class="button-text">Continuar</p>
</button>

<button on:click={continuar2} class="btn1 r2 ">
  <p class="button-text">Continuar</p>
</button>

<button on:click={registrar} class="btn1 r3 ">
  <p class="button-text">Registrar</p>
</button>

<div class="login">
  <p>¿Tienes una cuenta?</p>
  <a href="/login" class="link-text">Inicia Sesión</a>
</div>

<style>
  .form {
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
  }

  .input-RL {
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 8px;
  }

  input {
    width: 400px;
    background: #c4c4c4;
    opacity: 0.6;
    border-radius: 6px;
    padding: 12px;

    border: none;
    outline: none;
  }

  input:focus {
    border: solid var(--dark) 1px;
  }

  .inputs {
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
  }

  .r1 {
    display: flex;
  }

  .r2 {
    display: none;
  }

  .r3 {
    display: none;
  }

  .login {
    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 8px;

    color: var(--text);
  }
</style>
