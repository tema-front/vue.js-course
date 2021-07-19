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

                <tr v-for="(array, idx) in list" :key="idx">
                    <th class="tableItem">{{ idx  + 1}}</th>
                    <th class="tableItem" v-for="(item, idx) in array" :key="idx">{{ item }}</th>
                </tr>
            </table>

            <div class="paginationBlock">
                <button class="paginationSymbol left" @click="addPagination">&#60;</button>
                    <div class="paginationNumberBlock">
                        <button class="paginationSymbol paginationNumber" @click="addPagination($event)">1</button>
                        <button class="paginationSymbol paginationNumber" @click="addPagination($event)">2</button>
                        <button class="paginationSymbol paginationNumber" @click="addPagination($event)">3</button>
                    </div>
                <button class="paginationSymbol right" @click="addPagination">&#62;</button>
            </div>
        </div>
  </div>
</template>

<script>

import { mapMutations } from 'vuex'

export default {

    name: "PaymentsDisplay",
    data: () => ({
        currentButton: 1
    }),
    props: {
        list: {
            default: []
        }
    },

    methods: {
        ...mapMutations([
            'setPagination',
            'downPagination',
            'upPagination'
        ]),

        addPagination(event) {
            debugger
            if (event.target.innerText == "<" && this.currentButton != 1) {
                this.currentButton--;
                this.setPagination(this.currentButton)
                return
            } else if (event.target.innerText == ">" && this.currentButton != 3) {
                this.currentButton++;
                this.setPagination(this.currentButton) 
                return
            } else if (Number(event.target.innerText)) this.setPagination(event.target.innerText)
        }
    },


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
        border: 1px solid #000;
        display: flex;
    }

    .paginationSymbol {
        font-weight: bold;
        font-family: sans-serif;
        font-size: 20px;
        margin: 0 auto;
    }

    .paginationNumber {
        margin-right: 5px;
    }
</style>