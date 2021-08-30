<template>
  <div class="ownerModalBlock" >
    <input type="text" v-model.trim="date" placeholder="Date | Default: current date" class="enterDatas bgcYellow hoverYellow" />
    <div>
      <input type="text" v-model.trim="category" placeholder="Category"  class="enterDatas bgcYellow hoverYellow" list="categoryList"/>
      <button class="chooseCategory btnYellow" @click="modalCategory = !modalCategory">▼</button>
    </div>
    <div class="modalCategory bdYellow bgcYellow" v-if="modalCategory">
      <p v-for="(item, idx) in this.getCategoryListGT" :key="idx" class="hoverYellow txtYellow modalCategoryPaymentList" @click="setCategory($event)">
        {{ item }}
      </p>
    </div>
    <!-- <datalist id="categoryList">
      <select v-model="selected" class="selectCategory">
        <option v-for="(option, idx) in this.getCategoryListGT" :key="idx" :value="option">
            {{ option }}
        </option>
      </select>
    </datalist> -->
    <input type="number" v-model.number="value" placeholder="Value" class="enterDatas bgcYellow hoverYellow"/>
    <div>
      <transition name="enterData">
        <p v-if="enterDataFalse" class="txtEnterData">Please, enter data</p>
        <p v-if="enterDataComplete" class="txtEnterData complete">Done</p>
        <p v-if="errorDate" class="txtEnterData">Not correctly date</p>
      </transition>
    </div>
    <Dashboard v-if="false" @addPaymentListAP="addPaymentList" />
    <div>
      <button class="btnAdd btnPlus btnYellow btnCenter" @click="addPaymentList">add</button>
    </div>

  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";

import Dashboard from '../views/Dashboard.vue'



export default {
  name: "AddPayment",
  components: {
    Dashboard,

  },


  data: () => ({
    date: "",
    category: "",
    value: null,
    button: "",
    selected: "",
    enterDataFalse: false,
    enterDataComplete: false,
    today: undefined,
    errorDate: false,
    modalCategory: false
  }),

  methods: {
    ...mapMutations(["setPaginationMT", 'addDataToPaymentsListMT', 'setPaginationMT']),

    addPaymentList() {

      if (this.category && this.value ) this.$router.push({path: `/dashboard/add/payment/${(this.category).toLowerCase()}/?value=${this.value}`})
      if (this.date.length == 0) this.date = this.getCurrentDate()
      // else this.checkDate(this.date.split('.'))
      let arrDate = this.date.split('.')
      // if (!this.checkDate(this.date.split('.'))) return
      if (arrDate.length == 3 && (arrDate[0] <= 31 && arrDate[0] >= 1 && arrDate[1] <= 12 && arrDate[1] >= 1 && arrDate[2].length == 4)) {
        this.getCorrectlyDate(this.date)
        this.errorDate = false;
      } else {
        this.errorDate = true;
        return;
      }
      
      const data = {
        date: this.date,
        category: this.category,
        value: this.value
      };
      
      if (!this.category || !this.value) {
        this.enterDataFalse = true;
        return;
      } else {
        this.enterDataFalse = false;
        this.enterDataComplete = true
        setTimeout(() => {
          this.enterDataComplete = false
        }, 500)
      }
      this.addDataToPaymentsListMT(data);
      this.setPaginationMT(this.getCurrentNumberButtonGT);
    },  

    closeModalCategory() {
      this.modalCategory = false
    },

    // checkDate(arrDate) {
    //   if (arrDate.length == 3 && (arrDate[0] <= 31 && arrDate[0] >= 1 && arrDate[1] <= 12 && arrDate[1] >= 1 && arrDate[2].length == 4)) {
    //     this.getCorrectlyDate(this.date)
    //     this.errorDate = false;
    //     return true;
    //   } else {
    //     this.errorDate = true;
    //     return false;
    //   }
    // },

    getCorrectlyDate(date) {
      let arrDate = date.split('.')
      for (let i = 0; i < 2; i++) {
        if (arrDate[i].length == 1) {
          arrDate[i] = (String(arrDate[i]) + "0").split("").reverse().join("");
        }
      }
      this.date = arrDate.join('.')
    },

    // listenerDate(date) {
    //   let arrDate = date.split('.');
    //   if (arrDate.length == 3 && (arrDate[0] <= 31 && arrDate[0] >= 1 && arrDate[1] <= 12 && arrDate[1] >= 1 && arrDate[2].length == 4)) {
    //     this.errorDate = false
    //   } else this.errorDate = true
    // },

    getCurrentDate() {
      this.today = new Date();
      let day = this.today.getDate();
      let month = this.today.getMonth() + 1;
      let year = this.today.getFullYear();
      return `${day}.${month}.${year}`;
    },

    setCategory(set) {
      this.modalCategory = false
      this.category = set.target.innerText
    },

    // addPathRoute() {
    //   if (this.modalWindow) this.$router.push({path: '/dashboard'})
    //   else this.$router.push({path: '/dashboard/add/payment'})
    // }

    
  },

  computed: {
    ...mapGetters(['getCategoryListGT', 'getCurrentNumberButtonGT']),
    ...mapActions(["loadCategoriesAC"]),

    // test() {
    //   let testValue = this.date
    //   this.listenerDate(testValue)
    //   return this.testValue
    // }
  },

  mounted() {

    if (this.$route.path.slice(1, 22) == "dashboard/add/payment") this.$emit('modalVisibilityGetTrue')
    const categoryList = ["Food", "Car", "Vacation", "Helth", "Pet", "Furniture"];
    let categoryListLowCase = [];

    categoryList.forEach((item) => {
      categoryListLowCase.push(item.toLowerCase());
    });

    if (categoryListLowCase.includes((this.$route.params?.category ?? "no").toLowerCase())) {
      this.category = this.$route.params.category[0].toUpperCase() + this.$route.params.category.slice(1);
    }
    if (this.$route.query?.value ?? null) this.value = Number(this.$route.query.value);
    if (this.category && this.value) this.addPaymentList();
  },
};
</script>

