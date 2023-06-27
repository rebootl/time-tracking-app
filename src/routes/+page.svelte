<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<h2>Stint</h2>

{#if data.lastStint}
<div class="form-box">
  <div>
    <div>
      Status:
      <em>
        {#if data.lastStint.end}Ended{:else}Running{/if}
      </em>
    </div>
    <div>Project: {data.lastStint.project.name}</div>
    <div>Start: {data.lastStint.start}</div>
    <div>End: {data.lastStint.end}</div>
    <div>Comment: {data.lastStint.comment}</div>
  </div>
  {#if !data.lastStint.end}
    <form action="?/endStint" method="POST">
      <input type="hidden" name="stintId" value="{data.lastStint.id}" />
      <button>[ END STINT ]</button>
    </form>
  {:else}
    <div>
      <form action="?/editStint" method="POST">
        <input type="hidden" name="stintId" value="{data.lastStint.id}" />
        <button>[ EDIT / DELETE ]</button>
      </form>
    </div>
  {/if}
</div>
{/if}

<h2>Projects</h2>

<div class="form-box">
  <form action="?/addStint" method="POST">
    <select name="projectId">
      {#each data.projects as project}
        <option value="{project.id}">{project.name}</option>
      {/each}
    </select>
    <div>
      <button>[ DETAILS ]</button>
      <button>[ EDIT / DELETE ]</button>
    </div>
    <input type="text" name="comment" placeholder="Comment for new stint" />
    {#if data.lastStint && !data.lastStint.end}
      <input type="hidden" name="lastStintId" value="{data.lastStint.id}" />
      <button>START NEW STINT<br>(Ends current)</button>
    {:else}
      <button>START NEW STINT</button>
    {/if}
  </form>
</div>

<h3>Add Project</h3>

<div class="form-box">
  <form action="?/addProject" method="POST">
    <input type="text" name="name" placeholder="Name" />
    <input type="text" name="description" placeholder="Description" />
    <input type="color" name="color" />
    <button type="submit">ADD</button>
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
