import * as React from "react";
import { observer } from "mobx-react"

import {
	INewsPageController
} from "../interfaces/NewsPageController";

import { makeStyles } from "@material-ui/core";

import {
	Paper,
	Typography
} from "@material-ui/core";

import { defaultTheme } from "../themes/defaultTheme";

interface SingleNewsPageProps {
	controller: INewsPageController
}

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "column",
		paddingLeft: 100,
		paddingRight: 100
	},
	paper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		paddingTop: 200,
		height: "100vh",
		borderRadius: 0,
		border: 0,
		backgroundColor: "rgba(28, 127, 165, 0.8)",
		filter: "drop-shadow(0 -5mm 3mm rgba(28, 127, 165, 1))",
		color: defaultTheme.palette.primary.light
	}
});

const SingleNewsPage = observer((props: SingleNewsPageProps) => {
	const classes = useStyles();

	return(
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<Typography variant="h5" component="h3">
				</Typography>
				<Typography component="p">
				</Typography>
			</Paper>
		</div>
	);
});

export default SingleNewsPage;