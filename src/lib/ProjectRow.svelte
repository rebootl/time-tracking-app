<script lang="ts">
  export let project: {
    name: string;
    color: string;
    description: string;
  } = {
      name: "",
      color: "",
      description: ""
  };
</script>

<div class="row">
  <div>[ col ]</div>
  <div>{project.name}</div>
  <div>{project.description}</div>
</div>

<style>
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
</style>
