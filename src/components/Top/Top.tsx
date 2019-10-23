import * as React from "react";
import { Logo } from "../Logo";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "column",
		backgroundColor: "#176890",
		justifyContent: "center",
		height: 120,
		padding: 10
	}
});

const Top = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Logo />
		</div>
	);
}

export default Top;