<template>
    <div>
        <AddPayment 
            @modalVisibilityGetTrue="getOpen"
            @updatePaymentPaginationMW="updatePaymentPagination" 
            @addNewPaymentMW="addNewPayment"
            @modalWindowCloseDashboard="getClose"
        />
    </div>
</template>

<script>
// import AddPayment from './AddPayment.vue'

export default {
    name: 'ModalWindow',    

    components: {
        AddPayment: () => import('./AddPayment.vue')
    },

    methods: {
        addNewPayment(data) {
            this.$emit('addNewPaymentDB', data)
        },

        updatePaymentPagination() {
            this.$emit('updatePaymentPaginationDB')
        },

        getOpen() {
            this.$emit('modalWindowOpen')
        },

        getClose() {
            this.$emit('modalWindowClose')
            this.$router.push({path: '/dashboard/'})
        }
    }

}
</script>

<style scoped>


</style>