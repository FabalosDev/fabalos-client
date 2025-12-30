<script>
  // Walang heavy JS, CSS lang para smooth ang animation
</script>

<div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
  <div class="stars-small"></div>
  <div class="stars-medium"></div>
  <div class="stars-large"></div>
</div>


<style>
  :root {
    /* Pinatitingkad na colors para sa HUD feel */
    --stars-small: 10vw 10vh #ffffff33, 20vw 40vh #d1e7ff44, 30vw 80vh #ffffff2b, 40vw 20vh #d1e7ff55, 50vw 60vh #ffffff38, 70vw 90vh #ffffff40, 85vw 10vh #d1e7ff42;
    --stars-medium: 15vw 15vh #e0f2ffcc, 55vw 85vh #e0f2ffaa, 25vw 35vh #e0f2ffcc, 65vw 55vh #e0f2ffbb;
    --stars-large: 10vw 80vh #f0f8ffff, 40vw 10vh #e0f2ffee, 80vw 50vh #f0f8ffff;
  }

  .starfield-container {
    position: fixed;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    background: #020617; /* Space depth */
  }

  /* BASE STAR STYLE */
  .star-layer {
    position: absolute;
    background: transparent;
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  /* SEAMLESS LOOP ANIMATION */
  @keyframes interstellar-flow {
    from { transform: translateY(0); }
    to { transform: translateY(-100vh); }
  }

  @keyframes twinkle {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }

  /* LAYER 1: SMALL (160s) */
  .stars-small {
    width: 1px; height: 1px;
    box-shadow: var(--stars-small);
    animation: interstellar-flow 160s linear infinite;
  }
  .stars-small:after {
    content: " "; position: absolute;
    top: 100vh; width: 1px; height: 1px;
    box-shadow: var(--stars-small);
  }

  /* LAYER 2: MEDIUM (90s) */
  .stars-medium {
    width: 1.5px; height: 1.5px;
    box-shadow: var(--stars-medium);
    animation: interstellar-flow 90s linear infinite;
  }
  .stars-medium:after {
    content: " "; position: absolute;
    top: 100vh; width: 1.5px; height: 1.5px;
    box-shadow: var(--stars-medium);
  }

  /* LAYER 3: LARGE (50s + TWINKLE) */
  .stars-large {
    width: 2px; height: 2px;
    box-shadow: var(--stars-large);
    animation: interstellar-flow 50s linear infinite, twinkle 4s ease-in-out infinite;
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.4));
  }
  .stars-large:after {
    content: " "; position: absolute;
    top: 100vh; width: 2px; height: 2px;
    box-shadow: var(--stars-large);
  }
</style>

<div class="starfield-container">
  <div class="star-layer stars-small"></div>
  <div class="star-layer stars-medium"></div>
  <div class="star-layer stars-large"></div>
</div>