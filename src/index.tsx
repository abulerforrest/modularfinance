import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import { ThemeProvider } from "@material-ui/styles";
import { defaultTheme } from "./themes/defaultTheme";
import { CssBaseline } from "@material-ui/core";

import App from "./App";
import SingleNewsPage from "./pages/SingleNewsPage";

import {
	Route,
	BrowserRouter as Router
} from "react-router-dom";

import {
	NewsPageController
} from './controllers/NewsPageController';

import { NewsDataStore } from "./stores/NewsDataStore";
import { NewsDataService } from "./services/NewsDataService";
const store = new NewsDataStore(new NewsDataService());
const newsPageController = new NewsPageController(store);

const routing = (
	// routes
	<ThemeProvider theme={defaultTheme}>
		<CssBaseline>
			<Router>
				<div>
					<Route exact path="/" component={() => (
						<App
							newsPageController={newsPageController}
						/>
						)}
					/>
					<Route path="/singleNewsView/:id" component={() => (
						<SingleNewsPage
							controller={newsPageController}
						/>
						)}
					/>
				</div>
			</Router>
		</CssBaseline>
	</ThemeProvider>
);

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();