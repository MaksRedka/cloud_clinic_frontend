<template>
  <v-form @submit.prevent="logIn">
    <v-container>
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <v-btn color="primary" class="w-25 rounded-e-0 " @click="logInRequestType">Log in</v-btn>
          <v-btn color="primary" class="w-25 rounded-s-0 " @click="signUpRequestType">Sign up
          </v-btn>
        </v-col>
        <div class="w-100" v-if="logInBtn === 'flat'">
          <v-col cols="12">
            <v-text-field
                v-model="formData.email"
                :rules="emailRules"
                label="E-mail"
                required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
                :append-inner-icon="show1 ? mdiEye : mdiEyeOff"
                :type="show1 ? 'text' : 'password'"
                @click:append-inner="show1 = !show1"
                v-model="formData.password"
                :rules="passwordRules"
                label="Password"
                required
            ></v-text-field>
          </v-col>
        </div>

        <div class="w-100" v-if="singUpBtn === 'flat'">
          <v-col cols="12">
            <v-text-field
                v-model="formData.firstname"
                :rules="nameRules"
                :counter="10"
                label="First name"
                required
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
                v-model="formData.lastname"
                :rules="nameRules"
                :counter="10"
                label="Last name"
                required
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
                v-model="formData.email"
                :rules="emailRules"
                label="E-mail"
                required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
                v-model="formData.password"
                :rules="passwordRules"
                label="Password"
                required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-switch v-model="formData.isDoctor" label="Doctor"></v-switch>
          </v-col>
        </div>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-btn type="submit" color="primary" block class="mt-2" :disabled="!isFormValid">Submit</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
import {ref, computed} from "vue";
import {appStore} from "../store/app"
import {storeToRefs} from "pinia"
import {useRouter} from "vue-router";
import { mdiEyeOff, mdiEye } from "@mdi/js";

const router = useRouter();

const store = appStore()
const emit = defineEmits(['registration-success'])

const show1 = ref(false)

const nameRules = [
  (value: string) => {
    if (value) {
      if (value?.length <= 10) return true;
      return 'Name must be less than 10 characters.';
    }
    return 'Name is required.';
  },
];

const emailRules = [
  (value: NonNullable<string | undefined>) => {
    if (value) {
      if (/.+@.+\..+/.test(value)) return true;
      return 'E-mail must be valid.';
    }
    return 'E-mail is required.';
  },
];

const passwordRules = [
  (value: string) => !!value || 'Password is required.',
  (value: string) => (value && value.length >= 8) || 'Password must be at least 8 characters.',
];

const logInBtn = ref('flat')
const singUpBtn = ref('tonal')


const formData = ref({
  formType: 'logIn',
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  isDoctor: false,
});

function logInRequestType() {
  formData.value.formType = 'logIn'
  logInBtn.value = 'flat'
  singUpBtn.value = 'tonal'
}

function signUpRequestType() {
  formData.value.formType = 'signUp'
  logInBtn.value = 'tonal'
  singUpBtn.value = 'flat'
}

const isFormValid = computed(() => {
  if (singUpBtn.value === 'flat') {
    return Object.values(formData.value).slice(0, -1).every(value => !!value) &&
        nameRules.every(rule => rule(formData.value.firstname) === true) &&
        nameRules.every(rule => rule(formData.value.lastname) === true) &&
        emailRules.every(rule => rule(formData.value.email) === true) &&
        passwordRules.every(rule => rule(formData.value.password) === true);
  } else if (logInBtn.value === 'flat') {
    return Object.values(formData.value).slice(3, -1).every(value => !!value) &&
        emailRules.every(rule => rule(formData.value.email) === true) &&
        passwordRules.every(rule => rule(formData.value.password) === true);
  }
});

function logIn() {
  if (formData.value.formType === 'logIn') {
    store.login(formData.value.email, formData.value.password)
    emit('registration-success');
    router.push('/card');
    console.log(formData)
  } else if (formData.value.formType === 'signUp') {

  }
}

</script>

<style scoped>

</style>
