<template>
  <v-container>
    <v-row>
      <v-col cols="12">
          <v-autocomplete
                  :items="['Iван Іванович', 'Сергій Сергійович']"
                  class="w-33"
                  density="compact"
                  variant="solo"
                  label="Введіть ім'я пацієнта"
                  :append-inner-icon="mdiMagnify"
                  single-line
                  hide-details
          ></v-autocomplete>
      </v-col>
      <v-col cols="12">
        <v-expansion-panels v-model="panels" multiple>
          <v-expansion-panel>
            <v-expansion-panel-title class="d-flex justify-space-between align-center">
              Загальна інформація
              <!--            <v-btn @click="editMode = true" v-if="!editMode">Edit</v-btn>-->
            </v-expansion-panel-title>
            <!--            <span class="headline">{{ userData.name }}</span>-->
            <div class="d-flex">
              <v-expansion-panel-text class="w-50"><strong>Прізвище:</strong></v-expansion-panel-text>
              <v-expansion-panel-text>Іванов</v-expansion-panel-text>
            </div>
            <div class="d-flex">
              <v-expansion-panel-text class="w-50"><strong>Ім'я:</strong></v-expansion-panel-text>
              <v-expansion-panel-text>Іван</v-expansion-panel-text>
            </div>
            <div class="d-flex">
              <v-expansion-panel-text class="w-50"><strong>По батькові:</strong></v-expansion-panel-text>
              <v-expansion-panel-text>Іванович</v-expansion-panel-text>
            </div>
            <div class="d-flex">
              <v-expansion-panel-text class="w-50"><strong>Стать:</strong></v-expansion-panel-text>
              <v-expansion-panel-text>MALE</v-expansion-panel-text>
            </div>
            <div class="d-flex">
              <v-expansion-panel-text class="w-50"><strong>Дата народження:</strong></v-expansion-panel-text>
              <v-expansion-panel-text> 15.04.1992</v-expansion-panel-text>
            </div>
            <div class="d-flex">
              <v-expansion-panel-text class="w-50"><strong>Вік:</strong></v-expansion-panel-text>
              <v-expansion-panel-text> 32</v-expansion-panel-text>
            </div>

            <!--            <v-list>-->
            <!--              <v-list-item v-for="(value, key) in userData.additionalInfo" :key="key">-->
            <!--                <v-expansion-panel-text>{{ key }}</v-expansion-panel-text>-->
            <!--                <v-list-item-subtitle v-if="!editMode">{{ value }}</v-list-item-subtitle>-->
            <!--                <v-text-field v-if="editMode" v-model="editedData[key]"></v-text-field>-->
            <!--              </v-list-item>-->
            <!--            </v-list>-->


            <!--          <v-card-actions v-if="editMode">-->
            <!--            <v-btn @click="saveChanges" color="success">Save</v-btn>-->
            <!--            <v-btn @click="cancelEdit" color="error">Cancel</v-btn>-->
            <!--          </v-card-actions>-->
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title class="d-flex justify-space-between align-center">
              Контакти
              <!--            <v-btn @click="editMode = true" v-if="!editMode">Edit</v-btn>-->
            </v-expansion-panel-title>
            <!--            <span class="headline">{{ userData.name }}</span>-->
            <div class="d-flex">
              <v-expansion-panel-text class="w-50"><strong>Адреса:</strong></v-expansion-panel-text>
              <v-expansion-panel-text> Київ Вознесенська 2</v-expansion-panel-text>
            </div>
            <div class="d-flex">
              <v-expansion-panel-text class="w-50"><strong>Електронна адреса:</strong></v-expansion-panel-text>
              <v-expansion-panel-text> test@mail.com </v-expansion-panel-text>
            </div>
            <div class="d-flex">
              <v-expansion-panel-text class="w-50"><strong>Телефон:</strong></v-expansion-panel-text>
              <v-expansion-panel-text> +38095036213</v-expansion-panel-text>
            </div>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title class="d-flex justify-space-between align-center">
              Поточні плани
              <!--            <v-btn @click="editMode = true" v-if="!editMode">Edit</v-btn>-->
            </v-expansion-panel-title>
            <!--            <span class="headline">{{ userData.name }}</span>-->
            <div class="d-flex justify-center">
              <v-expansion-panel-text><strong>Активних планів немає</strong></v-expansion-panel-text>
            </div>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title class="d-flex justify-space-between align-center">
              Завантажити Файли МРТ
              <!--            <v-btn @click="editMode = true" v-if="!editMode">Edit</v-btn>-->
            </v-expansion-panel-title>
            <!--            <span class="headline">{{ userData.name }}</span>-->
            <div class="d-flex justify-center">
              <v-file-input multiple truncate-length="15"></v-file-input>
              <button>Завантажити</button>
            </div>
          </v-expansion-panel>
          <v-expansion-panel>
          <v-expansion-panel-title class="d-flex justify-space-between align-center">
              Переглянути Файли МРТ
              <!--            <v-btn @click="editMode = true" v-if="!editMode">Edit</v-btn>-->
            </v-expansion-panel-title>
            <!--            <span class="headline">{{ userData.name }}</span>-->
            <div class="d-flex justify-center">
              <v-btn>Переглянути</v-btn>
            </div>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {mdiMagnify} from "@mdi/js";
import axios from 'axios';
import dwv from "dwv";

console.log('Imported axios');

const userData = ref({
  name: 'John Doe',
  email: 'john.doe@example.com',
  additionalInfo: {
    age: 30,
    location: 'City',
    gender: 'male'
  },
});

const isDoctor = ref(true)
const panels = ref([])
const editedData = ref({age:30, location: 'City', gender: 'male'});
const editMode = ref(false);

onMounted(() => {
  editedData.value = {...userData.value.additionalInfo};
});

const saveChanges = () => {
  userData.value.additionalInfo = {...editedData.value};
  editMode.value = false;
};

const cancelEdit = () => {
  editMode.value = false;
  editedData.value = {...userData.value.additionalInfo};
};

methods: {
   async function sendData() {
    console.log('XXX', 'this.email', 'this.address', 'this.gender');
     console.log(await axios({
      url: 'http://localhost:3000/api/records',
       method: 'post',
       data: {
         name: 'this.name',
         email: 'this.email',
         address: 'this.address',
         gender: 'this.gender'
       }
      }));
   }
}

</script>