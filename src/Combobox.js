import Select from 'react-select';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {store, injectAsyncReducer} from './Store';
import PropTypes from 'prop-types';
import { getDynamicSql_Mysql } from './Mysql.js';
import { jsonRtn } from './jsonControl';

            //  <Combobox pgm     = 'Home'
            //           id      = 'test' 
            //           value   = 'CHK_ITEM_CD' 
            //           display = 'CHK_ITEM_NAM'
            //           fn      = 'fm_facchk_item_cd'
            //           location= 'Common/Common.js'
            //           field   = {['CHK_CLS', 'CHK_ITEM_CD', 'CHK_ITEM_NAM', 'CHK_TM', 'PRD_UNT_CD']}
            //           onFocus = {(e, State) => {
            //             const filter = State[0].optionList_orig.filter((e) => {
            //                 return e.CHK_CLS === 'D'
            //             })

            //             return filter;
            //           }}
            // }


let REDUCER = '';

//#region 리듀서 생성

const ComboboxReducer = (nowState, action) => {
  if(action.reducer !== REDUCER) {
    return {
      State : nowState === undefined ? [] : nowState.State
    };
  }

  if(action.type === 'INITOPTION'){
    if(jsonRtn(nowState.State, 'id', action.State['id']) !== undefined){
      console.log(action.State['pgm'] + ' has same Id: ' + action.State['id']);
    }

    return Object.assign({}, nowState, {
      State: [...nowState.State.filter(e => e.id !== action.State['id']), 
                                             {pgm              : action.State['pgm'],
                                              id               : action.State['id'],
                                              values           : {},
                                              optionList_orig  : action.State['optionList'],
                                              optionList_filter: action.State['optionList'],
                                              optionList       : action.State['optionList'],
                                              valueWidth       : action.State['valueWidth']
                                             }]
    })
  }else if(action.type === 'INPUTFILTER'){
    const curValue = jsonRtn(nowState.State, 'id', action.State['id'])

    return Object.assign({}, nowState, {
      State: [...nowState.State.filter(e => e.id !== action.State['id']), 
                {pgm              : action.State['pgm'],
                 id               : action.State['id'],
                 values           : curValue['values'],
                 optionList_orig  : curValue['optionList_orig'],
                 optionList_filter: curValue['optionList_filter'],
                 optionList       : action.State['optionList'],
                 valueWidth       : curValue['valueWidth']
                }]
    })
  }else if(action.type === 'APPLYFILTER'){
    const curValue = jsonRtn(nowState.State, 'id', action.State['id'])

    return Object.assign({}, nowState, {
      State: [...nowState.State.filter(e => e.id !== action.State['id']), 
                {pgm              : action.State['pgm'],
                 id               : action.State['id'],
                 values           : curValue['values'],
                 optionList_orig  : curValue['optionList_orig'],
                 optionList_filter: action.State['optionList_filter'],
                 optionList       : action.State['optionList_filter'],
                 valueWidth       : curValue['valueWidth']
                }]
    })
  }else if(action.type === 'CLEARFILTER'){
    const curValue = jsonRtn(nowState.State, 'id', action.State['id'])

    return Object.assign({}, nowState, {
      State: [...nowState.State.filter(e => e.id !== action.State['id']), 
                {pgm              : action.State['pgm'],
                 id               : action.State['id'],
                 values           : curValue['values'],
                 optionList_orig  : curValue['optionList_orig'],
                 optionList_filter: curValue['optionList_orig'],
                 optionList       : curValue['optionList_orig'],
                 valueWidth       : curValue['valueWidth']
                }]
    })
  }else if(action.type === 'CHANGE'){
    const curValue = jsonRtn(nowState.State, 'id', action.State['id'])

    return Object.assign({}, nowState, {
      State: [...nowState.State.filter(e => e.id !== action.State['id']), 
                {pgm              : action.State['pgm'],
                 id               : action.State['id'],
                 values           : action.State['values'],
                 optionList_orig  : curValue['optionList_orig'],
                 optionList_filter: curValue['optionList_orig'],
                 optionList       : curValue['optionList_orig'],
                 valueWidth       : curValue['valueWidth']
                }]
    })
  }
};

//#endregion

