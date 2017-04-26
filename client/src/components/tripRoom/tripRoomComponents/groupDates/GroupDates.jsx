import React, { Component } from 'react';

var today = new Date().getTime();
var oneDay = 24 * 60 * 60 * 1000;

class DataStore1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartJSON: {
        type: 'hbar',
        plot: {
          stacked: true,
          animation: {
            sequence: 3,
            effect: 4,
            method: 1,
            speed: 500
          }
        },
        legend: {
          borderWidth: 0
        },
        plotarea: {
          margin: 'dynamic'
        },
        scaleX: {
          labels: ['Max', 'Lou', 'Nate', 'Jesse', 'Preston']
        },
        scaleY: {
          transform: {
            type: 'date',
            all: '%m/%d/%y'
          },
          minValue: today,
          step: oneDay
        },
        series: [
          {
            values: [5 * oneDay, 4 * oneDay, 8 * oneDay, 7 * oneDay, 5 * oneDay],
            offsetValues: [today + (oneDay * 2), today, today + (oneDay * 3), today + (oneDay * 7), today + (oneDay * 6)],
            backgroundColor: '#FF6600',
            valueBox: {
              placement: 'bottom',
              rules: [
                {
                  rule: '%i === 2',
                  visible: false
                }
              ]
            },
            text: 'Time range per person'
          }
        ]
      }
    };
  }

  render() {
    return (
      <div>
        <ZingChart id="chart1" data={this.state.chartJSON} />
      </div>
    );
  }
}

class ZingChart extends Component {
  constructor(props) {
    super(props);
  }

  //Called after the render function.
  componentDidMount() {
    zingchart.render({
      id: this.props.id,
      width: this.props.width || '100%',
      height: this.props.height || 400,
      data: this.props.data
    });
  }

  //Used to check the values being passed in to avoid unnecessary changes.
  shouldComponentUpdate(nextProps, nextState) {
    //Lazy object comparison
    return !(JSON.stringify(nextProps.data) === JSON.stringify(this.props.data));
  }

  componentWillUpdate(nextProps) {
    zingchart.exec(this.props.id, 'setdata', {
      data: nextProps.data
    });
  }

  render() {
    return <div id={this.props.id} />;
  }
}

export default DataStore1;