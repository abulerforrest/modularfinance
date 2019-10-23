import {
	INewsDataService
} from "../interfaces/NewsDataService";

import { observable, IObservableArray } from "mobx";

import { IAuthor } from "../interfaces/Author";
import { INewsItem } from "../interfaces/NewsItem";

export class NewsDataStore {

	@observable private authors: IAuthor[] = [];
	@observable private authorNewsItems: IObservableArray<INewsItem> = observable([]);

	private readonly service: INewsDataService;

	constructor(service: INewsDataService) {
		this.service = service;
	}

	public async loadAllAuthors(offset?: number, limit?: number): Promise<void> {

		const authors: IAuthor[] = await this.service.loadAllAuthors(offset, limit);

		this.authors = authors;

	}

	public getAuthors(): IAuthor[] {
		return this.authors;
	}

	public getCurrentNewsItems() : INewsItem[] {
		return this.authorNewsItems;
	}

	public async getAuthorNews(authorId: string, offset?: number, limit?: number): Promise<void> {

		const getNewsItems: INewsItem[] | void = await this.service.loadAuthorNews(authorId, offset, limit);

		if(getNewsItems != null) {
			this.authorNewsItems.replace(getNewsItems);
		}

	}

}