import * as React from "react";
import { observer } from "mobx-react";

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
		textTransform: "uppercase",
		background: defaultTheme.palette.secondary.light
	},

	paper: {
		boxShadow: "none",
		background: defaultTheme.palette.primary.light
	},

	tableFooter: {
		borderRadius: 10,
		background: defaultTheme.palette.secondary.light
	},

	emptyResultRow: {
		height: 50,
		margin: "20px 0 0 20px"
	},

	arrowUpCollapse: {
		cursor: "pointer",
		color: defaultTheme.palette.primary.main
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
					color="primary"
					className={classes.button}
					onClick={() => controller.clearSorts()}
					disableRipple
				>
					<ClearIcon className={classes.clearIcon} /> Clear sort
				</Button>);
		}

		return buttonElement;
	}

	const renderNewsItemRows = (): React.ReactNode => {

		if(activeControllers.length > 0) {
			return(
				<TableBody>
					{activeControllers.map((rowController: INewsItemRowController ) => (
						<NewsItem
							key={rowController.data.news_id}
							row={rowController}
						/>
						)
					)}
				</TableBody>
			);
		}
		else {
			return(
				<TableBody>
					<Typography
						variant="h6"
						component="h3"
						color="primary"
						className={classes.emptyResultRow}
					>
						Filter ended with no results.
					</Typography>
				</TableBody>
			);
		}
	}

	const renderLoading = (): React.ReactNode => {
		return (
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
			</TableRow>
		);
	}

	return (
		<div className={classes.root}>
			<Typography
				variant="h4"
				component="h4"
				color="primary"
				gutterBottom
			>
				{selectedCompany.authorId? "": "All"} Finance News
			</Typography>
			<Paper className={classes.paper}>
				<Table aria-label="newsListTable">
					<TableHead>
						<TableRow className={classes.tableRow}>
							<TableCell>
								<ArrowUpIcon
									onClick={() => controller.collapseAllRows()}
									className={classes.arrowUpCollapse}
								/>
							</TableCell>
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
						{ loading? renderLoading(): renderNewsItemRows() }
					<TableFooter
						className={classes.tableFooter}
					>
						<TableRow>
							<TablePagination
								colSpan={7}
								count={controller.totalCount}
								rowsPerPage={controller.pageSize}
								page={controller.currentPage}
								labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
								rowsPerPageOptions={[10, 50, 100, 300, 700, 1000]}
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