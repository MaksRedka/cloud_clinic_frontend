<template>
  <v-app-bar elevation="1">
    <v-app-bar-title @click="navigateToHome">
      <v-icon :icon=mdiHospital />
      Cloud clinic
    </v-app-bar-title>
    <v-btn v-if="!getIsAuthenticated" variant="outlined" @click="openDialog">Log in</v-btn>
      <div v-if="getIsAuthenticated">
          <v-btn class="mr-2"  variant="outlined" @click="navigateToAccount">Account</v-btn>
          <v-btn  variant="outlined" @click="logOut">Log out</v-btn>
      </div>


    <v-dialog v-model="dialogVisible" max-width="500">
      <v-card>
        <v-card-text>
          <RegistrationLoginForm @registration-success="closeDialog"/>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-app-bar>
</template>

<script setup lang="ts">
import {mdiHospital} from '@mdi/js'
import RegistrationLoginForm from "@/components/RegistrationLoginForm.vue";
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { appStore } from "../../store/app"
import { storeToRefs } from "pinia"

const store = appStore()
const { getIsAuthenticated } = storeToRefs(store)

const dialogVisible = ref(false);
const router = useRouter();

function navigateToHome() {
  router.push('/');
}

function navigateToAccount() {
  router.push('/card');
}

function logOut() {
  dialogVisible.value = false
  navigateToHome()
  store.logout()
}

const openDialog = () => {
  dialogVisible.value = true;
};

const closeDialog = () => {
  dialogVisible.value = false;
};
</script>
