<template>
	<div class="density-root">
		<table>
			<thead>
				<th>Base Val</th>
				<th>Weight</th>
				<th>Buoyancy</th>
				<th>Density</th>
			</thead>
			<tbody>
				<tr v-for="(den, index) in densities" :key="index">
					<td><input @input="density(den)" type="number" v-model.number="den.base" /></td>
					<td><input @input="density(den)" type="number" v-model.number="den.weight" /></td>
					<td><input @input="density(den)" type="number" v-model.number="den.buoyancy" /></td>
					<td><input disabled type="number" v-bind="{ value: den.density }" /></td>
				</tr>
			</tbody>
		</table>
		<button type="button">Export</button>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
	densities = [
		{
			base: 0,
			weight: 0,
			buoyancy: 0,
			density: 0,
		},
	];

	addRow() {
		const lastWeight = this.densities[this.densities.length - 1].weight;
		if (lastWeight && lastWeight !== 0) {
			this.densities = [
				...this.densities,
				{
					base: 0,
					weight: 0,
					buoyancy: 0,
					density: 0,
				},
			];
		}
	}
	density(den: any): void {
		const density = (den.weight - den.base) / (den.weight - den.base + (den.base - den.buoyancy));
		den.density = Math.round(density * 100) / 100;
		this.addRow();
	}
}
</script>

<style lang="scss" scoped>
.density-root {
	padding: 1rem;
	* {
		margin: 0.5rem 0;
	}
	table {
		margin: 0.5rem auto;
		max-width: 100%;
		th {
			width: 25%;
		}
	}
	input {
		width: 100%;
	}
}
</style>
