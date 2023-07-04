<script lang="ts">
  import type { Project } from '@prisma/client';

  export let project: Project;
  export let strong = false;
  export let details = false;
  export let edit = false;

</script>

<div class="line">
  <div>
    <span class="project-color" style="background-color: {project.color}"></span>
    {#if strong}
      <strong>
        {project.name}
      </strong>
    {:else}
      {project.name}
    {/if}
  </div>
  <div class="project-link">
    {#if details}
      <a href="/project-details/{project.id}">Details</a>
    {/if}
    {#if edit}
      <a href="/edit-project/{project.id}">Edit</a>
    {/if}
  </div>
</div>

<style>
  .line {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    width: 100%;
  }
  .line div {
    display: flex;
    gap: 10px;
  }
  .project-color {
    width: 20px;
    height: 20px;
    border-radius: 5%;
  }
  .project-link {
    margin-left: auto;
  }
</style>
