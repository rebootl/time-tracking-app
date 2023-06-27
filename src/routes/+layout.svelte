<svelte:head>
	<title>Chronolog</title>
</svelte:head>

<script>
	import '../global.css';

  import AnalogClock from '$lib/AnalogClock.svelte';

  export let data;
  //console.log(data);
</script>

{#if !data.loggedIn}
  <div class="wrapper">
    <main class="login-main">
      <slot></slot>
    </main>
  </div>
{:else }
  <div class="wrapper">
    <header>
      <div class="clock-box">
        <AnalogClock />
      </div>
      <div class="logout-box">
        <form action="/logout" method="POST">
          <button type="submit">LOGOUT</button>
        </form>
      </div>
    </header>
    <main class="default-main">
      <slot></slot>
    </main>
  </div>
{/if}

<style>
  .wrapper {
    width: 100vw;
    min-height: 100vh;
  }
  .login-main {
    min-height: 100vh;
    background-color: var(--color-in-border);
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 15px;
  }
  header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-in-border);
  }
  .clock-box {
    width: 50px;
    height: 50px;
  }
  .default-main {
    background-color: var(--color-in-bg);
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 15px;
    min-height: calc(100vh - 50px);
  }
</style>
