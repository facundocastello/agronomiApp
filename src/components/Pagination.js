import React from 'react';
import classnames from 'classnames';
import ReactPaginate from 'react-paginate';

export default function Pagination({
  children,
  contentClass,
  displayPagination,
  pageCount,
  handlePageChange
}) {
  return (
    <div>
      <div className={contentClass}>{children}</div>

      <ReactPaginate
        className='d-none'
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={pages => handlePageChange(pages.selected, 12)}
        containerClassName={classnames(
          'pagination',
          !displayPagination && 'd-none'
        )}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    </div>
  );
}
