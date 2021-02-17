import { AllModules, ColumnApi, GetContextMenuItemsParams, GridApi, GridOptions, MenuItemDef, Module } from '@ag-grid-enterprise/all-modules';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SampleDataDTO } from 'app/model/DataDTO.model';
import { SampleDataService } from 'app/shared/service/sample-data.service';

@Component({
  selector: 'app-custom-grid-example',
  templateUrl: './custom-grid-example.component.html',
  styleUrls: ['./custom-grid-example.component.css']
})
export class CustomGridExampleComponent implements OnInit {

  public rowData: SampleDataDTO[];
  public rowCount: string;

  public frameworkComponents: any;
  public sideBar = true;

  public modules: Module[] = AllModules;

  public api: GridApi;
  public columnApi: ColumnApi;

//   public groupColumn = {
//     headerName: "Group",
//     width: 200,
//     field: 'name',
//     headerCheckboxSelection: true,
//     headerCheckboxSelectionFilteredOnly: true,
//     cellRenderer: 'agGroupCellRenderer',
//     cellRendererParams: {
//         checkbox: true
//     }
//   };

  constructor(
      private sampleDataService: SampleDataService,
      public dialog: MatDialog
    ) { }

  ngOnInit(): void {
      this.sampleDataService.getAllSampleData().subscribe(
          value => {
              this.rowData = value;
          }
      )
  }

  addRow() {
    console.log("add Row");
    this.sampleDataService.save(new SampleDataDTO()).subscribe(
        value => { 
            var newRow = [value];
            this.api.applyTransaction({ add: newRow })
            console.log(this.rowData);
        },
        error => {}
    );
  }

  saveData() {
    this.getRowData();
    this.sampleDataService.saveAll(this.rowData).subscribe(
        value => { 
            console.log("Saving data successfully");
        },
        error => { console.log("error while saving data"); }
    );
  }

  deleteSelected() {
    var selectedData: SampleDataDTO[] = this.api.getSelectedRows();
    this.api.applyTransaction({ remove: selectedData });
    this.sampleDataService.deleteAll(selectedData.map(row => row.id).filter(id => id != undefined))
                            .subscribe(value => {console.log("Delete succuess.")});
  }

  getRowData() {
    var rowData = [];
    this.api.forEachNode(function (node) {
      rowData.push(node.data);
    });
    this.rowData = rowData;
    console.log('Row Data:');
    console.log(rowData);
  }

  getContextMenuItems(params: GetContextMenuItemsParams): (string | MenuItemDef)[] {
      const row: SampleDataDTO = params.node.data;
      return [
          {
              name: 'Edit Row',
              action: () => {
                  console.log("Editing Row...", row);
                  this.dialog.open(RightClickEditDialog);
              }
          },
          'separator',
          'copy',
          'copyWithHeaders',
          'paste',
          'separator',
          'export'
      ]
  }

  gridOptions: GridOptions = {
    defaultExportParams:{
        columnGroups: true
    },
    defaultColDef: {
        minWidth: 50
    },
    pagination: true,
    paginationPageSize: 10,
    enableCellChangeFlash: true,
    rowDragManaged: true,
    floatingFilter: true,
    rowGroupPanelShow: 'always',
    pivotPanelShow: 'always', 
    pivotColumnGroupTotals: 'before',
    pivotRowTotals: 'before',
    enterMovesDownAfterEdit: true,
    enterMovesDown: true,
    multiSortKey: 'ctrl',
    animateRows: true,
    enableRangeSelection: true,
    rowSelection: "multiple",
    rowDeselection: true,
    quickFilterText: null,
    groupSelectsChildren: true, 
    suppressRowClickSelection: true, 
    // autoGroupColumnDef: this.groupColumn,
    // onRowSelected: rowSelected, 
    // onSelectionChanged: selectionChanged, 
    aggFuncs: {
        'zero': function () { return 0; }
    },
    getBusinessKeyForNode: function (node) {
        if (node.data) {
            return node.data.name;
        } else {
            return '';
        }
    },
    defaultGroupSortComparator: function(nodeA, nodeB) {
        if (nodeA.key < nodeB.key) {
            return -1;
        } else if (nodeA.key > nodeB.key) {
            return 1;
        } else {
            return 0;
        }
    },
    onGridReady: (params) => {
        this.api = params.api;
        this.columnApi = params.columnApi;
        this.api.sizeColumnsToFit();
    },
    getContextMenuItems: params => this.getContextMenuItems(params)
  }

  public defaultColDef = {
    flex: 1,
    minWidth: 150,
    filter: true,
    sortable: true,
    floatingFilter: true,
  }

