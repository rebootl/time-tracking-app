<script lang="ts">
  import type { Project, Stint } from '@prisma/client';
  import StintInfo from '$lib/StintInfo.svelte';
  import ProjectLine from '$lib/ProjectLine.svelte';
  import Chart from '$lib/Chart.svelte';

  export let data: {
    project: Project,
    stints: Stint[]
  };

  function getTotalDuration(stints : Stint[]) {
    let total_seconds = 0;
    for (const stint of stints) {
      if (!stint.end) {
        total_seconds += new Date().getTime() - new Date(stint.start).getTime();
      } else {
        total_seconds += new Date(stint.end).getTime() - new Date(stint.start).getTime();
      }
    }
    const hours = Math.floor(total_seconds / 1000 / 60 / 60);
    const minutes = Math.floor(total_seconds / 1000 / 60) % 60;
    const seconds = Math.floor(total_seconds / 1000) % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  let duration = "";
  let durationInterval : ReturnType<typeof setTimeout> | null = null;

  if (data.stints[0] && !data.stints[0].end && !durationInterval) {
    durationInterval = setInterval(
      () => duration = getTotalDuration(data.stints),
      1000
    );
  }

</script>

<h2>Project Details</h2>

<ProjectLine project={data.project} strong={true} edit={true} />

<div class="chart-box">
  <Chart stints={data.stints} project={data.project} />
</div>

<table>
  <tr>
    {#if data.project.description}
      <td>Description:</td>
      <td>{data.project.description}</td>
    {/if}
  </tr>
  <tr>
    <td>Total Duration:</td>
    {#if data.stints[0] && !data.stints[0].end}
      <td>{duration}</td>
    {:else}
      <td>{getTotalDuration(data.stints)}</td>
    {/if}
  </tr>
</table>

<!--<a href="/projects">Back</a>-->

<h3>Stints</h3>

{#each data.stints as stint}
  <StintInfo stint={stint} project={data.project} overview={false}/>
{/each}

<style>
  .chart-box {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }
  td:first-child {
    color: var(--text-color-light);
  }
</style>
