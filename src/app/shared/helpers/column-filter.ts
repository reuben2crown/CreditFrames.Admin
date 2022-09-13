import { NzTableSortOrder, NzTableSortFn, NzTableFilterList, NzTableFilterFn } from "ng-zorro-antd/table";

interface ColumnItem<T> {
    name: string;
    sortOrder: NzTableSortOrder | null;
    sortFn: NzTableSortFn<T> | null;
    listOfFilter: NzTableFilterList;
    filterFn: NzTableFilterFn<T> | null;
    filterMultiple: boolean;
    sortDirections: NzTableSortOrder[];
}

// export function get
// listOfColumns: ColumnItem[] = [
//     {
//       name: 'Name',
//       sortOrder: null,
//       sortFn: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
//       sortDirections: ['ascend', 'descend', null],
//       filterMultiple: true,
//       listOfFilter: [
//         { text: 'Joe', value: 'Joe' },
//         { text: 'Jim', value: 'Jim', byDefault: true }
//       ],
//       filterFn: (list: string[], item: DataItem) => list.some(name => item.name.indexOf(name) !== -1)
//     },
//     {
//       name: 'Age',
//       sortOrder: 'descend',
//       sortFn: (a: DataItem, b: DataItem) => a.age - b.age,
//       sortDirections: ['descend', null],
//       listOfFilter: [],
//       filterFn: null,
//       filterMultiple: true
//     },
//     {
//       name: 'Address',
//       sortOrder: null,
//       sortDirections: ['ascend', 'descend', null],
//       sortFn: (a: DataItem, b: DataItem) => a.address.length - b.address.length,
//       filterMultiple: false,
//       listOfFilter: [
//         { text: 'London', value: 'London' },
//         { text: 'Sidney', value: 'Sidney' }
//       ],
//       filterFn: (address: string, item: DataItem) => item.address.indexOf(address) !== -1
//     }
//   ];