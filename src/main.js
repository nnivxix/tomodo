import { createApp } from "vue";
import "./index.css";
import router from "./router";

import App from "./App.vue";
import autoImport from "./plugins/auto-import";

const app = createApp(App);

app.use(router);
app.use(autoImport);
app.mount("#app");
