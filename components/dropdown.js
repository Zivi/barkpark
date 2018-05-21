const geos = [
  ["sf", "San Francisco"],
  ["marin", "Marin"],
  ["alameda", "Alameda"],
  ["sanmateo", "San Mateo"],
  ["santaclara", "Santa Clara"]
];

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
          {geos.map(geo => (
            <option className="geo-option" value={geo[0]} key={geo[0]}>
              {geo[1]}
            </option>
          ))}
        </select>

        <style jsx>{`
          .geo-dropdown {
            display: inline-block;
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
