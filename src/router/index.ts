import passwordForm from "@/pages/PasswordForm.vue";
import passwordList from "@/pages/PasswordList.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '', redirect: { name: 'password-list' } },
        { path: '/passwords/', component: passwordList, name: 'password-list' },
        { path: '/passwords/new/', component: passwordForm, name: 'create-password' },
        { path: '/passwords/:id/', component: passwordForm, name: 'change-password', props: true }
    ]
})

export default router