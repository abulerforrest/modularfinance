import { observable } from "mobx";

export class NewsPageFilterModel {

	@observable public searchQuery = "";
	@observable public currentLang = "";
	@observable public currentType = "";
	@observable public selectedTypes: string[] = [];
	@observable public selectedLanguages: string[] = [];

	@observable public selectedToDate: Date = null!;
	@observable public selectedFromDate: Date = null!;

	public toJson() {
		return {
			searchQuery: this.searchQuery,
			currentLang: this.currentLang,
			currentType: this.currentLang,
			selectedToDate: this.selectedToDate,
			selectedFromDate: this.selectedFromDate,
			selectedTypes: this.selectedTypes,
			selectedLanguages: this.selectedLanguages
		}
	}
}