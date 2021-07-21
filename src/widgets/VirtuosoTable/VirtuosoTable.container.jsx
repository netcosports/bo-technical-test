import React from 'react';
import VirtuosoTableView from './VirtuosoTable.view';

function VirtuosoTableContainer({ data, columns, style, isLoading, loadMore = () => {} }) {
  return (
    <div>
      <VirtuosoTableView
        rows={data}
        columns={columns}
        style={style}
        isLoading={isLoading}
        loadMore={loadMore}
      />
    </div>
  );
}

export default VirtuosoTableContainer;

// Displays a virtualized table
// Props :
// data : array of objects containing the data to be displayed
// columns : array of object with the following keys :
//    id : an id to construct the cells keys
//    label : the label of the column that will be display in the table head
//    render : a rendering function that takes the row data as parameter and render the content of the cell
// isLoading : boolean to display or not the loading skeleton
