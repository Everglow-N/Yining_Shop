import Vuex from 'vuex'
import Vue from 'vue'
import home from './home';
import search from './search';
import login from './login/index'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{   
        home,
        search,
        login,
    }

})