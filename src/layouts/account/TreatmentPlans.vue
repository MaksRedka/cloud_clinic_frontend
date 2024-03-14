<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card variant="outlined" class="pa-2">
          <v-card-title>
            Плани лікування
          </v-card-title>
          <div>
            <v-list>
              <!-- Виведення планів лікування -->
              <v-list-item
                  variant="outlined"
                  rounded
                  class="mt-1"
                  v-for="plan in treatmentPlans"
                  :key="plan.id"
                  @click="toggleExpanded(plan.id)"
              >
                <!-- Відображення заголовку плану лікування -->
                <div>
                  <v-list-item-title>
                    <strong>{{ plan.name }}</strong>
                  </v-list-item-title>
                  <v-list-item-subtitle v-if="isDoctor">{{ plan.patient }}</v-list-item-subtitle>
                </div>

                <!-- Відображення деталей плану лікування, якщо розгорнуто -->
                <div v-if="expandedPlanId === plan.id">
                  <v-row class="mt-1">
                    <v-col cols="4"><strong>Дата початку:</strong></v-col>
                    <v-col cols="8">2.2.2024</v-col>
                    <v-col cols="4"><strong>Дата закінчення:</strong></v-col>
                    <v-col cols="8">15.12.2024</v-col>
                  </v-row>
                  <v-card variant="outlined" style="height: 50px; margin-top: 5px; padding: 10px;">{{
                      plan.diagnosis
                    }}
                  </v-card>
                  <v-card variant="outlined" style="height: 50px; margin-top: 5px; padding: 10px;">{{
                      plan.description
                    }}
                  </v-card>

                  <v-list>
                    <v-list-item

                        rounded
                        class="mb-1"
                        v-for="item in plan.items"
                        :key="item.id"
                        @click="toggleExpandedItem(item.id, $event)"
                        :base-color="item.color"
                        :variant="item.variant"
                    >
                      <div class="d-flex">
                        <v-list-item-title class="w-33"><strong>{{ item.name }}</strong></v-list-item-title>
                        <v-list-item-title class="w-33 d-flex justify-start ">
                          {{
                            'Виконати до: ' + item.dueDate.getDate() + '.' + (item.dueDate.getMonth() + 1) + '.' + item.dueDate.getFullYear()
                          }}
                        </v-list-item-title>
                        <v-btn v-if="item.color === ''" class="ml-auto" color="error" variant="outlined"
                               @click="(event)=>{event.stopPropagation(); openForm();}">Видалити
                        </v-btn>
                      </div>
                      <div v-if="expandedPlanItem === item.id">
                        {{ item.description }}
                      </div>
                    </v-list-item>
                  </v-list>
                  <!-- Додайте іншу інформацію про план лікування за потребою -->
                </div>
                  <v-btn v-if="expandedPlanId === plan.id" class="ml-auto" color="primary" variant="flat"
                         @click="(event)=>{event.stopPropagation(); openForm();}">Звершити план
                  </v-btn>
                  <v-btn v-if="expandedPlanId === plan.id" class="ml-1" color="primary" variant="flat"
                         @click="(event)=>{event.stopPropagation(); openForm();}">Додати крок
                  </v-btn>
              </v-list-item>
            </v-list>
          </div>

            <v-dialog v-model="formVisible" max-width="600">
                <v-card>
                    <v-card-title class="d-flex justify-center">Test name</v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-textarea label="Додайте коментар" required></v-textarea>
<!--                            <v-text-field  label="test input" required></v-text-field>-->
<!--                            <v-select :items="['variant 1','variant2','variant3']" label="test input2" required></v-select>-->
<!--                            <v-text-field  label="test input3" required></v-text-field>-->

                            <v-btn color="primary" @click="markAsDone">Завершити план</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>

          <!-- Кнопка для лікаря, щоб відкрити форму створення плану лікування -->
          <v-card-actions v-if="isDoctor">
            <v-btn variant="flat" color="primary" @click="openCreateForm">Створити план лікування</v-btn>
          </v-card-actions>
        </v-card>

        <!-- Форма створення плану лікування -->
        <v-dialog v-model="createFormVisible" max-width="1200px">
          <v-card>
            <v-card-title>Створення плану лікування</v-card-title>
            <v-card-text>
              <!-- Форма для введення даних плану лікування -->
              <v-form @submit.prevent="saveTreatmentPlan">
                <v-text-field v-model="treatmentPlan.name" label="Назва плану"></v-text-field>
                <v-autocomplete :items="['Микола Сірий', 'Іван Іванович', 'Петро Петрович']"
                                v-model="treatmentPlan.patient" label="Пацієнт"></v-autocomplete>
                <v-text-field v-model="treatmentPlan.diagnosis" label="Діагноз"></v-text-field>
                <v-textarea v-model="treatmentPlan.description" label="Опис плану"></v-textarea>
                <v-text-field type="date" width="300" v-model="testDate" :label="`Початок плану`"></v-text-field>
                <v-text-field type="date" width="300" v-model="testDate2" :label="`Кінець плану`"></v-text-field>
                <!--                add patient select-->
                <v-divider class="my-4"></v-divider>

                <div class="d-flex flex-wrap mr-5">
                  <v-card class="w-50 pa-5" v-for="(item, index) in treatmentPlan.items" :key="index">
                    <v-row>
                      <v-col cols="12">
                        <v-text-field v-model="item.name" :label="`Назва пункту`"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-select :items="['MEDICINE', 'CONSULTATION', 'PROCEDURE', 'OBSERVATION', 'SURVEY']"
                                  v-model="planType" :label="`Оберіть тип`"></v-select>
                      </v-col>
                      <v-col cols="12" v-if="planType !== ''">
                        <v-text-field v-if="planType === 'MEDICINE'" :label="`Впишіть частоту прийому`"></v-text-field>
                        <v-select :items="['Тест на COVID-19', 'Аналіз крові', 'Повне обстеження']"
                                  v-else-if="planType === 'OBSERVATION'" :label="`Оберіть дослідження`"></v-select>
                        <v-select
                            :items="['Температура тіла', 'Сердцебиття у стані спокою', 'Сердцебиття після 30 присідань']"
                            v-else-if="planType === 'SURVEY'" :label="`Впишіть частоту прийому`"></v-select>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea v-model="item.description" :label="`Опис пункту`"></v-textarea>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field type="date" width="300" v-model="item.dueDate"
                                      :label="`Початок виконання кроку`"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field type="date" width="300" v-model="item.dueDate"
                                      :label="`Кінцевий строк виконання`"></v-text-field>
                      </v-col>
                      <v-btn color="error" class="d-flex ml-auto" @click="deletePlanItem" variant="flat">Delete</v-btn>
                    </v-row>
                  </v-card>
                </div>
                <v-btn class="mt-5" @click="addTreatmentItem(treatmentPlan.items.length)" color="primary">Додати пункт
                </v-btn>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn variant="flat" color="error" @click="closeCreateForm">Скасувати</v-btn>
              <v-btn variant="flat" color="success" @click="saveTreatmentPlan">Зберегти</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {ref} from 'vue';
