(function(){
	var socket = io.connect();
	var todo = {};

	var Item = React.createClass({
		handleChange:function(e,value){
			socket.emit("done",this.props.id, !this.props.done);
		},
        render: function() {
            return (
                <label >
                    <input type="checkbox" onChange={this.handleChange} checked={this.props.done}/>
                    {this.props.text}
                </label>
            )
        }
	});

	var ItemList = React.createClass({
		render: function(){
			var itemNodes = this.props.data.map(function(item){
				return (
					<Item done={item.done} text={item.text} id={item.id}>
					</Item>
				);
			});
			
			return (
				<div className="itemList">
					{itemNodes}
				</div>
			)
		}
	});

	var ItemForm = React.createClass({
		handleSubmmit: function(e){
			e.preventDefault();
			var item = React.findDOMNode(this.refs.item).value.trim();

			if(!item){
				return
			}

			React.findDOMNode(this.refs.item).value="";
			socket.emit("add",item)
			return;
		},
		render: function() {
			return (
				<form onSubmit={this.handleSubmmit}>
					<input type="text" ref="item"/>
					<button type="submit">Add </button>
				</form>
			)
		}
	});

	var ItemBox = React.createClass({
		loadItemsFromServer: function(){
			socket.on("history",function(items){
				todo.list=items;
				this.setState({data:items});
			}.bind(this))
			.on("update", function(data){
				if(data.new_val && !data.old_val){
					todo.list.push(data.new_val);
					this.setState({data:todo.list});
					return
				}
				
				for(var item in todo.list){
					if(todo.list[item].id == data.old_val.id){
						todo.list[item] = data.new_val;
					}
				}
				this.setState({data:todo.list})
			}.bind(this));
		},

		getInitialState: function(){
			return {data:[]};
		},
		componentDidMount: function(){
			this.loadItemsFromServer();
		},

		render:function(){
			return (
				<div className="commentBox">
					<ItemList data={this.state.data}/>
					<ItemForm />
				</div>
			)
		}
	})

	React.render(
		<ItemBox />,		
		document.querySelector('#todo')
	);
}());