(function(){
	var socket = io.connect();

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
					<Item done={item.done} text={itemtext} >
					</Item>
				);
			});
			
			return (
				<div className="itemList">
					{ItemNodes}
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
		render:function(){
			return (
				<div className="commentBox">
					<Item />
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