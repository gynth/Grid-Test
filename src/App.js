// import Grid from './ReactDataGrid';
// import ToastGrid from './ToastGrid';
// import ToastGridDataSource from './ToastGridDataSource';
// import ToastGridOrig from './ToastGridOrig';
// import Aggrid from './Aggrid';
import ToastOrig from './ToastOrig';
import { useState, useEffect, useRef } from 'react';

function App() {
    const [data, setData] = useState(0);

  // useEffect(() => {
  //   const starttm = new Date();
  //   getDynamicSql_Mysql(
  //     'Common/Common.js',
  //     'test',
  //     {}
  //   ).then(
  //     e => {
  //       setData(e.data);
  //       const endtm = new Date();
  //     }
  //   )
  // }, [])
  return (
    <div id="root" style={{width:'100%', height:700}}>
      {/* <Grid /> */}
      {/* <ToastGrid />  */}
      {/* <ToastGridDataSource /> */}
      {/* <Aggrid /> */}
      <ToastOrig test1={data}/>
      
      {/* <div id='grid'>
        <ToastGridOrig />
      </div> */}
      <button onClick={() => setData(data + 1)}></button>
    </div>
  );
}

export default App;
