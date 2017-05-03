import React from 'react';

const Loading = () => (
  <div className="container">
    <div className="row">
      <h3>Sit back and relax, we are searching all of the interwebs to find the best trips for your group</h3>
      <div className="preloader-wrapper big active">
        <div className="spinner-layer spinner-blue">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Loading;