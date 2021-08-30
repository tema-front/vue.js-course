<template>
    <div class="buttonsSettingsPayment">
      <button class="btnSettingsPayment btnYellow txtYellow">Configure</button>
      <button class="btnSettingsPayment btnYellow txtYellow">Remove</button>
    </div>
</template>

<script>
export default {
    name: 'SettingsPayment',

    props: {
        settings: {
        type: Object
    },
  },
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