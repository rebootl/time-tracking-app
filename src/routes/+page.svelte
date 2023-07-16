<script lang="ts">
  import StintInfo from '$lib/StintInfo.svelte';

  export let data;

  //console.log(data.loggedIn);
</script>

<h2>Stint</h2>

{#if data.lastStint}
  <StintInfo stint={data.lastStint} project={data.lastStint.project} />
{/if}

<h3>New Stint</h3>

<div class="form-box">
  <form action="?/addStint" method="POST">
    <select name="projectId">
      {#each data.projects as project}
        <option value="{project.id}">{project.name}</option>
      {/each}
    </select>
    <input type="text" name="comment" placeholder="Comment for new stint" />
    {#if data.lastStint && !data.lastStint.end}
      <input type="hidden" name="lastStintId" value="{data.lastStint.id}" />
      <button>START NEW STINT<br>(Ends current)</button>
    {:else}
      <button>START NEW STINT</button>
    {/if}
  </form>
</div>

<style>
  .form-box {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .form-box form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
</style>
