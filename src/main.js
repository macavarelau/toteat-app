import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGaugeHigh,
  faBurger,
  faCreditCard,
  faUserGroup,
  faAngleDown,
  faChair,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faGaugeHigh,
  faBurger,
  faCreditCard,
  faUserGroup,
  faAngleDown,
  faChair
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(Buefy);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
