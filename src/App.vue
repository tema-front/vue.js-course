<template>
  <div id="app" class="container">
    <header>
      <h1 class="header"  @click="menu">My presonal cost</h1>
    </header>
    <div class="menu">
      <router-link to="/dashboard" class="menu_link" >Dashboard</router-link> 
      <router-link to="/about" class="menu_link">About</router-link> 
      <router-link to="/notfound" class="menu_link">Not Found</router-link>
      <!-- <router-link to="/dashboard/add/payment"></router-link> -->
    </div>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  export default {
    name: "App",
    methods: {
      menu() {
        this.$router.push({
          name: 'menu'
        })
      }
    }
  }
</script>

<style scoped>
.container {
  width: 1200px;
  margin: 0 auto;
}

.menu {
  text-align: center;
}

.menu_link {
  font-size: 20px;
  margin: 10px;
  font-family: sans-serif;
  text-decoration: none;
  color: black;
}

.menu_link:active {
  color: gray;
}

.header {
  text-align: center;
  text-transform: uppercase;
  font-family: sans-serif;
}


</style>
