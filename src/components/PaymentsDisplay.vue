<template>
        <div class="tableBlock">
            <table class="tableCost">
                <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Value</th>
                </tr>     

                <tr v-for="(array, idx) in getPLL" :key="idx" class="positionRelative" > 

                    
                    <th class="tableItem">{{ getCounter() + idx}}</th>
                    <th class="tableItem" v-for="(item, idx) in array" :key="idx">{{ item }} </th>
                    
                    <div class="btnsSettingsPayments">
                        <button class="btnPaymentSettingsVisibility btnYellow" v-if="list[idx]" :key='idx' @click="visibilitySettingsPayment(list[idx], idx + 1)">≡</button>
 
                    </div>
                       <div v-if="settingsPaymentVisiblity" class="settingsPaymentBlock bgcYellow bdYellow">
                            <component :is="SettingsPayment"/>
                        </div>

                </tr>

            </table>


            <div class="paginationBlock">
                <button class="paginationSymbol left" @click="addPagination($event, $route)">&#60;</button>
                    <div class="paginationNumberBlock">
                        <button class="paginationSymbol paginationNumber" @click="addPagination($event, $route)" v-for="(number, idx) in getQB" :key="idx">{{ number }}</button>

                    </div>
                <button class="paginationSymbol right" @click="addPagination($event, $route)" @updatePaymentPagination="updatePagination()">&#62;</button>
            </div>
        </div>

</template>

<script>
// import SettingsPayment from './SettingsPayment.vue'
import { mapMutations, mapGetters } from 'vuex'

export default {

    name: "PaymentsDisplay",
    data: () => ({
        settingsPaymentVisiblity: false,
        SettingsPayment: () => import (/* webpackChunkName: 'SettingsPayment' */  './SettingsPayment.vue'),
        // idBlock: key
    }),
    // components: { SettingsPayment },
    props: {
        list: {
            default: []
        },
    },

    methods: {
        ...mapMutations([
            'setPaginationMT',
        ]),

        
        addPagination(event, route) {
            
            if (event.target.innerText == "<" && this.getCNB != 1) {
                route.params.page = String(this.getCNB - 1)
                this.setPaginationMT(this.getCNB - 1);
                // this.setColor(event);
                return
            } else if (event.target.innerText == ">" && this.getCNB != this.getQB) {
                route.params.page = String(this.getCNB + 1)
                this.setPaginationMT(this.getCNB + 1);
                // this.setColor(event);
                return
            } else if (Number(event.target.innerText)) {
                route.params.page = event.target.innerText;
                this.setPaginationMT(event.target.innerText);
                // this.setColor(event);
                // event.target.classList.add('clickPaginationTrue');
            } else this.setErrorColor(event)
        },

        updatePagination(event) {
            
            if (event) console.log(123);
        },

        setErrorColor(event) { //допилить
            event.target.classList.add('clickPaginationFalse')
        },

        visibilitySettingsPayment(payment, numberButton) {
            debugger
            console.log(payment, this.getPL, numberButton, this.idBlock);

            // this.getPl.findIndex(i => i == payment)    
            this.settingsPaymentVisiblity = !this.settingsPaymentVisiblity
            if (this.settingsPaymentVisiblity) this.$paymentSettings.show()
            else this.$paymentSettings.hide()
        },

        // setColor(event) {
        //     
        //     if (event.target.classList.contains('clickPaginationTrue')) {
    
        //     } else event.target.classList.add('clickPaginationTrue');
        // },

        getCounter() {
            if (this.getCNB == 1) return 1
            return this.getCNB * 2 + (this.getCNB - 2)
        }
    },

    computed: {
        ...mapGetters([
            'getCurrentNumberButtonGT',
            'getQuntityButtonsGT',
            'getPaymentLists'
        ]),

        getCNB() {
            return Number(this.getCurrentNumberButtonGT)
        },

        getQB() {
            return this.getQuntityButtonsGT
        },

        getPLL() {
            return this.list
        },

        getPL() {
            debugger
            return this.getPaymentLists
        }
    }
}
</script>

<style>
    .btnPaymentSettingsVisibility {
        font-weight: bold;
        margin-left: -55px;
        height: 28px;
        margin-top: -15px;
        font-size: 17.2px;
    }
</style>

<style scoped>
    .tableBlock {
        width: 400px;
    }

    .tableCost {
        font-family: sans-serif;
        font-size: 20px;
        border-collapse: separate;
        border-spacing: 70px 0;
        margin-left: -70px;
    }

    .tableItem {
        font-weight: normal;
    }

    th {
        padding-bottom: 15px;
    }

    tr {
        text-align: left;
    }

    .paginationBlock {
        width: 100%;
        margin: 0 auto;
        display: flex;
    }

    .paginationSymbol {
        font-weight: bold;
        font-family: sans-serif;
        font-size: 20px;
        margin: 0 auto;
    }

    .paginationSymbol:active {
        color: aquamarine;
    }

    .paginationNumber {
        margin-right: 5px;
    }

    .clickPaginationTrue {
        color: aquamarine;
    }

    .clickPaginationFalse:active {
        color: red;
    }

    .settingsPaymentBlock {
        display: flex;
        flex-direction: column;
        padding: 7px;
        width: 95px;
        position: absolute;
        top: 10%;
        /* left: 46%; */
    }

     /* tr:nth-child(3) > .btnsSettingsPayments > button{
        position: relative;
    } */


    .positionRelative {
        position: relative;
    }

</style>