import {
	INewsDataService
} from "../interfaces/NewsDataService";

import axios from "axios";
import { IAuthor } from "../interfaces/Author";
import { INewsItem } from "../interfaces/NewsItem";

export class NewsDataService implements INewsDataService {

	public async loadAllAuthors(limit?: number, offset?: number): Promise<any> {

		const serverDomain = "https://europe-west1-mfn-integration.cloudfunctions.net";
		const url: string = `${serverDomain}/mfn-http-json-proxy?url=https://mfn.se/all/a.json?limit=${limit}&offset=${offset}`;

		let authors: IAuthor[] = [];

		try {

			const response = await axios.get(url);

			const { items } = response.data;

			items.forEach((item: any) => {

				const index = authors.findIndex(
					author => author.authorId === item.author.entity_id
				);

				if(index < 0) {
					authors.push({
						authorId: item.author.entity_id,
						authorName: item.author.name
					});
				}
			});

			return authors;

		} catch (error) {
				console.error(error);
		}		
	}

	public async loadAuthorNews(authorId?: string, offset?: number, limit?: number): Promise<INewsItem[]> {

		const serverDomain = "https://europe-west1-mfn-integration.cloudfunctions.net";
		let url: string = "";
			
		let newsItems: INewsItem[] = [];

		if(authorId) {
			url = `${serverDomain}/mfn-http-json-proxy?url=https://mfn.se/all/a.json?.author.entity_id=${authorId}&limit=${limit}&offset=${offset}`;
		}
		else {
			url = `${serverDomain}/mfn-http-json-proxy?url=https://mfn.se/all/a.json?limit=${limit}&offset=${offset}`;
		}

		try {
			const response = await axios.get(url);
			newsItems = response.data.items;

		} catch (error) {
			console.error(error);
		}

		return newsItems;
		
	}

}