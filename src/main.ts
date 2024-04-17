import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import install from "./package";
createApp(App).use(install.install).mount("#app");
