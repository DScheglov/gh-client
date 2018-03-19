import React from 'react';
import { number, func } from 'prop-types';

const selectPage = (page, onPageSelected) => event => {
  event.preventDefault();
  onPageSelected(page);
};

const Prev = ({ page, onPageSelected }) => (
  <li className={`page-item ${page < 1 ? 'disabled' : ''}`} >
    <a
      className="page-link"
      href={`/${page}`}
      aria-label="Previous"
      onClick={selectPage(page, onPageSelected)}
    >
      <span aria-hidden="true">&laquo;</span>
      <span className="sr-only">Previous</span>
    </a>
  </li>
);

const Page = ({ page, currentPage, onPageSelected }) => (
  <li className={`page-item ${page === currentPage ? 'active' : ''}`}>
    <a className="page-link" href="/" onClick={selectPage(page, onPageSelected)}>
      {page}
    </a>
  </li>
);

const Next = ({ page, onPageSelected, pages }) => (
  <li className={`page-item ${page >= pages ? 'disabled' : ''}`}>
    <a className="page-link" href="/" aria-label="Next" onClick={selectPage(page, onPageSelected)}>
      <span aria-hidden="true">&raquo;</span>
      <span className="sr-only">Next</span>
    </a>
  </li>
);

const Filler = () => (
  <li className="page-item disabled">
    <span className="page-link">...</span>
  </li>
);

const min = (...args) => Math.min(...args);
const max = (...args) => Math.max(...args);

const renderPages = (currentPage, low, high, onPageSelected) => {
  const length = high - low + 1;
  return Array.from({ length }).map(
    (_, index) => (
      <Page
        key={index}
        page={index + low}
        onPageSelected={onPageSelected}
        currentPage={currentPage}
      />
    )
  );
};

const calcMargins = (page, pages, maxCount, radius = maxCount % 2) => (
  page + radius <= maxCount ? { low: 1, high: min(maxCount, pages) } :
  page + radius >= pages ? { low: max(pages - maxCount, 1), high: pages } :
  { low: page - radius, high: page + radius }
);

const Paginator = ({ currentPage, pages, onPageSelected, maxCount }) => {
  if (pages < 2) return null;
  const { low, high } = calcMargins(currentPage, pages, maxCount);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <Prev page={currentPage - 1} onPageSelected={onPageSelected} />
        {low > 1 && <Filler />}
        {renderPages(currentPage, low, high, onPageSelected)}
        {high < pages && <Filler />}
        <Next page={currentPage + 1} onPageSelected={onPageSelected} pages={pages} />
      </ul>
    </nav>
  );
};

Paginator.propTypes = {
  currentPage: number,
  pages: number,
  onPageSelected: func,
  maxCount: number,
};

Paginator.defaultProps = {
  maxCount: 5,
};

export default Paginator;
