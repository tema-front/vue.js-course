<template>
    <div>

        <button class="btnAdd btnPlus" @click="modalWindow = !modalWindow">add new cost</button>
  <div class="modalBlock" v-if="modalWindow">

    <div class="closeBlock">
      <button class="closeModalWindow btnAdd" @click="modalWindow = !modalWindow">Close</button>
    </div>
    <input type="text" v-model.trim="date" placeholder="Date" class="enterDatas"/>
    <input type="text" v-model.trim="category" placeholder="Category" class="enterDatas" list="categoryList"/>
    <datalist id="categoryList">
      <select v-model="selected">
        <option v-for="(option, idx) in this.getCategoryListGT" :key="idx" :value="option">
          {{ option }}
        </option>
      </select>
    </datalist>
      <input type="number" v-model.number="value" placeholder="Value" class="enterDatas"/>
      <button class="btnAdd btnAddNewCost" @click="addPaymentList()">add</button>
    <div>
        <p v-if="enterData" class="txtEnterData">Please, enter data</p>
    </div>
  </div>
    </div>



</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "AddPayment",
  data: () => ({
    date: "",
    category: "",
    value: null,
    button: "",
    modalWindow: false,
    selected: "",
    enterData: false,
  }),

  methods: {
    ...mapMutations(["setPaginationMT"]),

    addPaymentList() {
        const { category, value } = this;
        debugger
        if (this.category && this.value ) this.$router.push({path: `/dashboard/add/payment/${(this.category).toLowerCase()}/?value=${this.value}`})
        const data = {
            date: this.date || this.getCurrentDate,
            category,
            value,
        };

        if (!category || !value) {
            // document.querySelector(".btnAddNewCost").classList.add("pleaseEnterData");
            this.enterData = true;
            return;
        } else {
            // document.querySelector(".btnAddNewCost").classList.add("pleaseEnterData");
            this.enterData = false;
        }

        this.$emit("addNewPayment", data); // вызов события addNewPayment у подписчика
        this.$emit("updatePaymentPagination", data); // вызов события updatePaymentPagination, которое обновляет массив для текущей страниц при клике add
    },


    // addPathRoute() {
    //   if (this.modalWindow) this.$router.push({path: '/dashboard'})
    //   else this.$router.push({path: '/dashboard/add/payment'})
    // }


    
  },

  computed: {
    ...mapGetters(["getCategoryListGT"]),

    ...mapActions(["loadCategoriesAC"]),

    getCurrentDate() {
      const today = new Date();
      let day = today.getDate();
      // делаю из "n" в "0n"
      if (String(day).length == 1) {
        day = (String(day) + "0").split("").reverse().join("");
      }
      let month = today.getMonth() + 1;
      // делаю из "n" в "0n" 2.7.2021 => 02.07.2021
      if (String(month).length == 1) {
        month = (String(month) + "0")
      }
      const year = today.getFullYear();

      return `${day}.${month}.${year}`;
    },

  },

mounted() {



    if (this.$route.path.slice(1, 22) == "dashboard/add/payment") this.modalWindow = true
      // блять заебался. хардкод сука!
    debugger
    
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

<style scoped>
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

.btnAddNewCost:active {
  background-color: aquamarine;
}

.btnPlus:after {
  content: "\00a0 \00a0 +";
}

.modalBlock {
  width: 350px;
  height: 250px;
  border: 2px solid rgb(109, 109, 109);
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-top: 32px;
  margin: 0 0 20px;
  position: relative;
}

.enterDatas {
  height: 30px;
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
}

.modalBlock > button {
  width: 100px;
  margin: 0 auto;
}

.pleaseEnterData {
  background-color: rgb(112, 112, 112);
}

.pleaseEnterData:active {
  background-color: rgb(197, 0, 0);
}

.txtEnterData {
  text-align: center;
  font-family: sans-serif;
  font-weight: bold;
  color: rgb(197, 0, 0);
  font-size: 16px;
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

.btnAdd:hover {
  background-color: rgb(0, 71, 48);
}

.closeModalWindow:hover {
  background-color: rgba(10, 10, 10, 0.333);
}


</style>
