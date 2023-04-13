import React, { useEffect, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { selectSort, setSortType } from '../redux/slices/filterSlice';

type SortItem = {
  name: string;
  sortProperty: string;
};

type SortProps = {
  order: boolean;
  setOrder: (arg: boolean) => void;
};

export const sortList: SortItem[] = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту', sortProperty: 'alphabet' },
];

const Sort: React.FC<SortProps> = ({ order, setOrder }) => {
  const dispatch = useDispatch();
  const sortType = useSelector(selectSort);
  const sortRef = useRef<HTMLDivElement>(null);

  const [isOpened, setIsOpened] = React.useState(false);

  const chooseSort = (obj: SortItem) => {
    dispatch(setSortType(obj));
    setIsOpened(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!event.composedPath().includes(sortRef.current)) {
        setIsOpened(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label" onClick={() => setIsOpened(!isOpened)}>
        <svg
          style={order ? { transform: `rotate(180deg)` } : {}}
          onClick={(e) => {
            e.stopPropagation();
            setOrder(!order);
          }}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"></path>
        </svg>
        <b>Сортировка по:</b>
        <span>{sortType.name}</span>
      </div>
      {isOpened && (
        <div className="sort__popup">
          <ul>
            {sortList.map((elemenet, index) => (
              <li
                key={index}
                onClick={() => chooseSort(elemenet)}
                className={elemenet.sortProperty === sortType.sortProperty ? 'active' : ''}>
                {elemenet.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
