import Grid from './ReactDataGrid';
import ToastGrid from './ToastGrid';
import ToastGridDataSource from './ToastGridDataSource';
// import ToastGridOrig from './ToastGridOrig';
import Aggrid from './Aggrid';

function App() {
    // const [data, setData] = useState([]);

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
      <ToastGrid /> 
      {/* <ToastGridDataSource /> */}
      {/* <Aggrid /> */}
      
      {/* <div id='grid'>
        <ToastGridOrig />
      </div> */}
    </div>
  );
}

export default App;
