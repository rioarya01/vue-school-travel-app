<template>
    <div>
        <h1>こんにちは！、{{ username }}</h1>
        <button @click="logout" style="margin-right: 15px;">Log Out</button>
        <router-link :to="{name: 'invoices'}">
            <button>Invoices</button>
        </router-link>
    </div>
</template>
<script>
export default {
    data() {
        return {
            username: window.user
        };
    },
    methods: {
        logout() {
            window.user = null;
            this.$router.push({ name: "Home" });
        }
    }
};
</script>