  public columnDefs = [
    {
        // column group 'Participant
        headerName: 'Participant',
        children: [
            {
                headerName: 'Id',
                field: 'id',
                editable: false,
                enableRowGroup: false,
                resizable: true,
                hide: true
            },
            {
                headerName: 'Name',
                rowDrag: true,
                field: 'name',
                editable: true,
                resizable: true,
                enableRowGroup: true,
                checkboxSelection: function (params) {
                    // we put checkbox on the name if we are not doing grouping
                    return params.columnApi.getRowGroupColumns().length === 0;
                },
                headerCheckboxSelection: function (params) {
                    // we put checkbox on the name if we are not doing grouping
                    return params.columnApi.getRowGroupColumns().length === 0;
                },
                headerCheckboxSelectionFilteredOnly: true
            },
            {
                headerName: "Language", field: "language", editable: true, filter: 'agSetColumnFilter',
                cellEditor: 'agSelectCellEditor',
                enableRowGroup: true,
                enablePivot: true,
                resizable: true,
                // rowGroupIndex: 0,
                // pivotIndex: 0,
                cellEditorParams: {
                    values: ['English', 'Spanish', 'French', 'Portuguese', 'German',
                        'Swedish', 'Norwegian', 'Italian', 'Greek', 'Icelandic', 'Portuguese', 'Maltese']
                },
                // pinned: 'left',
                headerTooltip: "Example tooltip for Language",
                filterParams: {
                    selectAllOnMiniFilter: true,
                    newRowsAction: 'keep',
                    clearButton: true
                }
            },
            {
                headerName: "Country", field: "country", editable: true,
                cellRenderer: countryCellRenderer,
                // pivotIndex: 1,
                // rowGroupIndex: 1,
                enableRowGroup: true,
                enablePivot: true,
                resizable: true,
                cellEditor: 'agRichSelectCellEditor',
                cellEditorParams: {
                    cellRenderer: countryCellRenderer,
                    values: ["Argentina", "Brazil", "China", "Colombia", "France", "Germany", "Greece", "Iceland", "Ireland",
                        "Italy", "Malta", "Portugal", "Norway", "Peru", "Spain", "Sweden", "United Kingdom", "United States",
                        "Uruguay", "Venezuela", "Belgium", "Luxembourg"]
                },
                // pinned: 'left',
                floatCell: true,
                filterParams: {
                    cellRenderer: countryCellRenderer,
                    // cellHeight: 20,
                    newRowsAction: 'keep',
                    selectAllOnMiniFilter: true,
                    clearButton: true
                },
                // floatingFilterComponent: 'countryFloatingFilterComponent',
                icons: {
                    sortAscending: '<i class="fa fa-sort-alpha-asc"/>',
                    sortDescending: '<i class="fa fa-sort-alpha-desc"/>'
                }
            }
        ]
    },
    {
        // column group 'Game of Choice'
        headerName: 'Game of Choice',
        children: [
            {
                headerName: "Game Name", field: "gameName", editable: true, filter: 'agSetColumnFilter',
                tooltipField: 'gameName',
                resizable: true,
                cellClass: function () {
                    return 'alphabet';
                },
                filterParams: {
                    selectAllOnMiniFilter: true,
                    newRowsAction: 'keep',
                    clearButton: true
                },
                enableRowGroup: true,
                enablePivot: true,
                // pinned: 'right',
                // rowGroupIndex: 1,
                icons: {
                    sortAscending: '<i class="fa fa-sort-alpha-asc"/>',
                    sortDescending: '<i class="fa fa-sort-alpha-desc"/>'
                }
            },
            {
                headerName: "Bought", field: "bought", filter: 'agSetColumnFilter', editable: true, 
                // pinned: 'right',
                // rowGroupIndex: 2,
                // pivotIndex: 1,
                enableRowGroup: true,
                enablePivot: true,
                enableValue: true,
                resizable: true,
                cellRenderer: booleanCellRenderer, cellStyle: { "text-align": "center" }, comparator: booleanComparator,
                floatCell: true,
                cellEditor: 'agSelectCellEditor',
                cellEditorParams: {
                    values: [true, false]
                },
                filterParams: {
                    cellRenderer: booleanFilterCellRenderer,
                    selectAllOnMiniFilter: true,
                    newRowsAction: 'keep',
                    clearButton: true
                }
            }
        ]
    },
    {
        // column group 'Performance'
        headerName: 'Performance',
        groupId: 'performance',
        children: [
            {
                headerName: "Bank Balance", field: "bankBalance", editable: true,
                valueFormatter: currencyFormatter,
                type: 'numericColumn',
                enableValue: true,
                resizable: true,
                // colId: 'sf',
                // valueGetter: '55',
                // aggFunc: 'sum',
                icons: {
                    sortAscending: '<i class="fa fa-sort-amount-asc"/>',
                    sortDescending: '<i class="fa fa-sort-amount-desc"/>'
                }
            }
        ]
    },
    {
        headerName: "Rating", field: "rating", editable: true, cellRenderer: ratingRenderer,
        floatCell: true,
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
        resizable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
            values: [0, 1, 2, 3, 4, 5]
        },
        filterParams: { cellRenderer: ratingFilterRenderer }
    },
    {
        headerName: "Total Winnings", field: "totalWinnings", filter: 'agNumberColumnFilter', type: 'numericColumn',
        editable: true, valueParser: numberParser, 
        // aggFunc: 'sum',
        resizable: true,
        enableValue: true,
        cellClassRules: {
            'reg-green': 'typeof x === "number" && x >= 0',
            'reg-red': 'typeof x === "number" && x < 0'
        },
        valueFormatter: currencyFormatter, cellStyle: currencyCssFunc,
        icons: {
            sortAscending: '<i class="fa fa-sort-amount-asc"/>',
            sortDescending: '<i class="fa fa-sort-amount-desc"/>'
        }
    }
  ];

}

