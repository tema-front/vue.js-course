<template>
  <div id="app" class="container">
    <header>
      <h1 class="header">My presonal cost</h1>
    </header>
    <main>
      <br>
      <AddPayment @addNewPayment="addData"/>
      <PaymentsDisplay :list="paymentsList"/>
    </main>
  </div>

</template>

<script>
import PaymentsDisplay from './components/PaymentsDisplay.vue'
import AddPayment from './components/AddPayment.vue'


export default {

  name: 'App',
  components: {
    PaymentsDisplay,
    AddPayment
  },

  data: () => ({
    paymentsList: [],
    counter: 0,
  }),

  methods: {

    addData(data) {
      this.counter++; // счётчик строк в таблице
      // в главный массив добавляю массивы с данными. Новые данные - новый массив
      this.paymentsList.push(new Array(String(this.counter), data.date, data.category, data.value));
      console.log(this.paymentsList);
    }

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
</style>
