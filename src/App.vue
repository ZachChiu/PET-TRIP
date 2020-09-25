<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./assets/scss/main";
html,body,#app,.layout{
  height: 100%;
}
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Noto Sans TC",
    Microsoft JhengHei, "Segoe UI", "Roboto", "Helvetica Neue", Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  h1 {
    font-family: "Patrick Hand", cursive;
  }
  main {
    // min-height: calc(100vh - 82px - 85px);
    // flex: 1;
    background: rgb(252, 252, 252);
  }
  .headerNav {
    top: 0;
    z-index: 10;
    box-shadow: 1px 1px 5px grey;
  }
  .bannerText {
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba($color: #e7e7e7, $alpha: 0.3);
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
  .opacityZero {
    opacity: 0;
    z-index: -1;
    position: relative;
  }
  .hoverLine .hoveritem > a {
    &:after {
      content: "";
      display: block;
      height: 1.5px;
      background: #fbc02d;
      transform: scaleX(0);
      transition: transform 0.3s;
    }
    &:hover:after {
      transform: scaleX(1);
      transition: transform 0.3s;
    }
  }
}
</style>
