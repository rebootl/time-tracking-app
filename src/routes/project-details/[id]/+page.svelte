<script lang="ts">
  import type { Project, Stint } from '@prisma/client';
  import StintInfo from '$lib/StintInfo.svelte';

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
  <StintInfo stint={stint} project={data.project} overview={false}/>
{/each}

<style>
  
</style>
