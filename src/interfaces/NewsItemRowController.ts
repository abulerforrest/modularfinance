import { INewsItem } from "./NewsItem";

export interface INewsItemRowController {
	data: INewsItem
	expanded: boolean
	getNewsText: string
	parentTagType: string
	subTagTypes: string[]

	toggleExpanded: () => void
	getFormattedDate: (date: string) => string
	parseAvailableTags: (tags: string[]) => void
}