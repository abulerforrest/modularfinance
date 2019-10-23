import { IAuthor } from "./Author";

export interface INewsDataService {
	loadAllAuthors: (offset?: number, limit?: number) => Promise<IAuthor[]>
	loadAuthorNews: (authorId?: string, offset?: number, limit?: number) => void
}	