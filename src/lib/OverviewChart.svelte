<script lang="ts">
  import Chart from 'chart.js/auto';
  import dayjs from 'dayjs';
  import { onMount } from 'svelte';

  import type { ProjectWithStints } from '$lib/types';

  export let projects : ProjectWithStints[] = [];

  export let endDate : Date = new Date();
  // default end date minus five days
  export let startDate : Date = dayjs(endDate).subtract(5, 'day').toDate();
  //export let startDate : Date = stints.at(-1)?.start ?? new Date();

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

    const datasets = projects.map(project => {
      const hoursPerDay : number[] = days.map(day => {
        const secondsPerDay = project.stints.reduce((sum, stint) => {
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
      return {
        label: project.name,
        data: hoursPerDay,
        backgroundColor: project.color ?? '#ee0000',
      };
    });

    new Chart(
      document.getElementById('chart') as HTMLCanvasElement,
      {
        type: 'bar',
        data: {
          labels: days.map(d => dayjs(d).format('ddd DD.MM.')),
          datasets: datasets,
        },
        options: {
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
              title: {
                display: true,
                text: 'Hours',
              },
            }
          },
          // don't show legend
          plugins: {
            legend: {
              display: false,
            },
          },
        }
      }
    );
  }

  onMount(() => {
    generateGraph();
  });
</script>

<canvas id="chart"></canvas>
