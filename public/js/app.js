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
		render: function() {
			return (
				<form>
					<input type="text"/>
					<button>Add </button>
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