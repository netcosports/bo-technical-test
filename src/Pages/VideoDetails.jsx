import React from 'react';

const detailsStyle = {
  height: '40vh',
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
};

function VideoDetails() {
  return (
    <div style={detailsStyle}>
      <form onSubmit={() => {}} style={{ width: '15%' }}>
        <div></div>
        <label htmlFor="name">Name : </label>
        <input type="text" id="name" style={{ width: '100%' }} />
        <div>
          <label htmlFor="description">Description : </label>
          <input type="text" id="description" style={{ width: '100%' }} />
        </div>
        <div>
          <label htmlFor="publication-date">Publication date : </label>
          <input type="date" id="publication-date" style={{ width: '100%' }} />
        </div>
        <div>
          <p>Visibility:</p>

          <input type="radio" id="public" value="public" name="visibility" />
          <label htmlFor="public">Public </label>

          <input type="radio" id="private" value="private" name="visibility" defaultChecked />
          <label htmlFor="private">Private </label>
        </div>
        <img src="" alt="" />
      </form>
    </div>
  );
}

export default VideoDetails;
