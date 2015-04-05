(function(){
	var socket = io.connect();

	var Item = React.createClass({
        render: function() {
            return (
                <label >
                    <input type="checkbox" />
                </label>
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
				<div>
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