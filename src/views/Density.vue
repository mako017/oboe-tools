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
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
	public densities = [
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

	// get density() {
	// 	let density = (this.weight - this.base) / (this.weight - this.base + (this.base - this.buoyancy));
	// 	density = Math.round(density * 100) / 100;
	// 	return density;
	// }
}
</script>

<style lang="scss" scoped>
table {
	margin: auto;
}
</style>
