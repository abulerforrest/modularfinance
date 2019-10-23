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
				backgroundColor: defaultTheme.palette.primary.light
			},

			backgroundColor: row.expanded? defaultTheme.palette.primary.light: defaultTheme.palette.secondary.light
		},

		html: {
			margin: 0
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
			verticalAlign: "top",
			fontSize: 17,
			fontWeight: "bold"
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
			marginRight: 5,
			marginBottom: 5,
			cursor: "pointer",
			fontWeight: "bold",
			textTransform: "uppercase",
			color: defaultTheme.palette.primary.main
		},

		preamble: {
			fontSize: 19,
			fontStyle: "italic"
		},

		button: {
			marginTop: 10,
			fontSize: 13,
			display: "block",
			color: defaultTheme.palette.primary.light,
			backgroundColor: defaultTheme.palette.primary.main,

			"&:hover": {
				backgroundColor: defaultTheme.palette.primary.main
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
			return(
				<Button
					color="default"
					className={classes.button}
					onClick={(e) => {e.preventDefault()}}
					disableFocusRipple
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
			const html = (
				<div className={classes.html} dangerouslySetInnerHTML={{__html: row.getNewsText}} />
			);
			news = html;
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