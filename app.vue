<template>
  <div class="bg-base-200 min-h-screen pb-12">
    <div class="navbar bg-primary text-white px-8">
      <h1 class="normal-case text-xl">Vote par Internet</h1>
    </div>
    <Search/>
  </div>
</template>
<style>
.btn-animation {
  animation: button-pop var(--animation-btn, 0.25s) ease-out;
}

.btn-animation:active:hover,
.btn-animation:active:focus {
  animation: none;
  transform: scale(var(--btn-focus-scale, 0.95));
}
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s;
  @apply ease-in-out-quart;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

@keyframes button-pop {
  0% {
    transform: scale(var(--btn-focus-scale, 0.95));
  }
  40% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}

</style>