const Combobox = (props) => {
  
  REDUCER = props.pgm + '_REDUCER';

  useEffect(() => {
    getDynamicSql_Mysql(
      props.location,
      props.fn,
      [{}]
    ).then(
      result => {
        if(result.result){
          injectAsyncReducer(REDUCER, ComboboxReducer);
          
          let optionList = []
          let width = 0;
          for(let idx in result.data){
            let canvas = document.createElement("canvas");
            let context = canvas.getContext("2d");
            context.font = props.fontSize + "px bold";
            let metrics = context.measureText(result.data[idx][props.value]);

            if(width < metrics.width + 10) {
              if(props.fontSize >= 9)
                width = Math.ceil(metrics.width) + 10
              else
                width = Math.ceil(metrics.width) + 20
            };
          }

          for(let idx in result.data){
            let arrValue   = {};
            
            arrValue['value'] = result.data[idx][props.value];

            arrValue['label'] = <div style={{whiteSpace:'nowrap'}}>
                                  <label>{result.data[idx][props.display]}</label>
                                </div>;
            arrValue['labelText'] = result.data[idx][props.display];

            for(let idx2 in props.field){
              arrValue[props.field[idx2]] = result.data[idx][props.field[idx2]];
            }

            optionList.push(arrValue)
          }

          store.dispatch({
            reducer: REDUCER,
            type   : 'INITOPTION',
            State  : {
              pgm: props.pgm,
              id : props.id,
              optionList,
              valueWidth: width
            }
          })
        }
      }
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const [isFoucs, setFocus] = useState('none');

  const State = useSelector((e) => {if(e[REDUCER] !== undefined){
                                      return e[REDUCER].State.filter(e => e.id === props.id)
                                    }else{
                                      return [];
                                    }
                                   }, 
                            (p, n) => {
                              return JSON.stringify(p) === JSON.stringify(n);
                });

  const option = State[0] !== undefined && State[0].optionList;

  if(!option) return <> </>;

  //#region 스타일  
  const dot = (text) => ({
    display: 'flex',
  
    ':before': {
      content: '"' + text + '"',
      fontWeight:'bold',
      // color : 'red',
      width: State[0].valueWidth
    },
  });

  const customStyles = {
    container: (base) => ({
      ...base,
      flex : 1,
      width: props.width,
      height:props.height,
      margin:0
    }),
  
    control: (base) => ({
      ...base,
      height:props.height,
      minHeight:props.height,
      fontSize:props.fontSize,
      margin:0
    }),

    valueContainer: (base) => ({
      ...base,
      height:props.height - 3,
      padding:0
    }),

    indicatorsContainer: (base) => ({
      ...base,
      height: props.height - 3,
      padding: 0,
      display: isFoucs //'none', 'flex'
    }),
    
    input: (base) => ({
      ...base,
      margin: '0px 0px 0px 3px'
    }),

    menu: (base, e2) => ({
      ...base,
      fontSize:props.fontSize,
      marginTop: 1,
      width: undefined
    }),

    option: (base, state) => ({
      ...base,
      ...dot(state.data.value)
    }),

    // option: (base, state) => {
    //   console.log(state.data.value);
    // },

    // menuList: (base) => ({
    //   ...base,
    //   ...dot()
    // }),

    // menuList: (base) => {
    //   console.log(base)
    // },
 
    singleValue: (base) => ({
      ...base,
      margin: '0px 0px 0px 4px',
      // ...dot()
    }),

    placeholder: (base) => ({
      ...base,
      margin: '0px 0px 0px 4px',
      display: isFoucs //'none', 'flex'
    })
  }
  //#endregion

  //#region 이벤트

  const onChangeBase = (e) => {
    store.dispatch({
      reducer: REDUCER,
      type   : 'CHANGE',
      State  : {
        pgm: props.pgm,
        id : props.id,
        values: e
      }
    })
  }

  const onFocusBase = (e) => {
    setFocus('flex');
    
    const filter = props.onFocus(e, State);
    if(filter !== undefined){
      store.dispatch({
        reducer: REDUCER,
        type   : 'APPLYFILTER',
        State  : {
          pgm: props.pgm,
          id : props.id,
          optionList_filter: filter
        }
      })
    }
  };

  const onBlurBase = (e) => {
    setFocus('none');
    props.onBlur(e);
    store.dispatch({
      reducer: REDUCER,
      type   : 'CLEARFILTER',
      State  : {
        pgm: props.pgm,
        id : props.id
      }
    })
  };

  const onInputChangeBase = (value, action) => {
    if(action.action === 'input-change'){
      const optionList = State[0].optionList_filter.filter((e) => {
        // if(typeof(e.label) === 'string'){
        //   return e.label.toLowerCase().indexOf(value.toLowerCase()) >= 0;
        // }else if(e.label.props !== undefined){
        //   return e.label.props.children.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0;
        // }else 
        //   return false;
          return e.label.props.children.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0;
      })

      store.dispatch({
        reducer: REDUCER,
        type   : 'INPUTFILTER',
        State  : {
          pgm: props.pgm,
          id : props.id,
          optionList
        }
      })
    }
  };
  //#endregion

  return (
    <>
      {props.label !== '' && props.label !== undefined &&
        <div style={{float:'left', marginRight:'3px'}}>
          <label htmlFor={props.id}>{props.label}</label>
        </div>
      }

      <div style={{float:'left'}}>
        <Select 
                options={option}
                styles={customStyles}
                inputId={props.id}
                filterOption={null}

                onChange={(e) => onChangeBase(e)}
              
                // defaultValue={option[1]} //이건 이방법뿐인듯 따로 기능구현
                onFocus={(e) => onFocusBase(e)}
                onBlur={(e) => onBlurBase(e)}
              
                onInputChange={(value, action) => onInputChangeBase(value, action)}
        />
      </div>
    </>
  );
}

Combobox.propTypes = {
  pgm         : PropTypes.string.isRequired,
  id          : PropTypes.string.isRequired,
  value       : PropTypes.string.isRequired,
  display     : PropTypes.string.isRequired,
  location    : PropTypes.string.isRequired,
  fn          : PropTypes.string.isRequired,
  field       : PropTypes.array.isRequired,

  width       : PropTypes.number,
  height      : PropTypes.number,
  fontSize    : PropTypes.number,
  label       : PropTypes.string,
  menuIsOpen  : PropTypes.bool,
  isRtl       : PropTypes.bool,
  isSearchable: PropTypes.bool,
  isMulti     : PropTypes.bool,
  blurInputOnSelect: PropTypes.bool,
  closeMenuOnSelect: PropTypes.bool,

  onChange    : PropTypes.func,
  onMenuOpen  : PropTypes.func,
  onMenuClose : PropTypes.func,
  onFocus     : PropTypes.func,
  onBlur      : PropTypes.func
};

Combobox.defaultProps = {
  width       : 150,
  height      : 23,
  fontSize    : 12,
  label       : '',
  menuIsOpen  : false,
  isRtl       : false,
  isSearchable: true,
  isMulti     : false,
  blurInputOnSelect: false,
  closeMenuOnSelect: false,

  onChange    : (e) => {},
  onMenuOpen  : () => {},
  onMenuClose : () => {},
  onFocus     : (e) => {},
  onBlur      : (e) => {}
};

export default Combobox;