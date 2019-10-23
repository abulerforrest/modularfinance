
import {
	INewsItemRowController
} from "./NewsItemRowController";

import {
	NewsPageFilterController
} from "../controllers/NewsPageFilterController";

import {
	NewsPageFilterModel
} from "../models/NewsPageFilterModel";

import { IAuthor } from "./Author";

import { ITableSort } from "../helpers/helpers";

export enum newsLanguages {
	ENG = "English",
	SWE = "Swedish"
}

export interface INewsPageController
	extends NewsPageFilterController<NewsPageFilterModel> {
	activeControllers: INewsItemRowController[]

	loading: boolean
	loadingAuthors: boolean
	showAdvancedFilter: boolean

	authors: IAuthor[]
	selectedCompany: IAuthor

	currentPage: number
	totalCount: number
	pageCount: number
	pageSize: number

	availableTags: string[]

	companyListAnchor: any

	sorts: ITableSort<INewsItemRowController>[];

	selectCompany: (company: IAuthor) => void

	showCompanyList: (currentTarget: any) => void
	hideCompanyList: () => void
	
	toggleShowAdvancedFilter: () => void
	onChangePage: (page: number) => void

	onChangeRowsPerPage: (pageSize: number) => void
	onKeyPress: (event: React.KeyboardEvent<HTMLDivElement>) => void

	updateAvailableTags: (parentTagType: string, subTagTypes: string[]) => void

	clearSorts: () => void
	toggleSort: (selector: string) => void
}