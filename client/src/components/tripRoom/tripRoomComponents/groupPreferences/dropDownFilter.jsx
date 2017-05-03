import React, { Component } from 'react';

////////////////
// Drop Down
////////////////

class DropDownFilter extends Component {

  constructor (props){
    super(props);
  }

  componentDidMount(){
    $(document).ready(function() {
      $('select').material_select();
    });
  }

  render() {
    var {locations, selectedLocation, setter} = this.props;

    var options = locations.map((location, i) => (
      <option value={location} key={i}> {location} </option>
    ));

    return (
      <select className="browser-default" value={selectedLocation} onChange={setter}>
        {options}
      </select>
    );
  }
}


module.exports = DropDownFilter;