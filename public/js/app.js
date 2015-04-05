(function(){
	var socket = io.connect();
	var todo = {};


	var Item = React.createClass({
        render: function() {
            return (
                <label >
                    <input type="checkbox" checkd={this.props.done}/>
                    {this.props.text}
                </label>
            )
        }
	});

	var ItemList = React.createClass({
		render: function(){
			var itemNodes = this.props.data.map(function(item){
				return (
					<Item done={item.done} text={item.text} >
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
			console.log(item);

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
				todo.list = items;
				console.log("socket history emited", items);
				this.setState({data:items});
			}.bind(this)).on("update", function(data){
				console.log("update",data);
				this.setState({data:data})
			})
		},
		getInitialState: function(){
			return {data:[]};
		},
		componentDidMount: function(){
			this.loadItemsFromServer();
		},

		render:function(){
			console.log(this.state)
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