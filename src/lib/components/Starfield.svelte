<script>
  // Walang heavy JS, CSS lang para smooth ang animation
</script>

<div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
  <div class="stars-small"></div>
  <div class="stars-medium"></div>
  <div class="stars-large"></div>
</div>

<style>
  /* UTILITY: Random Star Generator using Box Shadows */
  /* Ito ang trick: Isang pixel lang ito na kinopya ng maraming beses gamit ang box-shadow */

  /* GENERATED STAR COORDINATES (Static for performance) */
  :root {
    --stars-small:
      10vw 10vh #fff, 20vw 40vh #fff, 30vw 80vh #fff, 40vw 20vh #fff,
      50vw 60vh #fff, 60vw 10vh #fff, 70vw 90vh #fff, 80vw 30vh #fff,
      90vw 70vh #fff, 5vw 50vh #fff, 15vw 90vh #fff, 25vw 20vh #fff,
      35vw 60vh #fff, 45vw 10vh #fff, 55vw 80vh #fff, 65vw 30vh #fff,
      75vw 70vh #fff, 85vw 10vh #fff, 95vw 50vh #fff, 50vw 50vh #fff,
      12vw 12vh #ffffff80, 88vw 88vh #ffffff80, 44vw 44vh #ffffff80;

    --stars-medium:
      15vw 15vh #ffffffaa, 35vw 45vh #ffffffaa, 55vw 85vh #ffffffaa,
      75vw 25vh #ffffffaa, 95vw 65vh #ffffffaa, 5vw 75vh #ffffffaa,
      25vw 35vh #ffffffaa, 45vw 95vh #ffffffaa, 65vw 55vh #ffffffaa;

    --stars-large:
      10vw 80vh #ffffff, 40vw 10vh #ffffff, 80vw 50vh #ffffff,
      20vw 90vh #ffffff, 60vw 30vh #ffffff;
  }

  /* BASE STAR STYLE */
  div {
    position: absolute;
    background: transparent;
    border-radius: 50%;
  }

  /* ANIMATIONS */
  @keyframes fly-up {
    from { transform: translateY(0px); }
    to { transform: translateY(-100vh); } /* Moves stars up */
  }

  /* LAYER 1 */
  .stars-small {
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow: var(--stars-small);
    animation: fly-up 100s linear infinite;
    opacity: 0.4;
  }
  .stars-small:after {
    content: " ";
    position: absolute;
    top: 100vh;
    width: 1px;
    height: 1px;
    box-shadow: var(--stars-small);
  }

  /* LAYER 2 */
  .stars-medium {
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow: var(--stars-medium);
    animation: fly-up 60s linear infinite;
    opacity: 0.6;
  }
  .stars-medium:after {
    content: " ";
    position: absolute;
    top: 100vh;
    width: 2px;
    height: 2px;
    box-shadow: var(--stars-medium);
  }

  /* LAYER 3 */
  .stars-large {
    width: 3px;
    height: 3px;
    background: transparent;
    box-shadow: var(--stars-large);
    animation: fly-up 40s linear infinite;
    opacity: 0.8;
    box-shadow:
      10vw 80vh 2px white,
      40vw 10vh 2px white,
      80vw 50vh 2px white;
  }
  .stars-large:after {
    content: " ";
    position: absolute;
    top: 100vh;
    width: 3px;
    height: 3px;
    box-shadow: var(--stars-large);
  }
</style>