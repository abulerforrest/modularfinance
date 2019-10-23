import {
	action,
	computed,
	observable
} from "mobx";

import { INewsItem } from "../interfaces/NewsItem";
import { INewsItemRowController } from "../interfaces/NewsItemRowController";

import {
	INewsPageController
} from "../interfaces/NewsPageController";

export class NewsItemRowController implements INewsItemRowController {

	private readonly parentController: INewsPageController

	@observable public data: INewsItem
	@observable public parentTagType: string = "";
	@observable public subTagTypes: string[] = [];
	@observable public expanded: boolean = false;
	
	constructor(
		parentController: INewsPageController,
		data: INewsItem
	) {
		this.parentController = parentController;
		this.data = data;
	}

	@computed get getNewsText(): string {
		const hasPreamble: boolean = this.data.content.preamble !== undefined;

		let text = this.data.content.text;

		if(hasPreamble && this.expanded) {
			const preamble: string = this.data.content.preamble;

			text = text.replace(this.data.content.preamble, "");

			const inlineCSS = "font-size: 20px; color: #349ac3; font-weight: bold; font-style: italic;";
			const styledPreamble = `<span style="${inlineCSS}">${preamble}</span>`;

			return `${styledPreamble} ${text.substr(0, 210)}`;
		}

		return text.substr(0,140);
	}

	public getFormattedDate(date: string): string {
		return new Date(date).toDateString();
	}

	public parseAvailableTags(tags: string[]): any {
		if(tags) {
			tags.forEach(tag => {
				tag.split(":").forEach(tag => {
					if(tag === "regulatory") {
						this.parentTagType = tag;
					}
					else {
						if(tag !== "" && tag !== "sub") {
							if(this.subTagTypes.indexOf(tag) === -1) {
								this.subTagTypes.push(tag);
							}
						}
					}
				});
			});
		}

		this.parentController.updateAvailableTags(this.parentTagType, this.subTagTypes);

		return {
			parentTag: [this.parentTagType],
			subTags: [this.subTagTypes]
		}
	}

	public searchFilterState (): any {
		return this.parentController.filterViewModel.isDirty;
	}

	@action
	public toggleExpanded() {
		this.expanded = !this.expanded;
	}

}