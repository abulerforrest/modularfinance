import React from "react";
import { observer } from "mobx-react";

import {
	makeStyles,
	ThemeProvider
} from '@material-ui/core/styles';

import 'typeface-roboto';

import { defaultTheme } from "./themes/defaultTheme";
import CssBaseline from '@material-ui/core/CssBaseline';

import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

import MenuItem from '@material-ui/core/MenuItem';

import {
	Fade,
	Typography,
	CircularProgress
} from "@material-ui/core";

import { Top } from "./components/Top";
import NewsPage from "./pages/NewsPage";

import { SearchFilter } from "./components/SearchFilter";

import {
	INewsPageController
} from "./interfaces/NewsPageController";

const useStyles = makeStyles({
	pageContainer: {
		display: "flex",
		flexDirection: "column",
		margin: 40
	},

	currentCompany: {
		marginTop: 20,
		marginBottom: 10,
		fontWeight: "bold",
		color: defaultTheme.palette.primary.light
	},

	button: {
		width: 220,
		fontWeight: "normal",
		color: defaultTheme.palette.secondary.main,
		background: "rgba(255, 255, 255, 0.9)",

		"&:hover": {
			background: defaultTheme.palette.primary.light,			
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
		<ThemeProvider theme={defaultTheme}>
			<CssBaseline>
				<div className="App">
					<Top />
					<div className={classes.pageContainer}>
						<Button
							size="large"
							startIcon={<Fade
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
							className={classes.currentCompany}
							gutterBottom
						>
							{currentCompany === ""? "": `Current company: ${currentCompany}`}
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
			</CssBaseline>
		</ThemeProvider>
	);
});

export default App;
