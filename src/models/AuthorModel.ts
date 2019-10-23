import { action, observable } from "mobx";
import { IAuthor } from "../interfaces/Author";

export type AuthorModelPartial = Pick<IAuthor, "authorName">

export class AuthorModel implements AuthorModelPartial {
	@observable public authorId: string = "";
	@observable public authorName: string = "";

	constructor(author?: IAuthor) {
		this.fromJson(author);
	}

	@action public fromJson(author?: IAuthor) {
		if(author) {
			this.authorId = author.authorId;
			this.authorName = author.authorName;
		} else {
			this.authorId = "";
			this.authorName = "";
		}
	}

	public toJson() {
		return {
			authorId: this.authorId,
			authorName: this.authorName
		}
	}

}
