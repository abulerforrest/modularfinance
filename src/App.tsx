import React from "react";
import { observer } from "mobx-react";

import {
	makeStyles
} from '@material-ui/core/styles';

import 'typeface-roboto';

import { defaultTheme } from "./themes/defaultTheme";

import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

import MenuItem from '@material-ui/core/MenuItem';

import {
	Fade,
	Typography,
	CircularProgress
} from "@material-ui/core";

import {
	KeyboardArrowRight as ArrowRightIcon
} from "@material-ui/icons";

import { Top } from "./components/Top";
import NewsPage from "./pages/NewsPage";

import {
	INewsPageController
} from "./interfaces/NewsPageController";

import { SearchFilter } from "./components/SearchFilter";

const useStyles = makeStyles({

	pageContainer: {
		display: "flex",
		flexDirection: "column",
		margin: 40
	},

	currentCompany: {
		display: "flex",
		alignItems: "center",
		fontWeight: "bold",
		userSelect: "none",
		marginBottom: 10,
		marginTop: 20,
		color: defaultTheme.palette.secondary.dark
	},

	arrowIcon: {
		marginBottom: 2,
		color: defaultTheme.palette.secondary.main
	},

	showingAllLabel: {
		color: defaultTheme.palette.primary.dark
	},

	button: {
		width: 220,
		fontWeight: "bold",
		color: defaultTheme.palette.primary.light,
		background: defaultTheme.palette.primary.dark,

		"&:hover": {
			backgroundColor: "#7fdbff",
			color: defaultTheme.palette.primary.main
		}
	}
});

interface AppProps {
	newsPageController: INewsPageController
}

const App = observer((props: AppProps) => {

	const {
		newsPageController
	} = props;

	const classes = useStyles();

	const currentCompany: string = newsPageController.selectedCompany.authorName;

	return (
		<div className="App">
			<Top />
			<div className={classes.pageContainer}>
				<Button
					size="large"
					startIcon={
						<Fade
							in={newsPageController.loadingAuthors}
							style={{
								transitionDelay: newsPageController.loadingAuthors ? '800ms' : '0ms',
							}}
							unmountOnExit
						>
							<CircularProgress size={22} />
						</Fade>}
					aria-controls="company-menu"
					aria-haspopup="true"
					onClick={(event) => newsPageController.showCompanyList(event.currentTarget)}
					disabled={newsPageController.loadingAuthors}
					className={classes.button}
					fullWidth={false}
					disableFocusRipple
				>
					{newsPageController.loadingAuthors? "Loading...": "Select Company"}
				</Button>
				<Typography
					variant="h6"
					component="h6"
					color="secondary"
					className={classes.currentCompany}						gutterBottom
				>
					<ArrowRightIcon
						className={classes.arrowIcon}
					/>
					{currentCompany === ""? <div className={classes.showingAllLabel}>Showing all</div>: `${currentCompany}`}
				</Typography>
				<Menu
					id="select-company"
					anchorEl={newsPageController.companyListAnchor}
					keepMounted
					open={Boolean(newsPageController.companyListAnchor)}
					onClose={() => newsPageController.hideCompanyList()}
					onClick={() => newsPageController.hideCompanyList()}
				>
					{newsPageController.authors.map(company => (
						<MenuItem
							key={company.authorId}
							onClick={() => newsPageController.selectCompany(company)}
						>
							{company.authorName}
						</MenuItem>
					))}
				</Menu>
				<SearchFilter
					controller={newsPageController}
				/>
				<NewsPage
					controller={newsPageController}
				/>
			</div>
		</div>
	);
});

export default App;