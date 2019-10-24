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
		paddingLeft: 200,
		paddingRight: 200
	},

	topBorder: {
		display: "flex",
		flexDirection: "column",
		paddingLeft: 200,
		paddingRight: 200
	},

	paper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		border: 0,
		paddingTop: 200,
		height: "100vh",
		borderRadius: 0,
		filter: "drop-shadow(0 -5mm 3mm grey)",
		color: defaultTheme.palette.primary.main,
		backgroundColor: defaultTheme.palette.primary.light
	}

});

const SingleNewsPage = observer((props: SingleNewsPageProps) => {
	const classes = useStyles();

	return(
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<div></div>
				<Typography variant="h5" component="h3">
				</Typography>
				<Typography component="p">
				</Typography>
			</Paper>
		</div>
	);
});

export default SingleNewsPage;