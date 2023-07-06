<script lang="ts">
  import ProjectLine from '$lib/ProjectLine.svelte';
  import OverviewChart from '$lib/OverviewChart.svelte';

  import type { ProjectWithStints } from '$lib/types';

  export let data: {
    projects: ProjectWithStints[]
  };

</script>

<h2>Projects</h2>

<OverviewChart projects={data.projects} />

<div class="projects-list">
  {#each data.projects as project}
    <div class="project">
      <ProjectLine project={project} details={true} edit={true} />
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
    border-bottom: 1px solid var(--color-in-border);
    padding-bottom: 10px;
  }

</style>
