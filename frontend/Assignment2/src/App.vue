<template>
  <div data-app class="window">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>

@font-face {
  font-family: "ManropeBold";
  src: local("ManropeBold"),
  url(fonts/Manrope-Bold.ttf);
}

@font-face {
  font-family: "ManropeRegular";
  src: local("ManropeRegular"),
  url(fonts/Manrope-Regular.ttf);
}

.window {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
}
</style>
