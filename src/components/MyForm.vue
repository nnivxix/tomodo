<template>
    <div class="bg-white">
    <TitleApp></TitleApp>
    <Form :validation-schema="schemaYup" class="px-5" @submit="submit">
      <label for="todo" class=" text-m-form-label">What you do?</label>
      <Field autofocus value=""
        class="text-m-sub-1 bg-gray-50 px-4 border-l-transparent border-r-transparent border-t-transparent border-gray-500 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2" name="todo" type="text" />
        <hr class="text-dark-one">
      <ErrorMessage name="todo" class="text-red-500 font-light" />
      <br>

      <label for="time" class=" text-m-form-label">When will you do that?</label>
      <Field
        class="px-4 text-m-sub-1 bg-gray-50  border-l-transparent border-r-transparent border-t-transparent border-gray-500 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2"
        name="time" type="time"
      />
        <hr class="text-dark-one">
      <ErrorMessage name="time" class="text-red-500 font-light" />
      <br>


      <label for="priority" class=" text-m-form-label">How do you priority your to do?</label>
      <br>

      <br>
      <field as="select" name="priority"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded">
        <option value="basic">basic</option>
        <option value="urgent">urgent</option>
        <option value="important">important</option>
      </field>
      <ErrorMessage name="priority" class="text-red-500 font-light" />
      <br>
      <!-- <field type="hidden" name="done" value=false>
      </field> -->
      <div class="w-full flex justify-center fixed bottom-6 " as="button">
        <button  class=" p-5 bg-[#032836] text-center text-white rounded-lg">Add Task</button>
      </div>
    </Form>
  </div>
</template>

<script setup>

import TitleApp from './TitleApp.vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { todos, addTodo, isEditing, todoItem , editTodo, getIdTodo } from '../composable/todo'
import { onMounted } from 'vue';
import db from '../helper/database';

// console.log(editTodo(1,false))
let schemaYup = yup.object({
  todo : yup.string().required().min(3),
  time : yup.string().required()
}) 

function submit (value, {resetForm}) {

  addTodo(value);
  console.log(todoItem.value)
  
  resetForm()
}


</script>
