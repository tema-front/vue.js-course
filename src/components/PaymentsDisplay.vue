<template>
  <div class="payments-list">
        <div class="tableBlock">
            <table class="tableCost">
                <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Value</th>
                </tr>     

                <tr v-for="(array, idx) in getPLL" :key="idx">
                    <th class="tableItem">{{ getCounter() + idx}}</th>
                    <th class="tableItem" v-for="(item, idx) in array" :key="idx">{{ item }}</th>
                </tr>
            </table>

            <div class="paginationBlock">
                <button class="paginationSymbol left" @click="addPagination">&#60;</button>
                    <div class="paginationNumberBlock">
                        <button class="paginationSymbol paginationNumber" @click="addPagination($event)" v-for="(number, idx) in getQB" :key="idx">{{ number }}</button>
                    </div>
                <button class="paginationSymbol right" @click="addPagination">&#62;</button>
            </div>
        </div>
  </div>
</template>

<script>

import { mapMutations, mapGetters } from 'vuex'

export default {

    name: "PaymentsDisplay",
    data: () => ({

    }),
    props: {
        list: {
            default: []
        }
    },

    methods: {
        ...mapMutations([
            'setPaginationMT',
        ]),

        addPagination(event) {
            if (event.target.innerText == "<" && this.getCNB != 1) {
                this.setPaginationMT(this.getCNB - 1);
                // this.setColor(event);
                return
            } else if (event.target.innerText == ">" && this.getCNB != this.getQB) {
                this.setPaginationMT(this.getCNB + 1);
                // this.setColor(event);
                return
            } else if (Number(event.target.innerText)) {
                debugger
                this.setPaginationMT(event.target.innerText);
                this.setColor(event);
                // event.target.classList.add('clickPaginationTrue');
            } else this.setErrorColor(event)
        },

        setErrorColor(event) {
            event.target.classList.add('clickPaginationFalse')
        },

        // setColor(event) {
        //     debugger
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


    }
}
</script>

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
</style>