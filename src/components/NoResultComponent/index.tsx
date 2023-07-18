import React, { FC } from 'react';
import {VscError} from 'react-icons/vsc'
interface TitleProps {
  title: string;
}

const NoResultComponent: FC<TitleProps> = ({ title }) => {
  return (
    <> 
      <div className='NoResultComp'>
        <VscError className='errorIcon'></VscError>
      <h1>No Results Found</h1>
      </div>
    </>
  );
};

export default NoResultComponent;