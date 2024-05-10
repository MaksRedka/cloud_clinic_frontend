<template>
    <v-container class="chat-container" fluid >
        <v-row class="d-flex justify-center">
            <v-col cols="12">
                <v-card class="chat-card" elevation="2">
                    <v-card-title class="headline text-center"> {{ getActiveChat.title }}</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text class="chat-messages" ref="chatMessages">
                        <!-- Виведення повідомлень у чаті -->
                        <v-list>
                            <v-list-item v-for="message in messages" :key="message.id">
                                <v-row>
                                    <v-col :class="{ 'message-sent': message.sender === 'User1', 'message-received': message.sender === 'User2' }">
                                        <span>
                                            <v-row class="message-bubble" :class="{ 'message-bubble-sent': message.sender === 'User1', 'message-bubble-received': message.sender === 'User2' }">
                                                {{ message.text }}
                                            </v-row>
                                        </span>
                                    </v-col>
                                </v-row>
                            </v-list-item>
                        </v-list>
                    </v-card-text>

                    <!-- Форма для введення нового повідомлення -->
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-form @submit.prevent="sendMessage" class="message-form">
                            <v-row>
                                <v-col cols="11">
                                    <v-text-field v-model="newMessage" label="Type a message..." outlined></v-text-field>
                                </v-col>
                                <v-col cols="1" class="d-flex justify-center pr-5">
                                    <v-btn type="submit" :disabled="newMessage.trim() === ''" color="primary">
                                        <v-icon class="mt-2" :icon="mdiSend" size="40"></v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue';
import { mdiSend } from "@mdi/js"
import { appStore } from "../store/app"
import { storeToRefs } from "pinia"
import {  } from "requirejs"

const store = appStore()
const { getActiveChat } = storeToRefs(store)

const messages = reactive([
    { id: 1, sender: 'User1', text: 'Hello!' },
    { id: 2, sender: 'User2', text: 'Hi there!' },
]);

const newMessage = ref('');
const chatMessages = ref(null);

const sendMessage = () => {
    if (newMessage.value.trim() === '') {
        return; // Не відправляти порожні повідомлення
    }

    const message = { id: messages.length + 1, sender: 'User1', text: newMessage.value };
    messages.push(message);
    newMessage.value = '';
    nextTick(() => {
        var getChatMessages = chatMessages?.value?.$el?.scrollTop;
        getChatMessages = chatMessages?.value?.$el?.scrollHeight;
    });

};

onMounted(() => {
    // Додаємо перші дані у чат при завантаженні компоненти
    nextTick(() => {
        var getChatMessages = chatMessages?.value?.$el?.scrollTop;
        getChatMessages = chatMessages?.value?.$el?.scrollHeight;
    });
});
</script>

<style scoped>
.chat-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.chat-card {
    height: 90vh;
    width: 100%;
    overflow: hidden;
}

.chat-messages {
    height: 85%;
    overflow-y: auto;
}

.message-sent {
    text-align: right;
}

.message-received {
    text-align: left;
}

.message-bubble {
    position: relative;
    display: inline-block;
    max-width: 70%;
    word-wrap: break-word;
    overflow-wrap: break-word;
    margin: 8px;
    padding: 8px; /* додаємо padding тут */
    box-sizing: border-box; /* додаємо це */
    border-radius: 20px;
    text-align: left;
}

.message-bubble-sent {
    background-color: #2196F3;
    color: white;
}

.message-bubble-received {
    background-color: #0c4a62;
    color: white;
}

.message-form {
    width: 100%;
}
</style>
