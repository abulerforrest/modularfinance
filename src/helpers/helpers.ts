const sort = require("fast-sort");

export type TableSortDirection = "asc" | "desc"
export type TableSortFunction<T> = (data: T) => any
export type TableColumnId = string | number

export interface ITableSort<T> {
	columnId: TableColumnId
	selector: TableSortFunction<T>
	direction: TableSortDirection
};

export function defaultTableMultiSort<T>(
	data: T[],
	sorts: ITableSort<T>[]
) : T[] {

	if(sorts.length === 0) {
		return data;
	}

	const newSorts = sorts.map(sort => {
		return {
			[sort.direction]: sort.selector
		}
	});

	return sort([...data]).by(newSorts);
}

export function defaultTableToggleSort<T>(
	sorts: ITableSort<T>[],
	columnId: TableColumnId,
	selectorFunction: TableSortFunction<T>
) : ITableSort<T>[] {

	const sortsCopy = [...sorts];

	const prevSortIndex = sortsCopy.findIndex(sort => sort.columnId === columnId);
	const prevSort = sortsCopy[prevSortIndex];

	if(prevSortIndex !== -1) {
		if(prevSort.direction === "asc") {
			sortsCopy.splice(prevSortIndex, 1, {
				...prevSort,
				direction: "desc"
			});
		} else {
			sortsCopy.splice(prevSortIndex);
		}
	} else {
		sortsCopy.push({
			columnId,
			selector: selectorFunction,
			direction: "asc"
		});
	}

	return sortsCopy;
}