<template>
  <div>
      <div>
          <input type="number" placeholder="number-1" v-model.number="varFirst">
          <input type="number" placeholder="number-2" v-model.number="varSecond">
      </div>
      <div>
          <button @click="addition()">+</button>
          <button @click="subtraction()">-</button>
          <button @click="multiplication()">*</button>
          <button @click="division()">/</button>
          <button @click="degree()">^</button>
      </div>
      <div><button @click="getEvent($event)">Event</button></div>
        Result: {{ result }}
  </div>
</template>

<script>
export default {
    name: "Calculator",
    data: () => ({
        varFirst: "",
        varSecond: "",
        result: "",
    }),

    methods: {

        addition() {
            this.result = this.varFirst + this.varSecond
        },

        subtraction() {
            this.result = this.varFirst - this.varSecond
        },

        multiplication() {
             this.result = this.varFirst * this.varSecond
        },

        division() {
             this.result = Math.floor(this.varFirst / this.varSecond)
        },

        degree() {
            this.result = this.varFirst ** this.varSecond
        },

        getEvent(event) {
            console.log("Событие ", event)
        }
    }
}
</script>

<style>

</style>