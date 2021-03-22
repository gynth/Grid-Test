import React, { useState, useEffect } from 'react';
import { getDynamicSql_Mysql } from './Mysql.js';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

// import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const Aggrid = () => {
    // const [gridApi, setGridApi] = useState(null);
    // const [gridColumnApi, setGridColumnApi] = useState(null);

    // const [rowData, setRowData] = useState([
    //     { make: "Toyota", model: "Celica", price: 35000 },
    //     { make: "Ford", model: "Mondeo", price: 32000 },
    //     { make: "Porsche", model: "Boxter", price: 72000 }
    // ]);

    // const onGridReady = params => {
    //     setGridApi(params.api);
    //     setGridColumnApi(params.columnApi);
    // }

    function createRows(numberOfRows){
      let _rows = [];
      for (let i = 0; i < numberOfRows.length; i++) {
        _rows.push({
          id: (i + 1),
          COP_CD:          numberOfRows[i].COP_CD,
          SML_NO:          numberOfRows[i].SML_NO,
          YMD:             numberOfRows[i].YMD,
          FAC_CD:          numberOfRows[i].FAC_CD,
          SEQ_NO:          numberOfRows[i].SEQ_NO,
          ROUT_MID_CAT_CD: numberOfRows[i].ROUT_MID_CAT_CD,
          STR_TM:          numberOfRows[i].STR_TM,
          END_TM:          numberOfRows[i].END_TM,
          TM:              numberOfRows[i].TM,
          TM_SEQ:          numberOfRows[i].TM_SEQ,
          HOLD_YN:         numberOfRows[i].HOLD_YN,
          STR_DT:          numberOfRows[i].STR_DT,
          END_DT:          numberOfRows[i].END_DT 
        });
      }
      return _rows;
    }

    const [data, setData] = useState([]);

    useEffect(() => {
      getDynamicSql_Mysql(
        'Common/Common.js',
        'test',
        {}
      ).then(
        e => {
          console.log(e)
          setData(createRows(e.data));
        }
      )
    }, [])
    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
            <AgGridReact
                // onGridReady={onGridReady}
                rowData={data}>
                <AgGridColumn field="id"></AgGridColumn>
                <AgGridColumn field="COP_CD"></AgGridColumn>
                <AgGridColumn field="SML_NO"></AgGridColumn>
                <AgGridColumn field="YMD"></AgGridColumn>
                <AgGridColumn field="FAC_CD"></AgGridColumn>
                <AgGridColumn field="SEQ_NO"></AgGridColumn>
                <AgGridColumn field="ROUT_MID_CAT_CD"></AgGridColumn>
                <AgGridColumn field="STR_TM"></AgGridColumn>
                <AgGridColumn field="END_TM"></AgGridColumn>
                <AgGridColumn field="TM"></AgGridColumn>
                <AgGridColumn field="TM_SEQ"></AgGridColumn>
                <AgGridColumn field="HOLD_YN"></AgGridColumn>
                <AgGridColumn field="STR_DT"></AgGridColumn>
                <AgGridColumn field="END_DT"></AgGridColumn>
            </AgGridReact>
        </div>
    );
};

export default Aggrid;