import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import globals from "./plugins/register-components";

import "./assets/css/tailwind.css";
import "./assets/scss/style.scss";

const app = createApp(App);
app.use(router);
app.use(globals);
app.mount("#app");
