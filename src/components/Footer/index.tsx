import React from 'react';
import { Filter } from 'src/models';
import classNames from 'classnames';
import style from './style.module.scss';

export interface IProps {
  filter: Filter;
  activeCount?: number;
  completedCount?: number;
  onClickFilter: (filter: Filter) => unknown;
  onClickClearCompleted: () => unknown;
}

export const FILTER_TITLES = {
  [Filter.SHOW_ALL]: 'All',
  [Filter.SHOW_ACTIVE]: 'Active',
  [Filter.SHOW_COMPLETED]: 'Completed'
};

export const Footer = ({
  filter,
  activeCount,
  completedCount,
  onClickFilter,
  onClickClearCompleted
}: IProps): JSX.Element => {
  const renderTodoCount = React.useCallback((): JSX.Element => {
    const itemWord = activeCount === 1 ? ' item' : 'items';
    return (
      <span className={style.count}>
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    );
  }, [activeCount]);

  const renderFilterLink = React.useCallback(
    (selectedFilter: Filter): JSX.Element => {
      return (
        <a
          className={classNames({ [style.selected]: filter === selectedFilter })}
          style={{ cursor: 'pointer' }}
          onClick={() => onClickFilter(selectedFilter)}
        >
          {FILTER_TITLES[selectedFilter]}
        </a>
      );
    },
    [filter, onClickFilter]
  );

  const renderClearButton = React.useCallback((): JSX.Element | void => {
    if (completedCount) {
      return (
        <button className={style.clearCompleted} onClick={onClickClearCompleted}>
          {'Clear completed'}
        </button>
      );
    }
  }, [completedCount, onClickClearCompleted]);

  return (
    <footer className={style.normal}>
      {renderTodoCount()}
      <ul className={style.filters}>
        {(Object.keys(Filter) as (keyof typeof Filter)[]).map((key) => (
          <li key={key}>{renderFilterLink(Filter[key])}</li>
        ))}
      </ul>
      {renderClearButton()}
    </footer>
  );
};
