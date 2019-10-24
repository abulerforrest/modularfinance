import { createMuiTheme } from '@material-ui/core/styles';

export const defaultTheme = createMuiTheme({

	palette: {

		background: {
			default: "#e8e8e8"
		},

		primary: {
			light: "#ffffff",
			main: "#349ac3",
			dark: "#45abd3"
		},

		secondary: {
			light: "#c7f1f9",
			main: "#4ccdff",
			dark: "#1c7fa5"
		}
	},

	typography: {
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		fontSize: 16,
		fontWeightLight: 300,
		fontWeightMedium: 500,
		fontWeightRegular: 400
	}
});