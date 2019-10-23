import * as React from "react";
import { observer } from "mobx-react"

import {
	INewsPageController
} from "../interfaces/NewsPageController";

import { makeStyles } from "@material-ui/core";
import { NewsList } from "../components/NewsList";

interface NewsPageProps {
	controller: INewsPageController
}

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "column",
		height: "100%"
	}
});

const NewsPage = observer((props: NewsPageProps) => {

	const classes = useStyles();

	return(
		<div className={classes.root}>
			<NewsList
				controller={props.controller}
			/>
		</div>
	);
});

export default NewsPage;