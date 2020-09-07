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
		<button @click="exportData" type="button">Export</button>
		<textarea v-model="csv"></textarea>
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
	csv = "";

	addRow(): void {
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
	exportData(): void {
		this.csv = this.toCSV(this.densities);
	}
	toCSV(json: Array<object>): string {
		const table = json;
		const header = Object.keys(table[0]);
		const csv = table.map((row: any) => header.map(fieldName => row[fieldName]).join("\t"));
		csv.unshift(header.join("\t"));
		return csv.join("\r\n");
	}
}
</script>

<style lang="scss" scoped>
.density-root {
	padding: 1rem;
	display: flex;
	flex-direction: column;
	* {
		margin: 0.5rem 0;
	}
	button {
		align-self: center;
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
	textarea {
		align-self: stretch;
		overflow-y: auto;
		min-height: 5rem;
	}
}
</style>
