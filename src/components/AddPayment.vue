<template>
    <div>
        <!-- кнопка отображения окна для добавления данных -->
        <button class="btnModal btnAddNewCost" @click="modalWindowVisible">add new cost</button>
        <div class="modalBlock" v-if="modalWindow">
            <input type="text" v-model.trim="date" placeholder="Date" class="enterDatas">
            <input type="text" v-model.trim="category" placeholder="Category" class="enterDatas" list="categoryList">
                <datalist id="categoryList">
                    <select v-model="selected">
                        <option v-for="(option, idx) in getCategoryList" :key="idx" :value="option">
                            {{ option }}
                        </option>
                    </select>
                </datalist>
            <input type="number" v-model.number="value" placeholder="Value" class="enterDatas">
            <button @click="onClick" class="btnAddNewCost">add</button>
        </div>




    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: "AddPayment",
    data: () => ({
        date: "",
        category: "",
        value: null,
        button: "",
        modalWindow: false,
        selected: ''
    }),


    methods: {
        onClick() {
            const { category, value } = this
            // const data = [this.date || this.getCurrentDate, category, value]
            const data = {
                date: this.date || this.getCurrentDate,
                category,
                value
            }
            
            this.$emit("addNewPayment", data)
        },

        // функция отображения окна для добавления данных
        modalWindowVisible() {
            if (this.modalWindow) this.modalWindow = false
            else this.modalWindow = true;
        }
    },

    computed: {
        ...mapGetters([
            'getCategoryList'
        ]),

        ...mapActions([
            'loadCategories'
        ]),

        getCurrentDate() {
            const today = new Date();
            let day = today.getDate(); 
            // делаю из "n" в "0n"
                if ((String(day)).length == 1) {
                    day = ((String(day)) + "0").split("").reverse().join("")
                }
            let month = today.getMonth() + 1;
            // делаю из "n" в "0n" 2.7.2021 => 02.07.2021
                if ((String(month)).length == 1) {
                    month = ((String(month)) + "0").split("").reverse().join("")
                }
            const year = today.getFullYear();
    
            return `${day}.${month}.${year}`
        }
    },

    mounted() {
        if (!this.getCategoryList.length) {
            this.loadCategories
        }
    }
}
</script>

<style scoped>
    .btnAddNewCost {
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

    .btnAddNewCost:after {
        content: "\00a0 \00a0 +"
    }
    
    .modalBlock {
        width: 350px;
        height: 250px;
        border: 2px solid rgb(109, 109, 109);
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 20px;
        margin: 0 0 20px;
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
</style>