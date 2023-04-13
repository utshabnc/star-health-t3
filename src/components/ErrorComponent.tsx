import type { ReactNode } from 'react';

type ErrorComponentProps = {
  children: ReactNode;
}

const ErrorComponent = ({ children }:  ErrorComponentProps) => {
  return (
    <div className='flex justify-center items-center'>
      <div className="flex justify-center items-center shadow p-10 bg-red-100 rounded-md w-[40vw]">
        <svg className="w-16 mr-5 stroke-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p>{children}</p>
      </div>
    </div>
  );
};

export default ErrorComponent;
