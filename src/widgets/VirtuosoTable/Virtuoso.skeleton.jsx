import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

function VirtuosoSkeleton({ columns }) {
  return (
    <>
      {[...Array(5)].map((e, i) => (
        <TableRow key={i}>
          {columns.map((col, j) => (
            <TableCell key={col.id}>
              {j < columns.length - 1 ? (
                <Skeleton variant="text" />
              ) : (
                <p style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  <Skeleton variant="circle" width={30} height={30} />
                  <Skeleton variant="circle" width={30} height={30} />
                </p>
              )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

export default VirtuosoSkeleton;
