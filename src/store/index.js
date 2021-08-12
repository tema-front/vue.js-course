import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        runDashboard: 0,
        paymentsList: [],
        paymentPagination: [],
        categoryList: [],
        currentNumberButton: 1,
        quntityButtons: 0
    },

    mutations: {

        setDataPaymentsListMT(state, payload) {
            if (state.runDashboard == 1) return
            debugger
            state.runDashboard = 1;
            for (let page in payload) {
                for (let i = 0; i < payload[page].length; i++)
                state.paymentsList.unshift(payload[page][i])
            }
            state.quntityButtons = Math.ceil(state.paymentsList.length / 3);
            state.currentNumberButton = state.quntityButtons
        },

        addDataToPaymentsListMT(state, payload) {

            Vue.set(state.paymentsList, state.paymentsList.length, payload)
            // state.paymentsList.push(payload)
            state.quntityButtons = Math.ceil(state.paymentsList.length / 3);
            state.currentNumberButton = state.quntityButtons
        },

        setCategoriesMT(state, payload) {
            state.categoryList.push(...payload)
        },

        setPaginationMT(state, payload) {
            state.quntityButtons = Math.ceil(state.paymentsList.length / 3);
            // state.currentNumberButton = state.quntityButtons
            // this.$route.params.page = payload;
            state.currentNumberButton = payload;
            state.paymentPagination = [];
            for (let i = (payload - 1) * 3; i < payload * 3; i++) {
                // state.paymentPagination.push(state.paymentsList[i])
                Vue.set(state.paymentPagination, state.paymentPagination.length, state.paymentsList[i])
            }
        }

    },

    actions: {

        loadDataAC({commit}, state) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(
                        {
                            page1: [
                              {date: "20.03.2020", category: "Food", value: 169},
                              {date: "21.03.2020", category: "Navigation", value: 50},
                              {date: "22.03.2020", category: "Sport", value: 450}
                            ],
                            page2: [
                              {date: "23.03.2020", category: "Entertaiment", value: 969},
                              {date: "24.03.2020", category: "Education", value: 1500},
                              {date: "25.03.2020", category: "Food", value: 200}
                            ],
                            page3: [
                              {date: '05.08.2021', category: 'Vacation', value: 45000},
                              {date: '03.09.2021', category: 'Helth', value: 2200},
                              {date: '25.11.2021', category: 'Car', value: 655000}
                            ]
                        } 
                    )
                }, 1000)
            }).then(res => {
                commit('setDataPaymentsListMT', res);
                if (state.$route.params.page) commit('setPaginationMT', state.$route.params.page)
                else commit('setPaginationMT', this.getters.getQuntityButtonsGT ) 
                
            })
        },
        
        loadCategoriesAC({commit}) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(['Food', 'Car', 'Vacation', 'Helth', 'Pet', 'Furniture'])
                }, 1000)
            }).then(res => {
                commit('setCategoriesMT', res)
            })
        }

    },
// d2 c2ac a1a8
    getters: {
        getPaymentsPaginationGT: state => [...state.paymentPagination],
        getCategoryListGT: state => state.categoryList,
        getCurrentNumberButtonGT: state => state.currentNumberButton,
        getQuntityButtonsGT: state => state.quntityButtons,
        getFullPaymentValueGT: state => {
            return state.paymentsList.reduce((result, current)=> result + current.value, 0)
        }
    }
})