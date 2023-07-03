<script lang="ts">
  import type { PageData } from './$types';
  import { getTime, getDuration } from '$lib/helper';

  export let data: PageData;

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
    <div class="line">
      Project:&nbsp;
      <div class="project-color" style="background-color: {data.lastStint.project.color}"></div>
      {data.lastStint.project.name}
    </div>
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
      <a href="/edit-stint/{data.lastStint.id}">Edit / Delete Stint</a>
    </div>
  {/if}
</div>
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

<h2>Projects</h2>

<div class="projects-list">
  {#each data.projects as project}
    <div class="project">
      <div class="project-color" style="background-color: {project.color}"></div>
        {project.name}
        <div class="project-link">
          <a href="/project-details/{project.id}">Details</a>
          <a href="/edit-project/{project.id}">Edit</a>
        </div>
      <!--<a href="/edit-project/{project.id}">Edit</a>-->
    </div>
  {/each}
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
  .projects-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .project {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    border-bottom: 1px solid var(--color-in-border);
    padding-bottom: 10px;
  }
  .project-color {
    width: 20px;
    height: 20px;
    border-radius: 5%;
    margin-right: 10px;
  }
  .project-link {
    margin-left: auto;
  }
  .line {
    display: flex;
  }
</style>
