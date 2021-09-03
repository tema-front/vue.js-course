<template>
  <div class="ownerModalBlock" >
    <input type="text" v-model.trim="dataForConfigure.date" placeholder="Date | Default: current date" class="enterDatas bgcYellow hoverYellow"/>
    <div>
      <input type="text" v-model.trim="dataForConfigure.category" placeholder="Category"  class="enterDatas bgcYellow hoverYellow" list="categoryList"/>
      <!-- <button class="chooseCategory btnYellow" @click="modalCategory = !modalCategory">▼</button> -->
    </div>
    <!-- <div class="modalCategory bdYellow bgcYellow" v-if="modalCategory">
      <p v-for="(item, idx) in this.getCategoryListGT" :key="idx" class="hoverYellow txtYellow modalCategoryPaymentList" @click="setCategory($event)">
        {{ item }}
      </p>
    </div> -->
    <!-- <datalist id="categoryList">
      <select v-model="selected" class="selectCategory">
        <option v-for="(option, idx) in this.getCategoryListGT" :key="idx" :value="option">
            {{ option }}
        </option>
      </select>
    </datalist> -->
    <input type="number" v-model.number="dataForConfigure.value" placeholder="Value" class="enterDatas bgcYellow hoverYellow"/>
    <div>
      <!-- <transition name="enterData">
        <p v-if="enterDataFalse" class="txtEnterData">Please, enter data</p>
        <p v-if="enterDataComplete" class="txtEnterData complete">Done</p>
        <p v-if="errorDate" class="txtEnterData">Not correctly date</p>
      </transition> -->
    </div>
    <div>
      <button class="btnAdd btnYellow btnCenter" @click="configurePaymentMT(dataForConfigure)">Save</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    name: 'ConfigurePayment',

    props: {
        dataForConfigure: {
            type: Object
        }
    },

    methods: {
        ...mapMutations([
            'configurePaymentMT'
        ])
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

</style>