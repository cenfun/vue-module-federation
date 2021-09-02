import Vue from "vue";
import Sub from "./sub.vue";

new Vue({
    render: (h)=>{
        return h(Sub);
    }
}).$mount(".container");