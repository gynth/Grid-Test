import DataGrid from 'react-data-grid';
import { useState, useEffect } from 'react';
import { getDynamicSql_Mysql } from './Mysql.js';

const columns = [
  {key: 'id', name: 'ID', sortDescendingFirst: true},
  {key: 'COP_CD', name: 'COP_CD'},
  {key: 'SML_NO', name: 'SML_NO'},
  {key: 'YMD', name: 'YMD'},
  {key: 'FAC_CD', name: 'FAC_CD'},
  {key: 'SEQ_NO', name: 'SEQ_NO'},
  {key: 'ROUT_MID_CAT_CD', name: 'ROUT_MID_CAT_NO'},
  {key: 'STR_TM', name: 'STR_TM'},
  {key: 'END_TM', name: 'END_TM'},
  {key: 'TM', name: 'TM'},
  {key: 'TM_SEQ', name: 'TM_SEQ'},
  {key: 'HOLD_YN', name: 'HOLD_YN'},
  {key: 'STR_DT', name: 'STR_DT'},
  {key: 'END_DT', name: 'END_DT'},
  {key: 'CRT_DT', name: 'CRT_DT'},
  {key: 'CRTCHR_NO', name: 'CRTCHR_NO'},
  {key: 'UPD_DT', name: 'UPD_DT'},
  {key: 'UPDCHR_NO', name: 'UPDCHR_NO'}
];

function ReactDataGrid() {  
  
  const [data, setData] = useState([]);

  function createRows(numberOfRows){
    let _rows = [];
    for (let i = 0; i < numberOfRows.length; i++) {
      _rows.push({
        id: (i + 1)
      });
    }
    return _rows;
  }

  useEffect(() => {
    getDynamicSql_Mysql(
      'Common/Common.js',
      'test',
      {}
    ).then(
      e => {
        setData(createRows(e.data));
      }
    )
  }, [])

  return (
    <DataGrid
      // style={{height:'100%'}}
      // rowKeyGetter={i => data[i]}
      // rowGetter={i => data[i]}
      columns={columns}
      rows={data}
      
    />
  );
}

export default ReactDataGrid;

// import React from 'react';
// import ReactDataGrid from 'react-data-grid';

// const columns = [
//   { key: 'id', name: 'ID' },
//   { key: 'title', name: 'Title' },
//   { key: 'count', name: 'Count' } ];

// const rows = [{ title: 'row1', count: 20}, {title: 'row1', count: 40}, {title: 'row1', count: 60}];

// const rowGetter = (i) => {
//   console.log(i);
//   return rows[i];
// }

// function HelloWorld() {
//   return (<ReactDataGrid
//   columns={columns}
//   rowGetter={rowGetter}
//   rowsCount={rows.length}
//   rows={rows}
//   minHeight={150} />);
// }

// export default HelloWorld;