import {
	action,
	computed,
	observable,
	IObservableArray
} from "mobx";

import {
	INewsPageController
} from "../interfaces/NewsPageController";

import {
	NewsDataStore
} from "../stores/NewsDataStore";

import {
	NewsPageFilterController
} from "../controllers/NewsPageFilterController";

import {
	INewsItemRowController
} from "../interfaces/NewsItemRowController";

import { IAuthor } from "../interfaces/Author";
import { INewsItem } from "../interfaces/NewsItem";
import { NewsItemRowController } from "./NewsItemRowController";

import { NewsPageFilterModel } from "../models/NewsPageFilterModel";

import {
	ITableSort, 
	TableColumnId,
	defaultTableMultiSort,
	defaultTableToggleSort
} from "../helpers/helpers";

export enum DatePickerType {
	TO,
	FROM
}

export class NewsPageController
extends NewsPageFilterController<NewsPageFilterModel>
implements INewsPageController {

	private readonly store: NewsDataStore;

	@observable authors: IObservableArray<IAuthor> = observable([]);
	@observable rowControllers: IObservableArray<INewsItemRowController> = observable([]);

	@observable public loading: boolean = false;
	@observable public loadingAuthors: boolean = false;
	@observable public showAdvancedFilter: boolean = false;

	@observable public currentPage: number = 1;
	@observable public pageSize: number = 10;

	@observable public selectedCompany: IAuthor = { authorId: "", authorName: ""};

	@observable public parentTagType: string = "";
	@observable public subTagTypes: string[] = [];
	@observable public availableTags: string[] = [];

	@observable public companyListAnchor: any = null;

	@observable public sorts: IObservableArray<ITableSort<INewsItemRowController>> = observable([]);

	constructor(store: NewsDataStore) {

		super(new NewsPageFilterModel());

		this.store = store;
	
		this.load();
	}

	@computed public get activeControllers() : INewsItemRowController[] {

		const filteredAndSorted = this.filteredAndSortedControllers;

		const filteredSortedAndSliced =	filteredAndSorted.slice(
			this.currentPage * this.pageSize, this.currentPage * this.pageSize + this.pageSize);

		return filteredSortedAndSliced;
	}

	@computed public get filteredAndSortedControllers() : INewsItemRowController[] {
		return defaultTableMultiSort(this.filteredControllers, this.sorts);
	}

	@computed private get filteredControllers(): IObservableArray<INewsItemRowController> {

		const {
			searchQuery,
			selectedToDate,
			selectedFromDate,
			selectedLanguages
		} = this.filterModel;

		let filtered: INewsItemRowController[] = [];

		for(const controller of this.rowControllers) {

			let languageCheck: boolean = true;
			let dateRangeCheck: boolean = true;

			if(selectedLanguages.length > 0) {
				languageCheck = selectedLanguages.includes(controller.data.properties.lang);
			}

			if(selectedToDate !== null && selectedFromDate !== null) {

				dateRangeCheck = new Date(controller.data.content.publish_date) >= selectedFromDate
				&& new Date(controller.data.content.publish_date) <= selectedToDate;

			}

			const matchesSearchQuery: boolean = searchQuery.length === 0
			|| controller.data.content.title.toLowerCase().includes(searchQuery.toLowerCase())
			|| controller.data.content.text.toLowerCase().includes(searchQuery.toLowerCase())

			if(matchesSearchQuery && dateRangeCheck && languageCheck) {
				filtered.push(controller);
			}
		}
		return filtered as any;
	}

	@computed public get pageCount() : number {
		return Math.ceil(this.totalCount/this.pageSize);
	}

	@computed public get totalCount() : number {
		return this.filteredAndSortedControllers.length;
	}

	@computed public get showReset() : boolean {
		const viewModel = this.filterViewModel;

		return viewModel.searchQuery !== "" ||
			viewModel.selectedLanguages.length > 0 ||
			viewModel.selectedTypes.length > 0 ||
			viewModel.selectedFromDate !== null ||
			viewModel.selectedToDate !== null;
	}

	@action
	public onChangePage(page: number) : void {
		this.currentPage = page;
	}

	@action
	public onChangeRowsPerPage(pageSize: number) : void {
		this.currentPage = 1;
		this.pageSize = pageSize;

	}	

	@action
	public onKeyPress(event: React.KeyboardEvent<HTMLDivElement>) : void  {
		if(event.key === "Enter") {
			// submit filter search when pressing enter
			this.onSearch();
		}
	}

	@action
	public toggleShowAdvancedFilter() {
		this.showAdvancedFilter = !this.showAdvancedFilter;
	}

	@action
	public selectCompany(company: IAuthor): void {
		this.selectedCompany = company;

		// clear filter on select
		this.onClearFilter();

		// load author news
		this.getAuthorNews(300, 300);
	}

	@action
	public toggleSort(columnId: TableColumnId) : void {

		const newSorts = defaultTableToggleSort(
			this.sorts,
			columnId,
			(row: INewsItemRowController) => {

				if(columnId === "publish_date" ||
					columnId === "title" ||
					columnId === "text"
				) {
					return row.data.content[columnId]

				}
				if(columnId === "tags" || columnId === "lang") {
					return row.data.properties[columnId]
				}

			}
		);

		this.sorts = observable(newSorts);
	}

	@action
	public clearSorts() : void {
		this.sorts.clear();
	}

	private async getAuthorNews(limit: number, offset: number) {

		this.loading = true;

		try {

		await this.store.getAuthorNews(this.selectedCompany.authorId, limit, offset);

		const rows: INewsItemRowController[] = [];

		for(const item of this.store.getCurrentNewsItems()) {
			rows.push(this.createRowController(item));
		}
		if(rows.length > 0) {
			this.rowControllers.replace(rows);
		}

		} catch(error) {
			console.error("got an error fetching news for the selected company");
		}

		finally {
			this.loading = false;
		}
	}

	@action
	public updateAvailableTags(parentTagType: string, subTagTypes: string[]): void {

			if(!this.availableTags.includes(parentTagType) && parentTagType !== "") {
				this.availableTags.push(parentTagType);
			}

			subTagTypes.forEach(subTag => {
				if(!this.availableTags.includes(subTag)) {
					this.availableTags.push(subTag);
				}
			});

	}

	@action
	public showCompanyList(currentTarget: any) {
		this.companyListAnchor = currentTarget;
	}

	@action
	public hideCompanyList(): void {
		this.companyListAnchor = null;
	}

	private createRowController(data: INewsItem) {
		return new NewsItemRowController(
			this,
			data
		);
	}

	private async load() : Promise<void> {
		this.loading = true;
		this.loadingAuthors = true;

		try {
			// fetch authors list			
			if(localStorage.getItem("authors") === null) {

				await this.store.loadAllAuthors().then(() => this.loadingAuthors = false);

				// sort authors alphabetically
				const sortedAuthors = this.store.getAuthors().sort((a, b) => {
					return a.authorName.localeCompare(b.authorName);
				});

				this.authors.replace(sortedAuthors);

				localStorage.setItem("authors", JSON.stringify(this.authors));
			}

			else {
				const cachedAuthors = JSON.parse(localStorage.getItem("authors")!);

				this.authors.replace(cachedAuthors);

				this.loadingAuthors = false;
			}

			// get the author's news
			this.getAuthorNews(150, 150);

		} catch(error) {
			console.error("encountered an errow when loading news data");
		}
	}

}