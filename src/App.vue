<template>
  <div id="app" class="container" >
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
    <transition name="fade">
      <ModalWindow v-if="modalSettings.name" :settings="modalSettings" />
    </transition>
    <!-- <SettingsPayment v-if="false" :numberBtn="numberButtonSettingsPayments"/> -->
    
     <PaymentsDisplay  v-if="false"   :setting="settingsPayment"/>
  </div>
</template>

<script>
  import ModalWindow from './components/ModalWindow.vue'
  // import SettingsPayment from './components/SettingsPayment.vue'
  import PaymentsDisplay from './components/PaymentsDisplay.vue'




  export default {
    name: "App",
    components: { 
      ModalWindow,
      // SettingsPayment,
      PaymentsDisplay
    },

    data: () => ({
      modalShow: false,
      modalSettings: {},
      settingsPayment: "",
      // numberButtonSettingsPayments: 0
    }),



    methods: {
      menu() {
        this.$router.push({
          name: 'menu'
        })
      },

      onShow(settings) {
        this.modalSettings = settings
      },

      onHide() {
        this.modalSettings = {}
      },

      showSettingsPayment() {
        this.settingsPayment = "SettingsPayment"
        // this.numberButtonSettingsPayments = numberButton
        // console.log(123);
      },

      hideSettingsPayment() {
        this.settingsPayment = "";
      }

    },

    mounted() {
      this.$modal.EventBus.$on('show', this.onShow)
      this.$modal.EventBus.$on('hide', this.onHide)

      this.$paymentSettings.EventBus.$on('show', this.showSettingsPayment)
      this.$paymentSettings.EventBus.$on('hide', this.hideSettingsPayment)
    },

    beforeDestroy() {
      this.$modal.EventBus.$off('show', this.onShow)
      this.$modal.EventBus.$off('hide', this.onHide)

      this.$paymentSettings.EventBus.$off('show', this.showSettingsPayment)
      this.$paymentSettings.EventBus.$off('hide', this.hideSettingsPayment)
    }
  }
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

<style>
  .btnYellow {
    background-color: rgb(236, 212, 105);
    border: 3px solid rgb(126, 113, 56);
    color: rgb(126, 113, 56);
  }

  .btnYellow:hover {
    background-color: rgb(221, 188, 41);
  }

  .btnYellow:active {
    background-color: rgb(236, 212, 105);
  }

  .bgcYellow {
    background-color: rgb(236, 212, 105);
  }

  .bdYellow {
    border: 3px solid rgb(126, 113, 56);
  }

  .hoverYellow:hover {
    background-color: rgb(221, 188, 41);
  }

  .colorYellow {
    color: rgb(126, 113, 56);
  }

  .btnCenter {
    margin: 0 auto
  }

  .txtYellow {
    font-size: 16px;
    font-family: sans-serif;
    font-weight: bold;
    color: rgb(126, 113, 56);
  }

</style>

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


