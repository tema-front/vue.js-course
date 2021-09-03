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
        'removePaymentMT',
        'setPaginationMT'
    ]),

    removePayment() {
        let itemRemove = this.getCNB
        itemRemove = itemRemove * 3 - 2 + this.numberBtn - 2
        this.removePaymentMT(Number(itemRemove))
        debugger
        // console.log(this.allPayments, this.numberBtn, itemRemove);
        this.setPaginationMT(this.setButton());
    },

    setButton() {
        debugger
        if (this.getCNB == 1) return this.getCNB
        if (this.getCNB < Math.ceil(this.getPL.length / 3)) return this.getCNB
        else return Math.ceil(this.getPL.length / 3)
    }
  },

  computed: {
    ...mapGetters([
        'getCurrentNumberButtonGT',
        'getPaymentLists'
    ]),

    getCNB() {
        return this.getCurrentNumberButtonGT
    },

    getPL() {
        return this.getPaymentLists
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