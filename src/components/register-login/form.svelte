<script>
  import { createUser } from "../../firebase/authentication";

  import sha256 from "crypto-js/sha256";
  import hmacSHA512 from "crypto-js/hmac-sha512";
  import Base64 from "crypto-js/enc-base64";

  const privateKey = "1111111111111121211";

  let correo = "";
  let contra = "";

  function registrar() {
    const hashDigest = sha256(contra);
    const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, privateKey));
    console.log(hmacDigest);
    createUser(correo, hmacDigest);
  }
</script>

<div>
  <h2>Registro</h2>
</div>

<form action="/login" class="form" method="post">
  <div class="inputs r1">
    <div class="input-RL">
      <label class="text" for="name">Nombre Completo</label>
      <input
        class="text"
        type="text"
        name="name"
        id="name"
        pattern="^[a-zA-Z ]*$"
        maxlength="60"
        title="Solo se permiten letras"
      />
    </div>
    <div class="input-RL">
      <label class="email" for="email">Correo Electrónico</label>
      <input
        class="text"
        type="email"
        name="email"
        id="email"
        bind:value={correo}
      />
    </div>
    <div class="input-RL">
      <label class="text" for="telefono">Numero de Teléfono</label>
      <input
        class="text"
        type="text"
        name="telefono"
        id="telefono"
        pattern="^[0-9]*$"
        minlength="10"
        maxlength="60"
        title="Solo se permiten números"
      />
    </div>
  </div>

  <div class="inputs r2">
    <div class="input-RL">
      <label class="text" for="direccion">Dirección</label>
      <input
        class="text"
        type="text"
        name="direccion"
        id="direccion"
        minlength="10"
        maxlength="60"
        title="Solo se permiten números"
      />
    </div>
    <div class="input-RL">
      <label class="text" for="pais">País</label>
      <input
        class="text"
        type="text"
        name="pais"
        id="pais"
        pattern="^[a-zA-Z ]*$"
      />
    </div>
    <div class="input-RL">
      <label class="text" for="pswd">Contraseña</label>
      <input
        class="text"
        type="password"
        name="pswd"
        id="pswd"
        minlength="8"
        pattern="^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])$"
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
      <select name="susc" id="susc">
        <option value="FREE">FREE</option>
        <option value="PREMIUM">PREMIUM</option>
        <option value="PLUS PLUS">PLUS PLUS</option>
      </select>
    </div>

    <div class="input-RL">
      <label class="text" for="razonSocial">Razón Social</label>
      <input
        class="text"
        type="text"
        name="razonSocial"
        id="razonSocial"
        pattern="^[a-zA-Z ]*$"
        maxlength="60"
        title="Solo se permiten letras"
      />
    </div>
  </div>
  <input type="submit" value="Registrar" class="btn1 button-text" />
</form>

<div class="login">
  <p>¿Tienes una cuenta?</p>
  <a href="/login" class="link-text">Inicia Sesión</a>
</div>

<style>
  .form {
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: center;
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

  select,
  input[type="text"],
  input[type="password"],
  input[type="email"] {
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
  .login {
    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 8px;

    color: var(--text);
  }
</style>
