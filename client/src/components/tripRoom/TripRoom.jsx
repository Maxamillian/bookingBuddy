import React from 'react';
import {tripData, hotelRecomendations} from './data/tripRoomDummyData';
import {expediaData, hotwireData} from './data/tripRoomDynamicData';
import fetchInformation from './APIsRouter';
import axios from 'axios';

import TripRoomComponents from './tripRoomComponents/TripRoomComponents.jsx';

// Used for testing
import $ from 'jquery';

/////////////////////////
// Trip Room Components
/////////////////////////


class TripRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripData: {}
    };
  }

  componentDidMount() {
    console.log('getting current trip data for trip # ' + this.props.tripId);

    this.fetchTripInformation(this.props.tripId);
  }

  fetchTripInformation(Id){
    console.log("GETTING TRIP DATA!")
    $.ajax({
      type: 'POST',
      url: '/getTripData',
      dataType: 'json',
      data: { tripId : Id },
      success: function(data) {
        console.log(data, "Data");
        var loadedTripData = {
          tripId: data.tripId,
          tripName: data.tripName,
          commonDates: data.commonDates,
          commonLocations: data.commonTrips,
          averageNightlyHotelBudget: data.averageNightlyHotelBudget,
          buddyList: data.buddyList,
          bookmarks: data.bookmarks
        }
        this.setState({tripData: loadedTripData});
      }.bind(this)
    }.bind(this));
  }

  render() {
    return (
      <div>
        <TripRoomComponents
          tripData={tripData}
          profile={this.props.profile}

          tripId={this.props.tripId}
          hotelRecomendations={hotelRecomendations}
        />
      </div>
    );
  }
}

export default TripRoom;



// var tripData  = {
//   tripId: 12345,             //PERFECT
//   tripName: 'Hiking Trip',   //PERFECT
//   commonDates:  {.           //PERFECT
//     beginning: '4/29/2017',
//     duration: 4,
//     ending: '5/12/2017'
//   },
//   commonLocations: [        //commonTrips
//     'cityName1',
//     'cityName2'
//   ],
//   averageNightlyHotelBudget: 127.00,    //PERFECT
//   buddyList: [{                          //PERFECT
//       name: 'Lou',
//       email: 'formMasterLou@gmail.com',
//     }],
//   bookmarks: [{                            //PERFECT. (not sure about contents yet)
//     bookmarkID: Date.now(),
//     tripId: 23,
//     bookmarkerName: 'Lou',
//     boormarkerNote: 'stringComment',
//     bookmarkedHotelId: 'expediaHotelString',
//     bookmarkComments: [{
//       buddyName: 'Lou',
//       buddyEmail: 'formMasterLou@gmail.com',
//       date: 1492888181571,
//       comment: 'messageMadeUnderBookmark'}
//     ],
//     buddyVotes: [{
//       buddyName: 'Lou',
//       buddyEmail: 'formMasterLou@gmail.com',
//       buddyVote: -1
//     }]
//   }]
// }
