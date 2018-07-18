import React, { Component } from 'react';
import './App.css';
import Sortable from './component/Sortable'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dataSource: [{
          key: 'item1',
          label: 'item1'
        },{
          key: 'item2',
          label: 'item2'
        },{
          key: 'item3',
          label: 'item3'
        },{
          key: 'item4',
          label: 'item4'
        },{
          key: 'item5',
          label: 'item5'
        },{
          key: 'item6',
          label: 'item6'
        },{
          key: 'item7',
          label: 'item7'
        },],
    };
  }
  sortableChange = (value) => {
    console.log('value...', value)
  }
  render() {
    const { dataSource } = this.state
    return (
      <div className="App">
        <Sortable 
          key={Math.random()}
          dataSource={this.state.dataSource} 
          onChange={this.sortableChange} 
        >
          {
            dataSource.map((item, index)=>{
                return (
                    <div 
                        className="list-group-item"
                        key={item.key} 
                        // onClick={()=>{}
                        style={{ cursor: 'pointer'}}
                    >
                        <span style={{fontSize: 12}}>{item.label}</span>
                    </div>
                )
            })
          }
        </Sortable>
      </div>
    );
  }
}

export default App;
