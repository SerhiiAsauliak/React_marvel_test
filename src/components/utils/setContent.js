import { Preloader } from "../preloader/preloader";
import { ErrorMessage } from "../errorMessage/errorMessage";
import { Skeleton } from "./../skeleton/Skeleton";

export const setContent = (process, Component, data) => {
   switch (process) {
     case 'waiting':
       return <Skeleton />
     case 'loading':
       return <Preloader />
     case 'confirmed':
       return <Component data={data}/>
     case 'error':
       return <ErrorMessage />
     default:
       throw new Error('Unexpected process state');
   }
 }