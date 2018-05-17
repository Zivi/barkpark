class Dropdown extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <select value={this.props.value} onChange={this.props.onChange}>
          <option value="sf">San Francisco</option>
          <option value="marin">Marin</option>
        </select>
      </div>
    )
  }
}
export default Dropdown;