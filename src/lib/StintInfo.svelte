<script lang="ts">
  import { getTime, getDate, getDuration } from '$lib/helper';
  import type { Stint, Project } from '@prisma/client';
    import ProjectLine from './ProjectLine.svelte';
  
  // to be super correct use this StintWithProject | Stint
  /*interface StintWithProject extends Stint {
    project: Project;
  }*/

  export let stint: Stint;
  // -> when is this null?
  export let project: Project | null = null;
  export let overview = true;

  let duration = "";
  let durationInterval : ReturnType<typeof setTimeout> | null = null;

  if (stint && !stint.end && !durationInterval) {
    durationInterval = setInterval(
      () => duration = getDuration(stint!.start, new Date()),
      1000
    );
  }

</script>

<div class="box" style={ !stint.end && project ? `border: 1px solid ${project.color}` : '' }>

  {#if overview && project}
    <ProjectLine project={project} strong={true} details={true} />
  {/if}

  <table>
    <tr>
      <td>Status:</td>
      <td>
        <em>
          {#if stint.end}Ended{:else}Running{/if}
        </em>
      </td>
    </tr>
    {#if stint.end}
      <tr>
        <td>Date:</td>
        <td>{getDate(stint.start)}</td>
      </tr>
      <tr>
        <td>Time:</td>
        <td>{getTime(stint.start)} - {getTime(stint.end)}</td>
      </tr>
      <tr>
        <td>Duration:</td>
        <td>{getDuration(stint.start, stint.end)}</td>
      </tr>
    {:else}
    <tr>
      <td>Start:</td>
      <td>{getTime(stint.start)}</td>
    </tr>
      <tr>
        <td>Duration:</td>
        <td>{duration}</td>
      </tr>
    {/if}
    {#if stint.comment}
      <tr>
        <td>Comment:</td>
        <td>{stint.comment}</td>
      </tr>
    {/if}
  </table>

<!--
  <div>
    <div>
      Status:
      <em>
        {#if stint.end}Ended{:else}Running{/if}
      </em>
    </div>
    {#if overview && project}
      <div class="line">
        Project:&nbsp;
        <div class="project-color" style="background-color: {project.color}"></div>
        {project.name}
      </div>
    {/if}
    <div>Start: {getTime(stint.start)}</div>
    {#if stint.end}
      <div>End: {getTime(stint.end)}</div>
      <div>Duration: {getDuration(stint.start, stint.end)}</div>
    {:else}
      <div>Duration: {duration}</div>
    {/if}
    <div>Comment: {stint.comment}</div>
  </div>
-->

  {#if !stint.end}
    <form action="/?/endStint" method="POST">
      <input type="hidden" name="stintId" value="{stint.id}" />
      <button>END STINT</button>
    </form>
  {:else}
    <div>
      <a href="/edit-stint/{stint.id}">Edit / Delete Stint</a>
    </div>
  {/if}

</div>

<style>
  .box {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    border: 1px solid var(--color-in-border);
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  td:first-child {
    color: var(--text-color-light);
  }
</style>