import {useDate} from 'vuetify'

const adapter = useDate()
const testDate = ref()
const testDate2 = ref()
const planType = ref('')
const formVisible = ref(false);
const isDoctor = ref(true); // Замініть це значення на вашу логіку перевірки, чи користувач - лікар
const expandedPlanId = ref(null);
const expandedPlanItem = ref(null);
const treatmentPlans = ref([
  {
    id: 1,
    name: 'План 1',
    diagnosis: 'Діагноз 1',
    description: 'Опис плану 1',
    patient: 'maks',
    items: [
      {
        id: 1,
        name: 'Пункт 1',
        description: 'Опис пункту 1',
        dueDate: new Date('2024-02-05'),
        isDone: false,
        color: 'success',
        variant: 'outlined'
      },
      {
        id: 2,
        name: 'Пункт 2',
        description: 'Опис пункту 2',
        dueDate: new Date('2024-02-10'),
        isDone: false,
        color: 'error',
        variant: 'outlined'
      },
      {
        id: 3,
        name: 'Пункт 3',
        description: 'Опис пункту 3',
        dueDate: new Date('2024-02-15'),
        isDone: false,
        color: '',
        variant: 'tonal'
      },
      {
        id: 4,
        name: 'Пункт 4',
        description: 'Опис пункту 4',
        dueDate: new Date('2024-02-16'),
        isDone: false,
        color: '',
        variant: 'tonal'
      },
    ],
  },
  {
    id: 2,
    name: 'План 2',
    diagnosis: 'Діагноз 2',
    description: 'Опис плану 2',
    patient: 'anna',
    items: [
      {id: 1, name: 'Пункт 1', description: 'Опис пункту 1', dueDate: new Date('2024-01-05')},
      {id: 2, name: 'Пункт 2', description: 'Опис пункту 2', dueDate: new Date('2024-01-04')},
    ],
  },
]); // Замініть це значення на ваші дані планів лікування
const treatmentPlan = ref({
  name: '',
  diagnosis: '',
  description: '',
  patient: '',
  items: [],
});

const addTreatmentItem = (id) => { //TODO complete function.
  console.log(planType.value)
  treatmentPlan.value.items.push({
    id: parseInt(id),
    name: '',
    description: '',
    dueDate: new Date(),
    dueHour: '00',
    dueMinute: '00',
  });
  console.log(treatmentPlan.value.items)
};
const createFormVisible = ref(false);

const openCreateForm = () => {
  createFormVisible.value = true;
  console.log(planType.value)
};

const closeCreateForm = () => {
  createFormVisible.value = false;
};

const deletePlanItem = (index) => {
  treatmentPlan.value.items.splice(index, 1);
};

const saveTreatmentPlan = () => {//TODO complete function.
  // Реалізуйте логіку для збереження плану лікування
  console.log(treatmentPlan.value.items);
  closeCreateForm();
};

const toggleExpanded = (planId) => {
  expandedPlanId.value = expandedPlanId.value === planId ? null : planId;
};
const toggleExpandedItem = (item, event) => {
  event.stopPropagation();
  expandedPlanItem.value = expandedPlanItem.value === item ? null : item;
};

const openForm = () => {
    formVisible.value = true;
};
const markAsDone = () => {
    // Логіка для позначення виконаним (можна додати збереження в базу даних, тощо)
    alert('Завдання відзначено виконаним!');
    // Закриваємо форму
    formVisible.value = false;
};

</script>
