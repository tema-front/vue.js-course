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
                    <th class="tableItem" v-for="(item, idx) in array" :key="idx">{{ item }}</th>
                </tr>
            </table>
        </div>
  </div>
</template>

<script>
export default {

    name: "PaymentsDisplay", 
    props: {
        list: {
            default: []
        }
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
</style>