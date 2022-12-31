<script>
  import { loginUser } from "../../firebase/authentication";

  import sha256 from "crypto-js/sha256";
  import hmacSHA512 from "crypto-js/hmac-sha512";
  import Base64 from "crypto-js/enc-base64";

  const privateKey = "1111111111111121211";

  let correo = "";
  let contra = "";

  function login() {
    const hashDigest = sha256(contra);
    const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, privateKey));
    loginUser(correo, hmacDigest);
  }
</script>

<h2>Inicia Sesión</h2>
<form action="/clients" class="form" method="post">
  <div class="input-RL">
    <label class="email" for="correo">Correo Electrónico</label>
    <input
      class="email"
      type="email"
      name="correo"
      id="correo"
      bind:value={correo}
    />
  </div>
  <div class="input-RL">
    <label class="text" for="contra">Contraseña</label>
    <input
      class="text"
      type="password"
      name="contra"
      id="contra"
      bind:value={contra}
    />
  </div>
  <button class="btn1 button-text" on:click={login}>Iniciar</button>
</form>

<div class="links">
  <div class="register">
    <p>¿No tienes una cuenta?</p>
    <a href="/registro" class="link-text">Regístrate</a>
  </div>
  <a href="">¿Olvidaste tu contraseña?</a>
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
  .links {
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    color: var(--text);
  }

  .links .register {
    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 8px;
  }
</style>
