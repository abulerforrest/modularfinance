import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { NewsPageController } from './controllers/NewsPageController';

import { NewsDataStore } from "./stores/NewsDataStore";
import { NewsDataService } from "./services/NewsDataService";

const store = new NewsDataStore(new NewsDataService());

const newsPageController = new NewsPageController(store);

ReactDOM.render(<App
					newsPageController={newsPageController}
				/>, document.getElementById('root'));

serviceWorker.unregister();