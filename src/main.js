import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";


Vue.config.productionTip = false;

import Scroller from "@/components/Scroller";
Vue.component("Scroller", Scroller);

import Loading from './components/Loading'
Vue.component("Loading", Loading);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
