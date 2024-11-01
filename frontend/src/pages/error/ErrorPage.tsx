// HomePage.tsx
import { useLocation } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import React from 'react';

interface ErrorPageProps {
  errorMessage?: string;
}
/**
 * A brief description of the ErrorPage component.
 * 
 * More detailed description if necessary.
 * 
 * @returns {JSX.Element} The rendered ErrorPage component.
 */

const ErrorPage: React.FC = () => {
    const location = useLocation();
    const { errorMessage = "404" }= location.state as ErrorPageProps || {};
  return (
    <>
     <ErrorMessage message={errorMessage}/>
    </>
  );
};

export default ErrorPage;