<style>
  .enterData-enter-active, .enterData-leave-active {
    transition: opacity .5s;
  }

  .enterData-enter, .enterData-leave-to {
    opacity: 0;
  }
</style>

<style scoped>
.btnAdd {
  text-align: center;
  text-transform: uppercase;
  font-family: sans-serif;
  padding: 7px;
  border-radius: 3px;
  margin-bottom: 20px;
}

.btnPlus:after {
  content: "\00a0 \00a0 +";
}

.enterDatas {
  height: 50px;
  margin-bottom: 35px;
  padding: 10px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  color: rgb(126, 113, 56); 
  border: 3px solid rgb(126, 113, 56);
  outline: none;
  font-weight: bold;
}

.enterDatas::-webkit-input-placeholder { color: rgb(197, 181, 107); }

.txtEnterData {
  text-align: center;
  font-family: sans-serif;
  font-weight: bold;
  color: rgb(211, 83, 83);
  font-size: 16px;
  position: absolute;
  left: 50%;
  top: 80.5%;
  transform: translate(-50%, 0%);
}

.complete {
  color: green;
}

.closeBlock {
  position: absolute;
  right: 21px;
  top: 5px;
}
.closeModalWindow {
  padding: 2px;
  text-transform: lowercase;
  font-size: 16px;
  background-color: #3435;
}

.selectCategory {
    background-color: rgb(236, 212, 105);
}

.enterDatas:nth-child(2) {

  position: relative;
}

.chooseCategory {
  position: absolute; 
  left: 84%;
  top: 43%;
  height: 29.2px;
}

.modalCategory {
  position: absolute;
  top: 49.9%;
  left: 59.8%;
  width: 100px;
  color: rgb(126, 113, 56); 
  padding: 10px;

}

.modalCategoryPaymentList {
  margin: 3px;
}

</style>
