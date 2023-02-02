const root = ReactDOM.createRoot(document.getElementById('root'));

class ToDoList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: '', items: [] }

    this.handleChange = this.handleChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);

    this.input = React.createRef();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  addItem(event) {
    event.preventDefault();
    if(this.state.value !== '') {
      this.newItem = {
        text: this.state.value,
        key: Date.now()
      };
      this.setState(prevState => ({ items: prevState.items.concat(this.newItem) }));
      this.setState({ value: '' });
    }
    this.input.current.focus();
  }

  deleteItem(key) {
    this.filteredItems = this.state.items.filter((item) => item.key !== key);
    this.setState({ items: this.filteredItems });
    this.input.current.focus();
  }

  render() {
    return (
      <div className="container py-5">
        <h1 className="text-center"><i class="bi bi-list-check"></i> To Do List</h1>
        <div className="mb-3">
          <form onSubmit={ this.addItem }>
            <div className="input-group d-flex ">
              <input type="text" className="form-control" placeholder="Introduce una tarea" value={this.state.value} onChange={this.handleChange} ref={this.input} />
              <button type="submit" className="btn btn-primary">Añadir tarea</button>
            </div>
          </form>
        </div>
        <ToDoItems entries={ this.state.items } delete={ this.deleteItem }/>
      </div>
    )
  }
}

class ToDoItems extends React.Component {

  constructor(props) {
    super(props);
    this.createTasks = this.createTasks.bind(this);
  }

  deleteItemByKey(key) {
    this.props.delete(key);
  }

  createTasks(item) {
    return (
      <label className="list-group-item clearfix" key={item.key}>
        <input className="form-check-input me-1" type="checkbox" />
        {item.text}
        <i className="bi bi-x-circle-fill btn p-0 text-danger float-end" onClick={this.deleteItemByKey.bind(this, item.key)}></i>
      </label>
    );
  }

  render() {
    this.listItems = this.props.entries.map(this.createTasks);
    return (
      <div className="list-group">
        { this.listItems }
      </div>
    );
  }
}

root.render(<ToDoList/>);
