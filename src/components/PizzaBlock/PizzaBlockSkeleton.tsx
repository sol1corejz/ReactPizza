import React from 'react';
import ContentLoader from 'react-content-loader';

const PizzaBlockSkeleton: React.FC = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="134" cy="122" r="122" />
    <rect x="0" y="268" rx="10" ry="10" width="280" height="23" />
    <rect x="0" y="314" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="428" rx="10" ry="10" width="95" height="30" />
    <rect x="125" y="420" rx="24" ry="24" width="152" height="47" />
  </ContentLoader>
);

export default PizzaBlockSkeleton;
