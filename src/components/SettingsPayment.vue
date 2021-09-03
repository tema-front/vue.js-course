<template>
    <div class="buttonsSettingsPayment">
      <button class="btnSettingsPayment btnYellow txtYellow" @click="customizationPayment">Configure</button>
      <button class="btnSettingsPayment btnYellow txtYellow" @click="removePayment">Remove</button>
        <!-- <ModalWindow :settings="modalSettings" v-if="false"/> -->
        <ConfigurePayment :settings="modalSettings" v-if="false"/>
        <!-- <PaymentsDisplay ref="owner"/> -->
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
    name: 'SettingsPayment',
    components: {
        // PaymentsDisplay: () => import(/* webpackChunkName: 'PaymentsDisplay' */ '../components/PaymentsDisplay.vue'),
        ConfigurePayment: () => import(/* webpackChunkName: 'ConfigurePayment' */ '../components/ConfigurePayment.vue'),
    },

    data: () => ({
        modalSettings: {
            header: 'Configure Payment',
            data: undefined
        },

    }),

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
        console.log(this.allPayments, this.numberBtn, itemRemove);
        this.setPaginationMT(this.setButton());
        // this.$paymentSettings.hide() не работает, за видимость отвечает PaymentDisplay

    },

    setButton() {
        if (this.getCNB == 1) return this.getCNB
        if (this.getCNB < Math.ceil(this.getPL.length / 3)) return this.getCNB
        else return Math.ceil(this.getPL.length / 3)
    },

    customizationPayment() {
        this.data = { ...this.allPayments[this.numberBtn - 1], numberItem: this.getCNB * 3 - 2 + this.numberBtn - 2}
        this.$modal.show('ConfigurePayment', { header: this.modalSettings.header, settings: this.data});
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