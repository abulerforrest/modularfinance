import {
	action,
	observable
} from "mobx";

import { createViewModel } from "mobx-utils";
import {ViewModel } from "../interfaces/ViewModel";
import { DatePickerType } from "./NewsPageController";
import { MaterialUiPickersDate } from "@material-ui/pickers";
import { addDays } from "date-fns/esm";
import { subDays } from "date-fns";

export interface INewsPageFilterController<T> {
	filterModel: T
	showReset: boolean
	filterViewModel: ViewModel<T>
	activeDatePicker: DatePickerType;

	onSearch: () => void,
	onClearFilter: () => void,
	onChangeFilter: (key: keyof T, value: any) => void
}

interface IModel {
	toJson:() => {};
}

export abstract class NewsPageFilterController<T extends IModel>
	implements INewsPageFilterController<T> {

	protected readonly initialState: Partial<T>;

	@observable filterModel: T;
	@observable filterViewModel: ViewModel<T>;
	@observable activeDatePicker: DatePickerType = null!;

	constructor(filterModel: T) {
		this.filterModel = filterModel;
		this.initialState = filterModel.toJson();
		this.filterViewModel = createViewModel(this.filterModel);
	}

	public abstract get showReset() : boolean

	public getMinDate() {
		const from: Date = (this.filterModel as any)["selectedFromDate"];

		if(this.activeDatePicker === DatePickerType.TO) {
			if(from) {
				const dateCopy = new Date(+from);
				return addDays(dateCopy, 1);
			}

		}
	}

	public getMaxDate() {
		const to: Date = (this.filterModel as any)["selectedToDate"];

		if(this.activeDatePicker === DatePickerType.FROM) {
			if(to) {
				const dateCopy = new Date(+to);
				return subDays(dateCopy, 1);
			}
		}
	}

	@action
	public onChangeFilter(key: keyof T,  value: any) : void {
		this.filterViewModel[key] = value;
	}

	@action
	public onClearFilter() : void {
		for(const [key, value] of Object.entries(this.initialState)) {
			(this.filterModel as any)[key] = value;

			if(key === "selectedTypes" || key === "selectedLanguages" ) {
				(this.filterModel as any)[key] = [];
			}

		}

		this.filterViewModel.reset();
	}

	@action
	public onSearch() : void {
		this.filterViewModel.submit();
	}

	@action
	public onSelectDate(selectedDate: MaterialUiPickersDate) : void {

		if(this.activeDatePicker === DatePickerType.FROM) {
			(this.filterModel as any)["selectedFromDate"] = selectedDate;
		}
		else if(this.activeDatePicker === DatePickerType.TO) {
			(this.filterModel as any)["selectedToDate"] = selectedDate;
		}

	}

	@action
	public toggleActiveDatePicker(type: DatePickerType) : void {
		this.activeDatePicker = type;
	}

	@action
	public selectLanguage(language: string) : void {
		const selectedLanguages = (this.filterModel as any)["selectedLanguages"];

		(this.filterModel as any)["currentLang"] = language;

		if(!selectedLanguages.includes(language)) {
			selectedLanguages.push(language);
		}
	}

	@action
	public selectType(type: string) : void {
		const selectedTypes = (this.filterModel as any)["selectedTypes"];

		(this.filterModel as any)["currentType"] = type;
	
		if(!selectedTypes.includes(type)) {
			selectedTypes.push(type);
		}
	}

	@action
	public deleteTag(type: string, tag: string) : void {

		const tags = (this.filterModel as any)[type];

		const index = tags.findIndex((searchTag: string) => searchTag === tag);

		tags.splice(index, 1);

	}

}