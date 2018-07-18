# sortable 拖拽组件在 React 项目中的使用示例

### 运行
```
npm install
npm start
```
###使用
```
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
    this.setState({
      dataSource: value
    })
  }
  render() {
    const { dataSource } = this.state
    return (
      <div className="App">
        // 为组件绑定 dataSorce 和 onChange 方法使之成为受控组件
        <Sortable 
          key={Math.random()}
          dataSource={this.state.dataSource} 
          onChange={this.sortableChange} 
        >
          {
            // 子元素可以自定义样式
            dataSource.map((item, index)=>{
                return (
                    <div 
                        className="list-group-item"
                        key={item.key} 
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

```
###组件封装 src/component/Sortable.js
```
import React from 'react';
import Sortable from 'sortablejs';

class App extends React.Component { 
	constructor(props) {
        super(props);
        this.state = {
            dataSource: this.props.dataSource
        };
    }

    componentDidMount() {
		let el = this.refs.params
		this.sortable = Sortable.create(el, {
            onEnd: this.onEnd,
            ghostClass: 'ghost'
		})
    }

    componentWillReceiveProps (nextProps) {
    }

    // 退出销毁
    componentWillUnmount () {
        this.sortable.destroy()
    }

    onEnd = (evt) => {
        let { dataSource }  = this.state
        var itemEl = evt.item;  // dragged HTMLElement
        evt.oldIndex;  // element's old index within old parent
        evt.newIndex;  // element's new index within new parent
        const tempItem  = dataSource[evt.oldIndex]
        dataSource.splice(evt.oldIndex, 1)
        dataSource.splice(evt.newIndex, 0, tempItem)
        this.setState(dataSource,()=>{
            // 拖拽完成后触发 onChange 把值传出去
            this.props.onChange && this.props.onChange(dataSource)            
        })
    }


	render() {
        const { dataSource } = this.state
		return (
			<div style={this.props.style}>
                <div className="list-group" ref='params'>
                    {
                        this.props.children
                    }
                </div>
            </div>
		)
	}
}

export default App;
```
想要更多扩展可以查看[Sortable文档](https://github.com/RubaXa/Sortable)

