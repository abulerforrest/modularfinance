import { observer } from "mobx-react";
import * as React from "react";

import {
	Fade,
	Paper,
	Table,
	Button,
	TableRow,
	TableBody,
	TableHead,
	TableCell,
	Typography,
	makeStyles,
	TableFooter,
	TablePagination,
	CircularProgress
} from "@material-ui/core";

import { 
	Clear as ClearIcon,
	ListAlt as ListAltIcon,
	Message as MessageIcon,
	Language as LanguageIcon,
	DateRange as DateRangeIcon,
	LinearScale as LinearScaleIcon,
	KeyboardArrowUp as ArrowUpIcon,
	KeyboardArrowDown as ArrowDownIcon
} from '@material-ui/icons';

import { INewsPageController } from "../../interfaces/NewsPageController";
import { INewsItemRowController } from "../../interfaces/NewsItemRowController";

import { defaultTheme } from "../../themes/defaultTheme";

import { NewsItem } from "../NewsItem";

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "column",
		color: defaultTheme.palette.primary.light
	},

	link: {
		display: "flex",
		cursor: "pointer",
		alignItems: "center",
		userSelect: "none",
		fontSize: 15,
		color: defaultTheme.palette.primary.main
	},

	icon: {
		marginRight: 4
	},

	clearIcon: {
		fontSize: 16,
		marginRight: 4
	},

	button: {
		fontSize: 14,
		marginRight: 4,
		fontWeight: "normal",
		whiteSpace: "nowrap"
	},

	tableRow: {
		background: defaultTheme.palette.secondary.dark,
		textTransform: "uppercase"
	},

	paper: {
		background: defaultTheme.palette.primary.light,
		boxShadow: "none"
	},

	tableFooter: {
		borderRadius: 10,
		background: "#EDF8FA"
	}
});

interface NewsListProps {
	controller: INewsPageController
}

const NewsList = observer(({controller}: NewsListProps) => {

	const classes = useStyles();

	const {
		sorts,
		loading,
		selectedCompany,
		activeControllers
	} = controller;

	const renderSortDirection = (selector: string) => {

		let direction = "";

		sorts.forEach(sort => {
			if(sort.columnId === selector) {
				direction = sort.direction;
			}
		});

		let arrowElement = null;

		if(direction === "asc") {
			arrowElement = (
				<ArrowUpIcon />
			);
		}
		if(direction === "desc") {
			arrowElement = (
				<ArrowDownIcon />
			);
		}

		return arrowElement;
	}

	const renderClearSortButton = () => {

		let buttonElement = null;

		if(sorts.length > 0) {

			buttonElement = (
				<Button
					size="small"
					color="secondary"
					className={classes.button}
					onClick={() => controller.clearSorts()}
					disableRipple
				>
					<ClearIcon className={classes.clearIcon} /> Clear sort
				</Button>);
		}

		return buttonElement;
	}

	return (
		<div className={classes.root}>
			<Typography
				variant="h4"
				component="h4"
				gutterBottom
			>
				{selectedCompany.authorId? "": "All"} Finance News
			</Typography>
			<Paper className={classes.paper}>
				<Table aria-label="newsListTable">
					<TableHead>
						<TableRow className={classes.tableRow}>
							<TableCell />
							<TableCell>
								<Typography
									onClick={() => controller.toggleSort("publish_date")}
									className={classes.link}
								>
									<DateRangeIcon
										className={classes.icon}
									/>
										Date {renderSortDirection("publish_date")}
								</Typography>
							</TableCell>
							<TableCell>
								<Typography
									onClick={() => controller.toggleSort("tags")}
									className={classes.link}
								>
									<LinearScaleIcon className={classes.icon} />Type {renderSortDirection("tags")}
								</Typography>
							</TableCell>
							<TableCell>
								<Typography
									onClick={() => controller.toggleSort("title")}
									className={classes.link}
								>
									<ListAltIcon className={classes.icon} />Headline {renderSortDirection("title")}
								</Typography>
							</TableCell>
							<TableCell>
								<Typography
									onClick={() => controller.toggleSort("text")}
									className={classes.link}
								>
								<MessageIcon className={classes.icon} />News {renderSortDirection("text")}
							</Typography>
							</TableCell>
							<TableCell>
								<Typography
									onClick={() => controller.toggleSort("lang")}
									className={classes.link}
								>
									<LanguageIcon className={classes.icon} />Language {renderSortDirection("lang")}
								</Typography>
							</TableCell>
							<TableCell>
								{renderClearSortButton()}
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{ loading? 
							<TableRow>
								<TableCell>
									<Fade
										in={loading}
										style={{
											transitionDelay: loading ? "300ms" : "0ms",
										}}
										unmountOnExit
									>
										<CircularProgress
											color="secondary"
										/>
									</Fade>
								</TableCell>
							</TableRow>: activeControllers.map((rowController: INewsItemRowController ) => {
								return (<NewsItem
											key={rowController.data.news_id}
											row={rowController}
										/>)
									})
								}
					</TableBody>
					<TableFooter
						className={classes.tableFooter}
					>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[10, 50, 100, 300, 700, 1000]}
								colSpan={7}
								count={controller.totalCount}
								rowsPerPage={controller.pageSize}
								page={controller.currentPage}
								labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
								backIconButtonProps={{
									"aria-label": "prev page",
								}}
								nextIconButtonProps={{
									"aria-label": "next page",
								}}
								onChangePage={(event, page: number) => controller.onChangePage(page)}
								onChangeRowsPerPage={(event) => controller.onChangeRowsPerPage(event.target.value as any)}
							/>
						</TableRow>
					</TableFooter>
				</Table>
			</Paper>
		</div>
	);
});

export default NewsList;