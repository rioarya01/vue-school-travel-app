<template>
    <div class="home">
        <h1>All Destinations</h1>
        <!-- <button @click="triggerRouterError">Trigger Router Error</button> -->
        <button @click="addDynamicRoute">Add Dynamic Route</button>
        <router-link to="/dynamic">Visit Dynamic Route</router-link>
        <div class="destinations">
            <router-link v-for="destination in destinations"
            :key="destination.id"
            :to="{name: 'destination.show', params: {id: destination.id, slug: destination.slug}}"
            >
                <h2>{{ destination.name }}</h2>
                <img :src="`/images/${destination.image}`" :alt="destination.name">
            </router-link>
        </div>
    </div>
</template>
<script>
import sourceData from "@/data.json";
// import { isNavigationFailure, NavigationFailureType } from "vue-router";
export default {
    name: "Home",
    data() {
        return {
            destinations: sourceData.destinations
        };
    },
    methods: {
        // async triggerRouterError() {
        //     const navigationFailure = await this.$router.push("/")
        //     if(isNavigationFailure(navigationFailure, NavigationFailureType.duplicated)){
        //         console.log(navigationFailure.to)
        //         console.log(navigationFailure.from)
        //     } else {
        //         // all is well
        //     }
        // }

        addDynamicRoute() {
            this.$router.addRoute({
                name: "dynamic",
                path: "/dynamic",
                component: () => import("@/views/Login.vue"),
            })
            // Jika fungsi dibawah ini digunakan, maka halaman login pada button add Dynamic Route tidak akan berfungsi dan tidak akan mengarah kehalaman login.
            this.$router.removeRoute("dynamic")
        }
    }
};
</script>