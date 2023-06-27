<script lang="ts">
  // an analog clock component
  import { onMount } from "svelte";

  onMount(() => {
    // get the hands
    const secondHand = document.querySelector('.second-hand') as HTMLElement; // | null;
    const minuteHand = document.querySelector('.min-hand') as HTMLElement;
    const hourHand = document.querySelector('.hour-hand') as HTMLElement;

    function setDate() {
      // get the current time
      const now = new Date();

      // get the seconds
      const seconds = now.getSeconds();

      // convert seconds to degrees
      const secondsDegrees = ((seconds / 60) * 360);

      // apply the degrees
      secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

      // get the minutes
      const minutes = now.getMinutes();

      // convert minutes to degrees
      const minutesDegrees = ((minutes / 60) * 360);

      // apply the degrees
      minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;

      // get the hours
      const hours = now.getHours();

      // convert hours to degrees
      const hourMinutesDegrees = ((minutes / 60 / 12) * 360);
      const hoursDegrees = ((hours / 12) * 360) + hourMinutesDegrees;

      // apply the degrees
      hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
    }

    setInterval(setDate, 1000);
  });
</script>

<div class="clock">
  <div class="clock-face">
    <div class="hand hour-hand">
      <img src="/hour-hand.svg" alt="hour-hand">
    </div>
    <div class="hand min-hand">
      <img src="/minute-hand.svg" alt="minute-hand">
    </div>
    <div class="hand second-hand">
      <img src="/second-hand.svg" alt="second-hand">
    </div>
  </div>
</div>

<style>
  .clock {
    --clock-height: 100%;

    --handle-width: calc(100% / 10);

    width: var(--clock-height);
    height: var(--clock-height);
    background-color: var(--color-in-bg);
    border-radius: 15%;
    border: 3px solid var(--color-in-border);
    box-shadow: inset 0 0 15px black;
  }
  .clock-face {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .hand {
    width: var(--handle-width);
    height: calc(var(--clock-height) / 2);
    position: absolute;
    left: calc(50% - var(--handle-width) / 2);
    transform-origin: 50% calc(100% - var(--handle-width) / 2);
    /*transition: all 0.5s;*/
  }
  img {
    width: 100%;
    height: 100%;
  }
</style>
