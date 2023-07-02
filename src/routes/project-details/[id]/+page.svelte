<script lang="ts">
  import type { Project, Stint } from '@prisma/client';
  import { getDateTime, getDuration } from '$lib/helper';

  export let data: {
    project: Project,
    stints: Stint[]
  };

  function getTotalDuration(stints : Stint[]) {
    let total_seconds = 0;
    for (const stint of stints) {
      if (!stint.end) continue;
      total_seconds += new Date(stint.end).getTime() - new Date(stint.start).getTime();
    }
    const hours = Math.floor(total_seconds / 1000 / 60 / 60);
    const minutes = Math.floor(total_seconds / 1000 / 60) % 60;
    const seconds = Math.floor(total_seconds / 1000) % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  function confirmDelete(event : Event) {

    // -> this should better be done by an additional server page
    // -> in case there is no javascript the entry will be deleted immediately!!

    // Prevent the default form submission
    event.preventDefault();

    if (confirm('Are you sure you want to delete this project?')) {
      const f = document.getElementById('delete-form') as HTMLFormElement;
      f.submit();
    }
  }
</script>

<h2>Project Details</h2>

<div>Name: {data.project.name}</div>
{#if data.project.description}
  <div>Description: {data.project.description}</div>
{/if}
<div>Total Duration: {getTotalDuration(data.stints)}</div>
<a href="/">Back</a>

<h3>Stints</h3>

{#each data.stints as stint}
  <div class="form-box">
    <div>
      {#if !stint.end}
      <div>Status:<em> Running</em></div>
      {/if}
      <div>Start: {getDateTime(stint.start)}</div>
      {#if stint.end}
        <div>End: {getDateTime(stint.end)}</div>
        <div>Duration: {getDuration(stint.start, stint.end)}</div>
      {/if}
      <div>Comment: {stint.comment}</div>
      <a href="/edit-stint/{stint.id}">Edit</a>
    </div>
  </div>
{/each}

<style>
  .form-box {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  /*.form-box form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }*/
</style>