function booleanComparator(value1, value2) {
    var value1Cleaned = booleanCleaner(value1);
    var value2Cleaned = booleanCleaner(value2);
    var value1Ordinal = value1Cleaned === true ? 0 : (value1Cleaned === false ? 1 : 2);
    var value2Ordinal = value2Cleaned === true ? 0 : (value2Cleaned === false ? 1 : 2);
    return value1Ordinal - value2Ordinal;
}

function booleanCleaner(value) {
  if (value === "true" || value === true || value === 1) {
      return true;
  } else if (value === "false" || value === false || value === 0) {
      return false;
  } else {
      return null;
  }
}

function currencyFormatter(params) {
  if (params.value === null || params.value === undefined) {
      return null;
  } else if (isNaN(params.value)) {
      return 'NaN';
  } else {
      // if we are doing 'count', then we do not show pound sign
      if (params.node.group && params.column.aggFunc === 'count') {
          return params.value;
      } else {
          return '$' + Math.floor(params.value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      }
  }
}

function numberParser(params) {
  var newValue = params.newValue;
  var valueAsNumber;
  if (newValue === null || newValue === undefined || newValue === '') {
      valueAsNumber = null;
  } else {
      valueAsNumber = parseFloat(params.newValue);
  }
  return valueAsNumber;
}

function currencyCssFunc(params) {
  if (params.value !== null && params.value !== undefined && params.value < 0) {
      return { "color": "red" };
  } else {
      return {};
  }
}

function countryCellRenderer(params) {
  //get flags from here: http://www.freeflagicons.com/
  if (params.value === "" || params.value === undefined || params.value === null) {
      return '';
  } else {
      var flag = '<img class="flag" border="0" width="15" height="10" src="https://flags.fmcdn.net/data/flags/mini/' + COUNTRY_CODES[params.value] + '.png">';
      return flag + ' ' + params.value;
  }
}

function booleanCellRenderer(params) {
  var valueCleaned = booleanCleaner(params.value);
  if (valueCleaned === true) {
      return "<span title='true' class='ag-icon ag-icon-tick content-icon'></span>";
  } else if (valueCleaned === false) {
      return "<span title='false' class='ag-icon ag-icon-cross content-icon'></span>";
  } else if (params.value !== null && params.value !== undefined) {
      return params.value.toString();
  } else {
      return null;
  }
}

function booleanFilterCellRenderer(params) {
  var valueCleaned = booleanCleaner(params.value);
  if (valueCleaned === true) {
      return "<span title='true' class='ag-icon ag-icon-tick content-icon'></span>";
  } else if (valueCleaned === false) {
      return "<span title='false' class='ag-icon ag-icon-cross content-icon'></span>";
  } else {
      return "(empty)";
  }
}

function ratingFilterRenderer(params) {
  return ratingRendererGeneral(params.value, true)
}

function ratingRenderer(params) {
  return ratingRendererGeneral(params.value, false)
}

function ratingRendererGeneral(value, forFilter) {
  var result = '<span>';
  for (var i = 0; i < 5; i++) {
      if (value > i) {
          result += '<img src="./assets/star.svg" class="star" width=12 height=12 />';
        // result += '<i class="fas fa-star fa-xs"></i>';
      }
  }
  if (forFilter && value === 0) {
      result += '(no stars)';
  }
  result += '</span>';
  return result;
}

const COUNTRY_CODES = {
  Ireland: "ie",
  Luxembourg: "lu",
  Belgium: "be",
  Spain: "es",
  China: "cn",
  "United Kingdom": "gb",
  "United States": "us",
  France: "fr",
  Germany: "de",
  Sweden: "se",
  Italy: "it",
  Greece: "gr",
  Iceland: "is",
  Portugal: "pt",
  Malta: "mt",
  Norway: "no",
  Brazil: "br",
  Argentina: "ar",
  Colombia: "co",
  Peru: "pe",
  Venezuela: "ve",
  Uruguay: "uy"
};

@Component({
    selector: 'right-click-edit-dialog',
    templateUrl: 'right-click-edit-dialog.html',
  })
export class RightClickEditDialog {



}