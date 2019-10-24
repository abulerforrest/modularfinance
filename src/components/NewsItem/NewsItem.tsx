import * as React from "react";
import { observer } from "mobx-react";

import {
	Chip,
	Button,
	TableRow,
	TableCell,
	makeStyles
} from "@material-ui/core";

import {
	INewsItemRowController
} from "../../interfaces/NewsItemRowController";

import { defaultTheme } from "../../themes/defaultTheme";

import {
	KeyboardArrowUp as KeyboardArrowUpIcon,
	KeyboardArrowDown as KeyboardArrowDownIcon
} from '@material-ui/icons';

interface NewsItemProps {
	row: INewsItemRowController
}

const NewsItem = observer(({row}: NewsItemProps) => {

	const useStyles = makeStyles({
		row: {
			cursor: "pointer",
			userSelect: "none",

			"&:hover": {
				backgroundColor: "#fafafa"
			},

			backgroundColor: row.expanded? "#fafafa": defaultTheme.palette.primary.light
		},

		tableCell: {
			width: 50,
			whiteSpace: "nowrap",
			verticalAlign: "top"
		},

		tableCellNews: {
			width: 500,
			fontSize: 17,
			verticalAlign: "top"
		},

		tableCellTitle: {
			width: 300,
			fontSize: 18,
			color: "#4a4949",
			fontWeight: "bold",
			verticalAlign: "top"
		},

		tableCellDefault: {
			width: 10,
			verticalAlign: "top"
		},

		tableCellType: {
			width: 200,
			verticalAlign: "top"
		},

		chip: {
			fontSize: 11,
			cursor: "pointer",
			fontWeight: "bold",
			margin: "0 5px 5px 0",
			textTransform: "uppercase",
			color: defaultTheme.palette.primary.main
		},

		preamble: {
			fontSize: 19,
			fontStyle: "italic"
		},

		button: {
			fontSize: 13,
			marginTop: 10,
			color: defaultTheme.palette.primary.light,
			backgroundColor: defaultTheme.palette.primary.main,

			"&:hover": {
				backgroundColor: defaultTheme.palette.primary.dark
			}
		}
	});

	const classes = useStyles();

	const { data } = row;

	row.parseAvailableTags(data.properties.tags);

	const renderParentTag = () : React.ReactNode => {
		
		const { parentTagType } = row;

		if(parentTagType !== "") {
			return (
				<Chip
					label={parentTagType}
					className={classes.chip}
					variant="outlined"
				/>
			);
		}
	};

	const renderNewsButton = () : React.ReactNode => {
		if(row.expanded) {
			const href: string = `/singleNewsView/${row.data.news_id}`
			return(
				<Button
					color="default"
					className={classes.button}
					disableFocusRipple
					href={href}
				>
					Read the entire article
				</Button>
			);
		}
	}

	const renderSubTags = () : React.ReactNode => { 
		
		const { subTagTypes } = row;

		return subTagTypes.map((subTagType: string) => (
			<Chip
				key={subTagType}
				label={subTagType}
				className={classes.chip}
				variant="outlined"
			/>)
		);

	};

	const renderNews = () : React.ReactNode | string => {

		let news: React.ReactNode = null;

		if(row.expanded) {
			news = <div
				dangerouslySetInnerHTML={{__html: row.getNewsText}}
			/>;
		}
		else {
			news = row.getNewsText;
		}

		return (
			<div>
				{news}
			</div>
		);

	}

	const renderArrow = (): React.ReactNode => {
		return row.expanded? <KeyboardArrowDownIcon color="secondary" />: <KeyboardArrowUpIcon color="secondary" />
	} 

	return (
		<TableRow
			key={data.news_id} 
			className={classes.row}
		>
			<TableCell
				className={classes.tableCellDefault}
				onClick={() => row.toggleExpanded()}
			>
				{renderArrow()}
			</TableCell>
			<TableCell
				className={classes.tableCell}
				onClick={() => row.toggleExpanded()}
			>
				{row.getFormattedDate(data.content.publish_date)}
			</TableCell>
			<TableCell 
				className={classes.tableCellType}
				onClick={() => row.toggleExpanded()}
			>
				{renderParentTag()}
				{renderSubTags()}
			</TableCell>
			<TableCell
				className={classes.tableCellTitle}
				onClick={() => row.toggleExpanded()}
			>
				{data.content.title}
			</TableCell>
			<TableCell
				className={classes.tableCellNews}
			>
				<div onClick={() => row.toggleExpanded()}>
					{renderNews()}
				</div>
				{renderNewsButton()}
			</TableCell>
			<TableCell 
				className={classes.tableCellDefault}
			>
				<Chip
					label={data.properties.lang === "sv"? "swe": "en"}
					className={classes.chip}
					variant="outlined"
				/>
			</TableCell>
			 <TableCell className={classes.tableCellDefault}/>
		</TableRow>
	);
});

export default NewsItem;