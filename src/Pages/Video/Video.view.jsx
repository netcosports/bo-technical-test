import React from 'react';

import styles from './video.module.scss';

function VideoView({ videos, setIdVideo }) {
  return (
    <div className={styles.loginWrapper}>
      {!videos ? (
        <p>...Loading</p>
      ) : (
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Publication date</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {videos &&
              videos.map((video, index) => (
                <tr
                  key={index}
                  onClick={() => {
                    setIdVideo(video.id);
                  }}>
                  <td>{video.name}</td>
                  <td>{video.status}</td>
                  <td>{video.publicationDate}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default VideoView;
