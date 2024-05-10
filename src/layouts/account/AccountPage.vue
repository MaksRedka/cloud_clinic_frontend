<template>
  <v-main style="--v-layout-left: 0px; --v-layout-top: 0px">
    <v-card>
        <v-navigation-drawer
          permanent
          color="primary"
        >
          <v-list>
            <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
              title="Микола Сірий"
              subtitle="john.doe@example.com"
            ></v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list density="compact" nav>
            <v-list-item :prepend-icon="mdiAccountMultiple" to="/card" title="Картки пацієнтів" ></v-list-item>
            <v-list-item :prepend-icon="mdiChat" title="Чати" to="/chats" ></v-list-item>
            <v-list-item :prepend-icon="mdiCard" title="Плани лікування" to="/plans" ></v-list-item>
            <v-list-item :prepend-icon="mdiBell" title="Сповіщення" to="/notifications" ></v-list-item>
          </v-list>
        </v-navigation-drawer>
    </v-card>
    <v-sheet>
      <MyCard v-if="getPage === 'card'"></MyCard>
      <Chats v-else-if="getPage === 'chats'"></Chats>
      <TreatmentPlans v-else-if="getPage === 'plans'"></TreatmentPlans>
      <Notifications v-else-if="getPage === 'notifications'"></Notifications>
    </v-sheet>
  </v-main>

</template>


<script setup lang="ts">
import { mdiChat, mdiCard, mdiAccountMultiple, mdiBell} from "@mdi/js"
import MyCard from "./MyCard.vue"
import TreatmentPlans from "./TreatmentPlans.vue"
import Chats from  "./Chats.vue"
import { appStore } from "../../store/app"
import { storeToRefs } from "pinia"
import Notifications from "@/components/Notifications.vue";

const store = appStore()
const { getPage } = storeToRefs(store)

</script>

<style>

</style>
