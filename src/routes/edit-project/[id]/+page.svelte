<script lang="ts">
  import type { Project } from '@prisma/client';

  export let data: { project: Project };

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

<h2>Edit Project</h2>

<div class="form-box">
  <form action="?/updateProject" method="POST">
    <input type="hidden" name="projectId" value="{data.project.id}" />
    <input type="text" name="name" placeholder="Name" value="{data.project.name}" />
    <input type="text" name="description" placeholder="Description" value="{data.project.description}" />
    <input type="color" name="color" value="{data.project.color}" />
    <button formaction="?/updateProject">SAVE</button>
  </form>
  <form action="?/deleteProject" method="POST" id="delete-form">
    <input type="hidden" name="projectId" value="{data.project.id}" />
    <button on:click="{confirmDelete}">DELETE</button>
  </form>
  <a href="../">CANCEL</a>
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
