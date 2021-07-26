<template>
  <div id="app" class="container">
    <header>
      <h1 class="header">My presonal cost</h1>
    </header>
    <main>
      <br>
      <AddPayment @addNewPayment="addData"/>
      <PaymentsDisplay :list="paymentsList"/>
      <br>
      <div class="totalCost">total: {{ getFPV }}</div>
    </main>
  </div>

</template>

<script>
import PaymentsDisplay from './components/PaymentsDisplay.vue'
import AddPayment from './components/AddPayment.vue'

import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {

  name: 'App',
  components: {
    PaymentsDisplay,
    AddPayment
  },

  methods: {

    ...mapMutations([
      'addDataToPaymentsListMT'
    ]),

    addData(data) {
      this.addDataToPaymentsListMT(data)
    },

  },  

  computed: {

    ...mapGetters([
      'getPaymentPaginationGT',
      'getFullPaymentValueGT'
    ]),

    ...mapActions([
      'loadDataAC',
    ]),

    getFPV(){
      return this.getFullPaymentValueGT
    },

    paymentsList() {
      return this.getPaymentPaginationGT
    }

  },

  created() {
    this.loadDataAC;
  }

}
</script>

<style scoped>
  .container {
    width: 1200px;
    margin: 0 auto;
  }

  .header {
    text-align: center;
    text-transform: uppercase;
    font-family: sans-serif;
  }

  .totalCost {
    text-align: left;
    text-transform: uppercase;
    font-family: sans-serif;
    font-weight: bold;
  }
</style>
