<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

</script>

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
</style>
