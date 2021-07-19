import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        paymentsList: [],
        paymentPagination: [],
        categoryList: []
    },

    mutations: {
        setDataPaymentsList(state, payload) {
            for (let page in payload) {
                for (let i = 0; i < payload[page].length; i++)
                state.paymentsList.push(payload[page][i])
            }
        },

        addDataToPaymentsList(state, payload) {
            state.paymentsList.push(payload)
        },

        setCategories(state, payload) {
            state.categoryList.push(...payload)
        },

        setPagination(state, payload) {
            state.paymentPagination = []
            for (let i = (payload - 1) * 3; i < payload * 3; i++) {
                state.paymentPagination.push(state.paymentsList[i])
            }
        },

    },

    actions: {

        fetchData({commit}) {
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
                commit('setDataPaymentsList', res);
                commit('setPagination', 1);
            })
        },
        
        loadCategories({commit}) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(['Food', 'Car', 'Vacation', 'Helth', 'Pet', 'Furniture'])
                }, 1000)
            }).then(res => {
                commit('setCategories', res)
            })
        }

    },

    getters: {
        getPaymentPagination: state => [...state.paymentPagination],
        getCategoryList: state => state.categoryList,
        getFullPaymentValue: state => {
            return state.paymentsList.reduce((result, current)=> result + current.value, 0)
        }

    }
})