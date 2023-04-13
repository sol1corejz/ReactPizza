import React from 'react';

type CategoriesProps = {
  value: number;
  setValue: (arg: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({ value, setValue }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => setValue(index)}
            className={value === index ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
