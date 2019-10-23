import * as React from "react";
import { observer } from "mobx-react";

import DateFnsUtils from "@date-io/date-fns";

import { makeStyles } from "@material-ui/styles";

import {
	KeyboardDatePicker,
	MaterialUiPickersDate,
	MuiPickersUtilsProvider
} from '@material-ui/pickers';

import {
	INewsPageController
} from "../../interfaces/NewsPageController";

import {
	DatePickerType
} from "../../controllers/NewsPageController";

interface DatePickerProps {
	controller: INewsPageController
}

const DatePicker = observer(({controller}: DatePickerProps) => {

	const useStyles = makeStyles({

		datepicker: {
			marginTop: 1,
			marginLeft: 8,
		}

	});

	const classes = useStyles();

	return (
		<React.Fragment>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<KeyboardDatePicker
					variant="inline"
					format="dd-MM-yyyy"
					onOpen={() => controller.toggleActiveDatePicker(DatePickerType.FROM)}
					minDate={controller.getMinDate()}
					maxDate={controller.getMaxDate()}
					className={classes.datepicker}
					maxDateMessage=""
					minDateMessage=""
					margin="normal"
					id="date-picker-from"
					label="Select from date"
					value={controller.filterViewModel.selectedFromDate}
					onChange={(date: MaterialUiPickersDate) => { controller.onSelectDate(date)}}
					KeyboardButtonProps={{
						'aria-label': 'from date',
					}}
				/>
			</MuiPickersUtilsProvider>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<KeyboardDatePicker
					variant="inline"
					format="dd-MM-yyyy"
					onOpen={() => controller.toggleActiveDatePicker(DatePickerType.TO)}
					minDate={controller.getMinDate()}
					maxDate={controller.getMaxDate()}
					className={classes.datepicker}
					maxDateMessage=""
					minDateMessage=""
					margin="normal"
					id="date-picker-to"
					label="Select to date"
					value={controller.filterViewModel.selectedToDate}
					onChange={(date: MaterialUiPickersDate) => { controller.onSelectDate(date)}}
					KeyboardButtonProps={{
						'aria-label': 'to date',
					}}
				/>
			</MuiPickersUtilsProvider>
		</React.Fragment>
	);
});

export default DatePicker;