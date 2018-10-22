<template>
    <div class="dashboard-container">
        <header class="site-header">
            <h4><b>VUE CRYPTO DASHBOARD</b></h4>
        </header>
        <div class="site-main">
            <router-view/>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
      }
    },
    components: {
    }
  }
</script>
<style lang="scss">

    h4 {
        padding: 10px;
        margin:0;
        font-size: 1.6rem;
        line-height: 1.2;
    }
    .btn-icon {
        vertical-align: middle;
    }
    .dashboard-container{
        height: 100%;
    }
    .site-container {
        height: 100%;
    }
    .site-header {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        text-align: center;
        background-color: #ffde00;
        height: 50px;
        z-index: 100;
        box-shadow: 0px 6px 7px 0px rgba(0, 0, 0, 0.45);
        transition: left .3s ease;
    }
    .site-main {
        width: 100%;
        height: 100%;
        position: relative;
    }
    .dashboard-content {
        min-height: calc(100% - 39px);
    }
</style>
