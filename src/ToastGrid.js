// import 'tui-grid/dist/tui-grid.css';
import Grid from '@toast-ui/react-grid';
import { useState, useEffect } from 'react';
import { getDynamicSql_Mysql } from './Mysql.js';

// const data = [
//   {id: 1, name: 'Editor'},
//   {id: 2, name: 'Grid'},
//   {id: 3, name: 'Chart'}
// ];

const columns = [
  {name: 'COP_CD', header: 'COP_CD', align:'center'},
  {name: 'SML_NO', header: 'SML_NO'},
  {name: 'YMD', header: 'YMD'},
  {name: 'FAC_CD', header: 'FAC_CD'},
  {name: 'SEQ_NO', header: 'SEQ_NO'},
  {name: 'ROUT_MID_CAT_CD', header: 'ROUT_MID_CAT_NO'},
  {name: 'STR_TM', header: 'STR_TM'},
  {name: 'END_TM', header: 'END_TM'},
  {name: 'TM', header: 'TM'},
  {name: 'TM_SEQ', header: 'TM_SEQ'},
  {name: 'HOLD_YN', header: 'HOLD_YN'},
  {name: 'STR_DT', header: 'STR_DT'},
  {name: 'END_DT', header: 'END_DT'},
  // {name: 'CRT_DT', header: 'CRT_DT'},
  // {name: 'CRTCHR_NO', header: 'CRTCHR_NO'},
  // {name: 'UPD_DT', header: 'UPD_DT'},
  // {name: 'UPDCHR_NO', header: 'UPDCHR_NO'}
];

const RtnGrid = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getDynamicSql_Mysql(
      'Common/Common.js',
      'test',
      {}
    ).then(
      e => {
        console.log(e.data);
        setData(e.data);
      }
    )
  }, [])

  return(
    <Grid
      data={data}
      columns={columns}
      // rowHeight={10}
      // width={'auto'}
      bodyHeight={'fitToParent'}
      // virtualScrolling={true}
      rowHeaders= {[
        { type: 'rowNum', width: 100 }
      ]}
      usageStatistics = { false }
      
    />
  )
};

export default RtnGrid;