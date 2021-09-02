import Vue from "vue";
import Sub2 from "./sub2.vue";

new Vue({
    render: (h)=>{
        return h(Sub2);
    }
}).$mount(".container");