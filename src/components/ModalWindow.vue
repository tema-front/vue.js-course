<template>
  <div class="modalBlock bgcYellow" @click="onClose($event)">
    <div class="modalHeader">
      <p>{{ settings.header }}</p>
    </div>
  <div class="modalClose">

  <button class="closeModalWindow btnAdd btnYellow" @click="getClose">Close</button>

  </div>
    <component :is="settings.name" ref="child"/>
  </div>
</template>

<script>

export default {
  name: 'ModalWindow',

  components: {
    AddPayment: () => import(/* webpackChunkName: 'AddPayment' */ './AddPayment.vue')
  },

  props: {
    settings: {
      type: Object
    },
  },

  methods: {
    getClose() {
      this.$router.push({path: '/dashboard'})
      this.$modal.hide()
    },

    addPaymentListEmit() {
      this.$refs.child.addPaymentList()  
    },

    onClose(event) {
      if (!(event.target.innerText == "▼" || event.target.innerText == "close")) this.$refs.child.closeModalCategory()  
    }
  }

}
</script>

<style scoped>

.btnAdd {
  text-align: center;
  text-transform: uppercase;
  font-family: sans-serif;
  padding: 7px;
  border-radius: 3px;
  margin-bottom: 20px;
}

.btnPlus:after {
  content: "\00a0 \00a0 +";
}

.modalBlock {
  width: 350px;
  min-height: 270px;
  border: 2px solid rgb(109, 109, 109);
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-top: 32px;
  margin: 0 0 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  flex-wrap: nowrap;
  border-radius: 15px;
  -webkit-box-shadow: 4px 4px 68px 100px rgb(236, 212, 105, 0.2);
  -moz-box-shadow: 4px 4px 68px 100px rgb(236, 212, 105, 0.2);
  box-shadow: 4px 4px 68px 100px rgb(236, 212, 105, 0.2);
  border: 3px solid rgb(126, 113, 56);
}

.modalClose {
  position: absolute;
  right: 21px;
  top: 10px;
  box-sizing: border-box;

}

.modalHeader {
  text-align: center;
  text-transform: uppercase;
  font-family: sans-serif;
  font-weight: bold;
  color: rgb(126, 113, 56);
  
}

.closeModalWindow {
  padding: 4px;
  text-transform: lowercase;
  font-size: 16px;
}

</style>