<template>
  <v-navigation-drawer
    color="primary"
  >
    <v-list class="d-flex justify-center">
      <v-list-item
        title="Чати"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>

      <v-list-item v-for="item in getChats" :prepend-icon="mdiChat" :title="item.title" @click="()=>{store.setActiveChat(item)}"></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-sheet v-if="getActiveChat.id !== -1">
    <Chat/>
  </v-sheet>
</template>

<script setup lang="ts">
import Chat from '@/components/Chat.vue';
import {mdiChat} from "@mdi/js";
import { appStore } from "../../store/app"
import { storeToRefs } from "pinia"

const store = appStore()
const { getChats, getActiveChat } = storeToRefs(store)
</script>

<style scoped>

</style>
