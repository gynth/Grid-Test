import React from 'react';
import { Component } from 'react';
import Grid from 'tui-grid';

class ToastOrig extends Component {
  componentDidUpdate(props){

    let grid;
  
    const data = [
      {
        id: '10012',
        city: 'Seoul',
        country: 'South Korea'
      },
      {
        id: '10013',
        city: 'Tokyo',
        country: 'Japan'    
      },
      {
        id: '10014',
        city: 'London',
        country: 'England'
      },
      {
        id: '10015',
        city: 'Ljubljana',
        country: 'Slovenia'
      },
      {
        id: '10016',
        city: 'Reykjavik',
        country: 'Iceland'
      }
    ];
    
    grid = new Grid({
      el: this.gridDiv,
    })

    grid.setColumns([
      {
        header: 'ID',
        name: 'id'
      },
      {
        header: 'CITY',
        name: 'city',
        editor: 'text'
      },
      {
        header: 'COUNTRY',
        name: 'country'
      }
    ]);

    grid.resetData(data);
  }




  render(){
    return (
      <div ref={(ref) => this.gridDiv=ref} style={{width:'100%', height:'100%'}} />
    );
  }
};

export default ToastOrig;