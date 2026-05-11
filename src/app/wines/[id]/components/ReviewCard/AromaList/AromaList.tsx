import { Fragment } from 'react';

import Aroma from '../Aroma/Aroma';
import { AromaListProps } from './type';

const AromaList = ({ aroma }: AromaListProps) => {
  return (
    <div className="flex flex-wrap">
      {aroma.map((item, index) => (
        <Fragment key={item}>
          <Aroma item={item} />
          {index !== aroma.length - 1 && (
            <span className="pr-2 pl-2 text-gray-300">·</span>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default AromaList;
