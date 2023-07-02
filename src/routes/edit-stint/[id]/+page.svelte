<script lang="ts">
  import type { Stint } from '@prisma/client';
  import { getLocaleDateTimeStr } from '$lib/helper';

  export let data: { stint: Stint };

  const endDateStr = getLocaleDateTimeStr(data.stint.end as Date);

  function confirmDelete(event : Event) {

    // -> this should better be done by an additional server page
    // -> in case there is no javascript the entry will be deleted immediately!!

    // Prevent the default form submission
    event.preventDefault();

    if (confirm('Are you sure you want to delete this stint?')) {
      const f = document.getElementById('delete-form') as HTMLFormElement;
      f.submit();
    }
  }
</script>

<h2>Stint</h2>

<div class="form-box">
  <form action="?/updateStint" method="POST">
    <input type="hidden" name="stintId" value="{data.stint.id}" />
    <input type="text" name="comment" placeholder="Comment" value="{data.stint.comment}" />
    <input type="datetime-local" name="start" placeholder="Start" value="{getLocaleDateTimeStr(data.stint.start)}" />
    <input type="datetime-local" name="end" placeholder="End" value="{endDateStr}" />
    <button>SAVE</button>
  </form>
  <form action="?/deleteStint" method="POST" id="delete-form">
    <input type="hidden" name="stintId" value="{data.stint.id}" />
    <button on:click="{confirmDelete}">DELETE</button>
  <a href="/project-details/{data.stint.projectId}">Cancel</a>
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
