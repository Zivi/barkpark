class Dropdown extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="geo-dropdown">
        <select value={this.props.value} onChange={this.props.onChange} className="geo-select">🐾
          <option value="sf">San Francisco</option>
          <option value="marin">Marin</option>
        </select>
        <style jsx>{`
          .geo-dropdown {
            display: inline;
          }
          .geo-select {
            padding: 5px;
          }
        `}</style>
      </div>
    )
  }
}
export default Dropdown;