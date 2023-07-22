import React, { useState } from 'react';
import { useRouter } from "next/router";
interface ResultComponentProps {
    title: string,
    subtitle:string;
    link:string;
    category: string;
  }
const ResultComponent: React.FC<ResultComponentProps> = ({ title,subtitle,link,category }) => {
    const navigation = useRouter();

return(


<div className="result-card" onClick={(e)=>    navigation.push(`${link}`)}>
<div className="result-title">{title}</div>
<div className="result-category">{category}</div>
<div className="result-subtitle">{subtitle}</div>
</div>
)
}
export default ResultComponent;