class Dropdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="geo-dropdown">
        <select
          value={this.props.value}
          onChange={this.props.onChange}
          className="geo-select"
        >
          <option className="geo-option" value="sf">
            San Francisco
          </option>
          <option className="geo-option" value="marin">
            Marin
          </option>
          <option className="geo-option" value="alameda">
            Alameda
          </option>
          <option className="geo-option" value="sanmateo">
            San Mateo
          </option>
          <option className="geo-option" value="santaclara">
            Santa Clara
          </option>
        </select>
        <style jsx>{`
          .geo-dropdown {
            display: inline;
          }
          .geo-select {
            font-size: 16px;
            border: 1px solid #263238;
            padding: 0 30px 0 10px;
            width: 150px;
            height: 35px;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            background: url(http://localhost:3000/static/images/baseline_expand_more_black_18dp.png)
              96% / 15% no-repeat #eceff1;
          }
          .geo-option {
            width: 100px;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        `}</style>
      </div>
    );
  }
}
export default Dropdown;
