<template>
    <div class="buttonsSettingsPayment">
      <button class="btnSettingsPayment btnYellow txtYellow">Configure</button>
      <button class="btnSettingsPayment btnYellow txtYellow" @click="removePayment">Remove</button>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
    name: 'SettingsPayment',

    props: {
        settings: {
        type: Object
    },

    numberBtn: {
        type: Number
    },

    allPayments: {
        type: Array
    },
  },

  methods: {
    ...mapMutations([
        'removePaymentMT'
    ]),

    removePayment() {
    debugger
    let itemRemove = this.getCNB
    itemRemove = itemRemove * 3 - 2 + this.numberBtn - 2
    this.removePaymentMT(Number(itemRemove))
    console.log(this.allPayments, this.numberBtn, itemRemove);
    }
  },

  computed: {
    ...mapGetters([
        'getCurrentNumberButtonGT'
    ]),

    getCNB() {
        return this.getCurrentNumberButtonGT
    }
  }
}
</script>


<style scoped>
    .btnSettingsPayment {
        min-width: 95px;
    }

    .buttonsSettingsPayment > button:nth-child(1) {
        margin-bottom: 7px;
    }



</style>