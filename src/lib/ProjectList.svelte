<script lang="ts">
  import ProjectRow from '$lib/ProjectRow.svelte';

  export let projects: {
    name: string;
    color: string;
    description: string;
  }[] = [];
</script>

<div class="projects-list">
  {#each projects as project}
    <div class="row">
      <div class="color" style="background-color: {project.color}"></div>
      <div>{project.name}</div>
      <div>{project.description}</div>
    </div>
  {/each}
</div>

<style>
  .projects-list {
    display: flex;
    flex-direction: column;
    max-height: 150px;
    overflow-y: scroll;
  }
  .row {
    display: flex;
    border: 1px solid var(--color-in-border);
  }
  .row div {
    border-right: 1px solid var(--color-in-border);
    padding: 10px;
  }
  .row div:last-child {
    border-right: none;
  }
  .color {
    width: 10px;
  }
</style>
