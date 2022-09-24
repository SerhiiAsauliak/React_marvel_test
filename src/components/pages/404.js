import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { ErrorMessage } from './../errorMessage/errorMessage';

export const Page404 = () => {
   return (
      <div>
         <Helmet>
            <meta
               name="description"
               content="Error page"
            />
            <title>Error</title>
         </Helmet>
         <ErrorMessage/>
         <p style={{textAlign: 'center', fontSize: '20px', fontWeight: 'bold'}}>Page not found</p>
         <Link to={"/"} style={{display: 'block' ,textAlign: 'center', fontSize: '20px', fontWeight: 'bold'}}>Back to main page</Link>
      </div>
   )
}