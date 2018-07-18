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

    componentWillUnmount () {
        this.sortable.destroy()
    }

    onEnd = (evt) => {
        // console.log('onend.......................')
        let { dataSource }  = this.state
        var itemEl = evt.item;  // dragged HTMLElement
        evt.oldIndex;  // element's old index within old parent
        evt.newIndex;  // element's new index within new parent
        const tempItem  = dataSource[evt.oldIndex]
        dataSource.splice(evt.oldIndex, 1)
        dataSource.splice(evt.newIndex, 0, tempItem)
        this.setState(dataSource,()=>{
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