<template>
  <div>
    <v-row v-if="notifications.length > 0" align="center" justify="center">
      <v-col v-for="notification in notifications" :key="notification.id" cols="12" md="4" class="mt-3">
        <v-card @click="toggleNotificationSize(notification.id)" class="mb-2">
          <v-card-title class="headline" v-text="notification.title"></v-card-title>
          <v-expand-transition>
            <v-card-text v-if="expandedNotificationId === notification.id" v-text="notification.description"></v-card-text>
          </v-expand-transition>
          <v-card-actions>
            <v-btn @click="removeNotification(notification)" color="error">Видалити</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else align="center" justify="center">
      <v-col cols="12">
        <v-alert class="mb-2" color="info" dense icon="mdi-information">
          Немає сповіщень
        </v-alert>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { appStore } from "@/store/app"
import { storeToRefs } from "pinia"

const store = appStore();
const expandedNotificationId = ref(null);

const notifications = ref([
  { id: 1, title: 'Test notification', description: 'Pleas dont forget to check next action in TEST PLAN. Next action date is 10-02-2024'},
  { id: 2, title: 'Сповіщення 2', description: 'Опис сповіщення 2'},
  // Додайте інші сповіщення за необхідністю
]);

const toggleNotificationSize = (notification) => {
  expandedNotificationId.value = expandedNotificationId.value === notification ? null : notification;
};

const removeNotification = (notification) => {
  const index = notifications.value.indexOf(notification);
  if (index !== -1) {
    notifications.value.splice(index, 1);
  }
};
</script>

<style scoped>
/* Додайте стилізацію за вашими потребами */
</style>
