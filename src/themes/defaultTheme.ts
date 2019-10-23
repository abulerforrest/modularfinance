import { createMuiTheme } from '@material-ui/core/styles';

export const defaultTheme = createMuiTheme({
    palette: {
		background: {
			default: "#00b8d4"
		},
		primary: {
			light: "#ffffff",
			main: "#349ac3",
			dark: "#000"
		},
		secondary: {
			light: "#f8f8f8",
			main: "#1c7fa5",
			dark: "#edf8fa"
		}
	},
	typography: {
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		fontSize: 16,
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500
	}
});