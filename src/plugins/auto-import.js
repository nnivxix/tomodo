import ExampleJson from "@/components/ExampleJson.vue";
import FormCollection from "@/components/FormCollection.vue";
import FormTodo from "@/components/FormTodo.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import TitleApp from "@/components/TitleApp.vue";
import TodoItem from "@/components/TodoItem.vue";

export default {
  install: (app, options) => {
    app.component("FormTodo", FormTodo);
    app.component("TodoItem", TodoItem);
    app.component("ProgressBar", ProgressBar);
    app.component("TitleApp", TitleApp);
    app.component("FormCollection", FormCollection);
    app.component("ExampleJson", ExampleJson);
  },
};
