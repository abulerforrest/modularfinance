import * as React from "react";

import mflogo from "../../assets/png/mflogo.png";

import { defaultTheme } from "../../themes/defaultTheme";

import {
	makeStyles,
	Typography
} from "@material-ui/core";

const Logo = () => {

	const useStyles = makeStyles({
		root: {
			display: "flex"
		},

		logo: {
			width: 120,
			height: 60,
			marginLeft: 15,
			backgroundSize: 120,
			backgroundRepeat: "no-repeat",
			backgroundImage: `url(${mflogo})`
		},

		text: {
			"&&": {
				fontSize: 40,
				color: defaultTheme.palette.primary.light,
				marginLeft: 25
			},
		
			userSelect: "none"
		}
	});

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<a href="/">
				<div className={classes.logo} />
			</a>
			<Typography className={classes.text}>
				Modular Finance
			</Typography>
		</div>
	);

}

export default Logo;