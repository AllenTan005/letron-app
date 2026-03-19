import Vue from "vue";
import Vuex from "vuex";

import { shop } from "./modules/shop";
import type { RootState } from "./types";

Vue.use(Vuex);

const store = new Vuex.Store<RootState>({
  modules: {
    shop,
  },
});

export default store;
