import * as React from "react";
import { Logo } from "../Logo";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "column",
		padding: 10,
		height: 120,
		justifyContent: "center",
		backgroundColor: "#176890"
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