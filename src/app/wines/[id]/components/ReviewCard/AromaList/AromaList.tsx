import { Fragment } from 'react';
import { AromaListProps } from './type';
import Aroma from '../Aroma/Aroma';

const AromaList = ({ aroma }: AromaListProps) => {
  return (
    <div className="flex">
      {aroma.map((item, index) => (
        <Fragment key={item}>
          <Aroma item={item} />
          {index !== aroma.length - 1 && (
            <span className="text-gray-300 pr-2 pl-2">·</span>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default AromaList;
