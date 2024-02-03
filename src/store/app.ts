// Utilities
import {defineStore} from 'pinia'
import post from "axios"

export const appStore = defineStore('app', {
    state: () => ({
        current_page: 'card',
        current_chat: {id: -1, title: 'Empty'},
        chats: [{id: 0, title: 'Іван Іванович'}, {id: 1, title: 'Сергій сергійович'}],
        isAuthenticated: true,
        user: {},
    }),
    getters: {
        getPage(state) {
            return state.current_page
        },
        getChats(state) {
            return state.chats
        },
        getActiveChat(state) {
            return state.current_chat
        },
        getUser(state) {
            return state.user
        },
        getIsAuthenticated(state) {
            return state.isAuthenticated
        }
    },
    actions: {
        setPage(page: string) {
            this.current_page = page
        },
        setActiveChat(chat: { id: number, title: string }) {
            this.current_chat = chat
        },
        login(username: string, password: string) {
            // Реалізуйте ваш логін тут і оновіть стан автентифікації
            // Якщо автентифікація успішна, оновіть isAuthenticated та user
            this.isAuthenticated = true;
            this.user = {};
        },
        logout() {
            // Реалізуйте ваш вихід тут і скиньте стан автентифікації
            this.isAuthenticated = false;
            this.user = {};
        },
    }
})
