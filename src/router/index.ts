import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";
import Density from "@/views/Density.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/density",
		name: "Density",
		component: Density,
	},
];

const router = new VueRouter({
	routes,
});

export default router;
