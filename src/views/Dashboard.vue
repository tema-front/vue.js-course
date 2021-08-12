<template>
  <div class="container">
    <!-- <button class="btnAdd btnPlus" @click="modalWindowPayment = !modalWindowPayment" >add new cost</button> -->
    <!-- <ModalWindowPayments @modalWindowClose="onClose" @modalWindowVisibility="modalWindowOpen" v-if="modalWindowPayment" @addNewPayment="addData" @updatePaymentPagination="updatePaginationList"/> -->

    <main>
      <br/>
        <AddPayment @addNewPayment="addData" @updatePaymentPagination="updatePaginationList" />
        <PaymentsDisplay :list="paymentsList" />
      <br/>
      <div class="totalCost">total: {{ getFPV }}</div>  
    </main>
  </div>
</template>

<script>
import PaymentsDisplay from "../components/PaymentsDisplay.vue";
import AddPayment from "../components/AddPayment.vue";
// import ModalWindowPayments from "../components/ModalWindowPayments.vue";


import { mapMutations, mapGetters, mapActions } from "vuex";

export default {  
  name: "Dashboard",
  components: {
    PaymentsDisplay,
    AddPayment,
    // ModalWindowPayments
    // Dashboard,
    // About,
    // NotFound
  },

  data: () => ({
    page: "",
    firstStartDashboard: true,
    modalWindowPayment: false
  }),

  methods: {
    ...mapMutations(["addDataToPaymentsListMT", "setPaginationMT"]),

    addData(data) {
      this.addDataToPaymentsListMT(data);
    },

    updatePaginationList() {
      debugger
      this.setPaginationMT(this.getCurrentNumberButtonGT);
    },

    // onClose() {
    //   debugger
    //   this.modalWindowPayment = false;
    // },

    // modalWindowOpen() {
    //   this.modalWindowPayment = true;
    // }

    // setPage() {
    //   debugger
    //   this.page = location.pathname.slice(1)
    //   console.log(123);
    // }
  },

  computed: {
    ...mapGetters([
      "getPaymentsPaginationGT",
      "getFullPaymentValueGT",
      "getCurrentNumberButtonGT",
    ]),

    ...mapActions([
      "loadDataAC",
      "loadCategoriesAC"
    ]),

    getFPV() {
      return this.getFullPaymentValueGT;
    },

    paymentsList() {
      return this.getPaymentsPaginationGT;
    },
  },

  created() {
    this.loadDataAC
    this.loadCategoriesAC
  },

  mounted() {

  // if (this.$route.path.slice(1, 22) == "dashboard/add/payment") {
  //   this.$emit("getPaymentAndRouter")
  //   this.modalWindowOpen()
  // }

    // this.setPage()
    // const links = document.querySelectorAll("a");
    // links.forEach((link) => {
    //   link.addEventListener("click", (event) => {
    //     event.preventDefault;
    //     history.pushState({}, "", link.href)
    //     this.setPage()
    //   })
    // })
    // window.addEventListener("popstate", this.setPage)
  },
};
</script>

<style scoped>
.container {
  width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  text-transform: uppercase;
  font-family: sans-serif;
}

.totalCost {
  text-align: left;
  text-transform: uppercase;
  font-family: sans-serif;
  font-weight: bold;
}

.btnAdd {
  text-align: center;
  text-transform: uppercase;
  font-family: sans-serif;
  padding: 7px;
  background-color: rgb(0, 161, 153);
  border: 0;
  color: white;
  border-radius: 3px;
  margin-bottom: 20px;
}

.btnPlus:after {
  content: "\00a0 \00a0 +";
}

.btnAdd:hover {
  background-color: rgb(0, 71, 48);
}
</style>

