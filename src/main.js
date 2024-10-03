import { createApp } from "vue";
import router from "./router";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import "highlight.js/styles/stackoverflow-light.css";
import "highlight.js/lib/common";
import "./index.css";

import App from "./App.vue";
import autoImport from "./plugins/auto-import";

const app = createApp(App);

app.use(router);
app.use(autoImport);
app.use(hljsVuePlugin);
app.mount("#app");
