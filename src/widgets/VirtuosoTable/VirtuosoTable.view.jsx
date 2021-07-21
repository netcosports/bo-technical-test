import React, { useMemo } from 'react';
import { Virtuoso } from 'react-virtuoso';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import VirtuosoSkeleton from './Virtuoso.skeleton';
import './styles.scss';
import VirtuosoTableNoDataRow from './VirtuosoTable.noDataRow';

const VirtuosoTableView = ({ columns, rows, style, isLoading, loadMore }) => {
  return (
    <Virtuoso
      style={style}
      totalCount={rows?.length}
      endReached={loadMore}
      components={{
        List: React.forwardRef(({ children, style }, ref) => {
          return (
            <Table
              style={{
                '--virtuosoPaddingTop': `${style?.paddingTop ?? '0'}px`,
                '--virtuosoPaddingBottom': `${style?.paddingBottom ?? '0'}px`,
              }}
              stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((col) => (
                    <TableCell key={col.id} style={{ textAlign: col?.align ?? 'center' }}>
                      {col.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody ref={ref}>
                {children}
                {isLoading && <VirtuosoSkeleton columns={columns} />}
              </TableBody>
            </Table>
          );
        }),
        Item: useMemo(
          () => (props) => {
            // eslint-disable-next-line react/destructuring-assignment
            const row = rows[props['data-index']];

            return (
              <TableRow {...props}>
                {columns.map((col) => (
                  <TableCell key={col.id}>{col.render(row, props['data-index'])}</TableCell>
                ))}
              </TableRow>
            );
          },
          [columns, rows],
        ),
        Footer: () => rows?.length === 0 && !isLoading && <VirtuosoTableNoDataRow />,
      }}
    />
  );
};

export default VirtuosoTableView;
