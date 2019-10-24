import * as React from "react";
import { observer } from "mobx-react";

import { makeStyles } from "@material-ui/core/styles";
import { defaultTheme } from "../../themes/defaultTheme";

import {
	Chip,
	Paper,
	Select,
	Button,
	MenuItem,
	InputBase,
	InputLabel,
	FormControl
} from "@material-ui/core";

import {
	Clear as ClearIcon,
	Search as SearchIcon,
	Settings as SettingsIcon
} from '@material-ui/icons';

import Grow from '@material-ui/core/Grow';

import IconButton from '@material-ui/core/IconButton';

import {
	newsLanguages
} from "../../interfaces/NewsPageController";

import {
	INewsPageController
} from "../../interfaces/NewsPageController";

import { DatePicker } from "../DatePicker";

interface SearchFilterProps {
	controller: INewsPageController
}

const SearchFilter = observer(({controller}: SearchFilterProps) => {

	const {
		showAdvancedFilter
	} = controller;

	const useStyles = makeStyles({

		root: {
			display: "flex",
			marginBottom: 20,
			whiteSpace: "nowrap",
			flexDirection: "column",
			height: showAdvancedFilter? 200: 90
		},

		searchInputWrapper: {
			display: "flex",
			marginTop: 15,
			minWidth: 1600
		},

		optionsWrapper: {
			display: "flex",
			flexDirection: "column",
			height: 163,
			borderBottomLeftRadius: 4,
			borderBottomRightRadius: 4,
			padding: "10px 20px 0 20px",
			width: showAdvancedFilter? 520: 402,
			backgroundColor: defaultTheme.palette.secondary.light
			
		},

		optionsColumn: {
			display: "flex",
			flexDirection: "row",
			marginTop: 4,
			marginBottom: 4
		},

		paper: {
			display: 'flex',
			alignItems: 'center',
			boxShadow: 'none',
			padding: 8,
			height: 45,
			borderBottomLeftRadius: showAdvancedFilter? 0: "4px",
			borderBottomRightRadius: showAdvancedFilter? 0: "4px"
		},

		icon: {
			fontSize: 16,
			marginBottom: 1,
			paddingRight: 3
		},

		button: {
			height: 32,
			fontSize: 12,
			marginLeft: 12,
			whiteSpace: "nowrap",
			backgroundColor: "#45ABD3",
			color: defaultTheme.palette.primary.light,
	
			"&:hover": {
				color: defaultTheme.palette.primary.main
			}
		},
	
		clearButton: {
			height: 32,
			fontSize: 12,
			marginLeft: 8,
			whiteSpace: "nowrap",
			backgroundColor: "#c8c8c8",
			color: defaultTheme.palette.primary.light,

			"&:hover": {
				backgroundColor: "#7fdbff",
				color: defaultTheme.palette.primary.main
			}
		},

		buttonWrapper: {
			display: "flex",
			height: 46,
			alignItems: "center"
		},

		inputlabel: {
			marginTop: 5
		},

		types: {
			textTransform: "lowercase"
		},

		select: {
			width: 150,
			fontSize: 14,
			paddingTop: 7,
			marginRight: 10
		},

		input: {
			marginLeft: defaultTheme.spacing(1),
			flex: 1,
			padding: 8,
			fontSize: 15,
			width: showAdvancedFilter? 449: 332
		},

		iconButton: {
			padding: 10
		},

		tagLabel: {
			fontSize: 11,
			fontWeight: "bold",
			textTransform: "uppercase"
		},

		tag: {
			marginLeft: 5,
			color: defaultTheme.palette.primary.main,
			backgroundColor: defaultTheme.palette.primary.light
		},

		tagsContainer: {
			marginLeft: 20,
			whiteSpace: "nowrap"
		}
	});

	const classes = useStyles();

	const renderSelectedTags = () => {

		const TypeTags = controller.filterViewModel.selectedTypes.map(typeTag => (
			<Chip
				className={classes.tag}
				clickable={false}
				key={typeTag}
				size="medium"
				label={<span className={classes.tagLabel}>{typeTag}</span>}
				onDelete={() => controller.deleteTag("selectedTypes", typeTag)}
			/>)
		);

		const LangTags = controller.filterViewModel.selectedLanguages.map(langTag => {
			let langTagLabel: string = langTag === "sv"? "swe": "en";

			return (
				<Chip
					className={classes.tag}
					label={<span className={classes.tagLabel}>{langTagLabel}</span>}
					clickable={false}
					key={langTag}
					size="medium"
					onDelete={() => controller.deleteTag("selectedLanguages", langTag)}
				/>)
			});

		return (
			<div>
				{TypeTags}
				{LangTags}
			</div>
		);
	}

	const renderAdvancedOptions = (): React.ReactNode => {

		return(
			<Grow
				in={showAdvancedFilter}
			>
				<div className={classes.optionsWrapper}>
					<div
						className={classes.optionsColumn}
					>
						<InputLabel
								className={classes.inputlabel}
								shrink htmlFor="filter-placeholder">
							Filter by
						</InputLabel>
						<FormControl>
							<InputLabel
								className={classes.inputlabel}
								shrink htmlFor="language-placeholder"
							>
								Languages (2)
							</InputLabel>
							<Select
								className={classes.select}
								value={controller.filterViewModel.currentLang}
								onChange={(event, node) => controller.selectLanguage(event.target.value as string)}
								variant="standard"
								inputProps={{
									name: 'Lang',
									id: 'language-placeholder',
								}}
								name="lang"
								displayEmpty
							>
								<MenuItem value="en">{newsLanguages.ENG}</MenuItem>
								<MenuItem value={"sv"}>{newsLanguages.SWE}</MenuItem>
							</Select>
						</FormControl>
						<FormControl>
							<InputLabel
								className={classes.inputlabel}
								shrink htmlFor="type-placeholder"
							>
								Types ({controller.availableTags.length})
							</InputLabel>
							<Select
								className={classes.select}
								value={controller.filterViewModel.currentType}
								onChange={(event) => controller.selectType(event.target.value as string)}
								variant="standard"
								inputProps={{
									"aria-label": "searchInput"
								}}
								displayEmpty
							>
								{controller.availableTags.map(tagType => {
									return (<MenuItem
												className={classes.types}
												value={tagType}
												key={tagType}
											>
												{tagType}
											</MenuItem>)
								})}

							</Select>
						</FormControl>
					</div>
					<div className={classes.optionsColumn}>
					<InputLabel
								className={classes.inputlabel}
								shrink htmlFor="filter-placeholder">
							Date
					</InputLabel>
					<DatePicker controller={controller}/>
					</div>
				</div>
			</Grow>
		);
	}

	let clearFilterButton = null;

	if(controller.showReset) {
		clearFilterButton = (
			<Button 
				className={classes.clearButton}
				onClick={() => controller.onClearFilter()}
			>
				<ClearIcon className={classes.icon} /> Clear filter
			</Button>
		);
	}
	return (
		<div className={classes.root}>
			<div
				className={classes.searchInputWrapper}
			>
				<Paper className={classes.paper}>
					<InputBase
						className={classes.input}
						value={controller.filterViewModel.searchQuery}
						onKeyPress={(event) => controller.onKeyPress(event)}
						onChange={query => controller.onChangeFilter("searchQuery", query.target.value)}
						placeholder="Search"
						inputProps={{
							"aria-label": "searchInput"
						}}
					/>
					<IconButton
						className={classes.iconButton}
						aria-label="searchIcon"
						onClick={() => controller.onSearch()}
					>
						<SearchIcon color="primary" />
					</IconButton>
				</Paper>
				<div className={classes.buttonWrapper}>
					<Button 
						color="default"
						className={classes.button}
						onClick={() => controller.toggleShowAdvancedFilter()}
					>
						<SettingsIcon className={classes.icon} />
						{controller.showAdvancedFilter? "Hide Advanced": "Show Advanced"}
					</Button>
					<div className={classes.tagsContainer}>
						{renderSelectedTags()}
					</div>
					{clearFilterButton}
				</div>
			</div>
			{renderAdvancedOptions()}
		</div>
	);
});

export default SearchFilter;