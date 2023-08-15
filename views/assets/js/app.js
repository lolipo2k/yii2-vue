import Home from './pages/Home.vue';
import Vue from 'vue'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

new Vue({
    render: h => h(Home)
}).$mount('#app')
