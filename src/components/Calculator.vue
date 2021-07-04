<template>
  <div>
      <div>
          <!-- При клике по инпуту вызывается функция, которая отмечает соответствующую инпуту радиокнопку -->
          <input type="number" placeholder="number-1" v-model.number="varFirst" @click="setRadio('radio1')">  
          <input type="number" placeholder="number-2" v-model.number="varSecond" @click="setRadio('radio2')"> 
      </div>
      <div class="buttons">
          <button v-for="button in buttons" :title="button" :disabled="varSecond == 0" :key="button" @click="calculate(button)">{{ button }}</button>
      </div>
      <!-- <div>
          <button @click="calculate('+')">+</button>
          <button @click="calculate('-')">-</button>
          <button @click="calculate('*')">*</button>
          <button @click="calculate('/')">/</button>
          <button @click="calculate('^')">^</button>
      </div> -->
      <!-- <div><button @click="getEvent($event)">Event</button></div> -->
        Result: {{ result }}
        <div class="strange-message" v-if="result">
            <template v-if="result < 0">Отрицательный ответ</template>
            <template v-else-if="result < 100">Ответ меньше 100</template>
            <template v-else>Ответ больше 100</template>
        </div>


        <div class="error" v-show="error">
            Ошибка: {{ error }}
        </div>

        <!-- ЗАДАНИЕ №1 СКРЫТЬ/ПОКАЗАТЬ КЛАВИАТУРУ-->
        <div class="checkKeyboard">
            <input type="checkbox" id="checkboxKey" v-model="checkKeyboard"> 
            <label for="checkboxKey">Отобразить экранную клавиатуру</label>
        </div>    

        <!-- ЗАДАНИЕ №2 ВЫВОД КНОПОК 0-9 -->
        <div v-if="checkKeyboard">
            <button v-for="symbol in collection" :key="symbol" @click="detectSymbolRadioButton(symbol, numberRadio)">{{ symbol }}</button>  
            <!-- ЗАДАНИЕ №3 РАДИОКНОПКИ -->
            <div>
                <input type="radio" id="firstOp" value="radio1" v-model="numberRadio">
                    <label for="firstOp">Первый операнд</label>
                <input type="radio" id="secondOp" value="radio2" v-model="numberRadio"> 
                    <label for="secondOp">Второй операнд</label>
            </div>

        </div>

        <!-- <div>
            {{ logs }}
        </div>  Логи перенесены в консоль -->
  </div>
</template>

<script>
export default {
    name: "Calculator",
    data: () => ({
        varFirst: "",
        varSecond: "",
        result: "",
        buttons: ["+", "-", "*", "/", "^"],
        collection: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "←"],
        error: "",
        logs: {},
        checkKeyboard: false,
        numberRadio: ""
    }),

    methods: {
        calculate(operation) {
            this.error = "";
            switch(operation) {
                case "+":
                    this.addition();
                    break;
                case "-":
                    this.subtraction();
                    break
                case "*": 
                    this.multiplication();
                    break;
                case "/": 
                    this.division();
                    break;
                case "^": 
                    this.degree();
                    break;
            }


            const key = Date.now();
            const valueForKey = `${this.varFirst} ${operation} ${this.varSecond} = ${this.result}`;
            this.$set(this.logs, key, valueForKey);

            console.log(key + ":", this.$set(this.logs, key, valueForKey));
        },

   
        // calculate(operation) {
        //     debugger;
        //     const symbolOperation = {
        //         '+': () => this.varFirst + this.varSecond,
        //         '-': () => this.varFirst - this.varSecond,
        //         '*': () => this.varFirst * this.varSecond,
        //         '/': () => Math.floor(this.varFirst / this.varSecond),
        //         '^': () => this.varFirst ** this.varSecond
        //     }
        //     this.result = symbolOperation[operation]()
        // },

        addition() {
            this.result = this.varFirst + this.varSecond;
        },

        subtraction() {
            this.result = this.varFirst - this.varSecond
        },

        multiplication() {
            this.result = this.varFirst * this.varSecond
        },

        division() {
            const {varFirst, varSecond} = this
            if (varSecond == "0") {
                this.error = "Деление на 0"
            } else {
                this.result = Math.floor(varFirst / varSecond);
            }

            // this.result = Math.floor(this.varFirst / this.varSecond)
        },

        degree() {
            this.result = this.varFirst ** this.varSecond
        },

        // getEvent(event) {
        //     console.log("Событие ", event)
        // },

        // определяем символ нажатой кнопки
        detectSymbolRadioButton(symbol, numberRadio) {
            if (symbol == "←") {
                // если нужно стереть символ, вызываем функцию
                this.deleteSymbolInput(numberRadio); 
            } else {
                // функция ввода символа в инпут
               this.enterInput(symbol, numberRadio)
            }
        },

        // ввод символа в инпут
        enterInput(symbol, numberRadio) {
            // определяем, какой инпут выбран радиокнопкой и вводим в него символ
            if (numberRadio == "radio1") {
                this.varFirst += String(symbol);
            } else this.varSecond += String(symbol);
        },

        //  удаление символа
        deleteSymbolInput(numberRadio) {
            let stringInput = "";
            // определяем, какой инпут выбран радиокнопкой и удаляем последний символ
            // попытки оптимизировать код и убрать его копирование в этой функции были неуспешны
            if (numberRadio == "radio1") {
                stringInput = String(this.varFirst);
                this.varFirst = Number(stringInput.substring(0, stringInput.length - 1));
                if (this.varFirst == 0) this.varFirst = ""
            } else {
                stringInput = String(this.varSecond);
                this.varSecond = Number(stringInput.substring(0, stringInput.length - 1)); 
                if (this.varSecond == 0) this.varSecond = ""
            }
        },

        // при клике по инпуту будет отмечаться соответствующая ему радиокнопа
        setRadio(radio) {
            this.numberRadio = radio;
        }
    }
}

//при ошибке TypeError: this.getOptions понизить версию sass до 10.1.1
</script>

<style scoped> 
    .error {
        color: red;
    }
</style>