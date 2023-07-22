import React, { FC } from 'react';
import {BsFillXCircleFill} from 'react-icons/bs'
interface TitleProps {
  title: string;
}

const NoResultComponent: FC<TitleProps> = ({ title }) => {
  return (
    <> 
      <div className='NoResultComp'>
        <BsFillXCircleFill className='errorIcon'></BsFillXCircleFill>
      <h1>No Results Found</h1>
      </div>
    </>
  );
};

export default NoResultComponent;