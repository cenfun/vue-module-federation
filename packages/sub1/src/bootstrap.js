import Vue from "vue";
import Sub1 from "./sub1.vue";

new Vue({
    render: (h)=>{
        return h(Sub1);
    }
}).$mount(".container");