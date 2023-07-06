<script lang="ts">
  import Chart from 'chart.js/auto';
  import type { Project, Stint } from '@prisma/client';
  import dayjs from 'dayjs';
  import { onMount } from 'svelte';

  export let stints : Stint[] = [];
  export let project : Project;

  //console.log(stints);

  export let endDate : Date = new Date();
  // default end date minus five days
  //export let startDate : Date = dayjs(endDate).subtract(5, 'day').toDate();
  export let startDate : Date = stints.at(-1)?.start ?? new Date();

  //console.log(startDate);
  //console.log(endDate);

  function generateGraph() {
    // create array of dates between start and end date
    const ndays : number = dayjs(endDate).diff(dayjs(startDate), 'day') + 1;
    console.log(ndays);
    const days : Date[] = new Array(ndays)
      .fill(0)
      .map((_, i) => dayjs(startDate).add(i, 'day').toDate());

    //console.log(days);

    // create array of hours per day
    const hoursPerDay : number[] = days.map(day => {
      const secondsPerDay = stints.reduce((sum, stint) => {
        const start = dayjs(stint.start);
        const end = stint.end ? dayjs(stint.end) : dayjs();
        if (start.isSame(day, 'day')) {
          return sum + end.diff(start, 'second');
        } else {
          return sum;
        }
      }, 0);
      return secondsPerDay / 60 / 60;
    });

    //console.log(hoursPerDay);

    new Chart(
      document.getElementById('chart') as HTMLCanvasElement,
      {
        type: 'bar',
        data: {
          labels: days.map(d => dayjs(d).format('DD.MM.')),
          datasets: [
            {
              label: 'Hours per day',
              data: hoursPerDay,
              backgroundColor: project?.color ?? '#ee0000',
            }
          ]
        }
      }
    );
  }

  onMount(() => {
    generateGraph();
  });
</script>

<canvas id="chart"></canvas>
