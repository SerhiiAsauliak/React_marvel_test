import { Helmet } from 'react-helmet';
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";


export const ComicsPage = () => {
   return (
      <>
         <Helmet>
         <meta
            name="description"
            content="Page with comics list"
         />
            <title>Comics page</title>
         </Helmet>
         <AppBanner />
         <ComicsList />
      </>
   )
}