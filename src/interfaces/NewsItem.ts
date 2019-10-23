interface IAuthor {
	entity_id: string
	isins: string[]
	leis: string[]
	name: string
	slug: string
	slugs: string[]
	tickers: string[]
}

interface IFile {
	file_title: string
	content_type: string
	url: string
	tags: any
}

interface IContent {
	attatchments: IFile[]
	html: string
	preamble: string
	publish_date: string
	slug: string
	text: string
	title: string
}

interface IProperties {
	lang: string
	scopes: string[]
	tags: string[]
	type: string
}

export interface INewsItem {
	author: IAuthor;
	content: IContent;
	group_id: string;
	news_id: string;
	properties: IProperties;
	source: string;
	subjects: IAuthor[];
	url: string;
}