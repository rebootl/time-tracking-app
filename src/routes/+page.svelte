<script lang="ts">
  import type { PageData } from './$types';
  import dayjs from 'dayjs';

  export let data: PageData;

  function getTime(date: Date) {
    return dayjs(date).format('HH:mm');
  }

  function getDuration(start: Date, end: Date) {
    const duration = dayjs(end).diff(dayjs(start), 'second');
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;
    //console.log("get duration")
    //console.log(durationInterval)
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  let duration = "";
  let durationInterval : ReturnType<typeof setTimeout> | null = null;

  if (data.lastStint && !data.lastStint.end && !durationInterval) {
    durationInterval = setInterval(
      () => duration = getDuration(data.lastStint!.start, new Date()),
      1000
    );
  }

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
    <div>Start: {getTime(data.lastStint.start)}</div>
    {#if data.lastStint.end}
      <div>End: {getTime(data.lastStint.end)}</div>
      <div>Duration: {getDuration(data.lastStint.start, data.lastStint.end)}</div>
    {:else}
      <div>Duration: {duration}</div>
    {/if}
    <div>Comment: {data.lastStint.comment}</div>
  </div>
  {#if !data.lastStint.end}
    <form action="?/endStint" method="POST">
      <input type="hidden" name="stintId" value="{data.lastStint.id}" />
      <button>END STINT</button>
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

<h2>Projects</h2>

<div class="form-box">
  <form action="?/editProject" method="POST">
    <select name="projectId">
      {#each data.projects as project}
        <option value="{project.id}">{project.name}</option>
      {/each}
    </select>
    <div>
      <button>[ DETAILS ]</button>
      <button>EDIT / DELETE</button>
    </div>
  </form>
</div>

<h3>Add Project</h3>

<div class="form-box">
  <form action="?/addProject" method="POST">
    <input type="text" name="name" placeholder="Name" />
    <input type="text" name="description" placeholder="Description" />
    <input type="color" name="color" />
    <button>ADD</button>
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
