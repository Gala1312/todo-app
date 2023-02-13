import TodoListItem from '../todoListItem/TodoListItem';
import { useEffect, useCallback } from 'react';
import useHttp from '../../hooks/http.hook';
import Spinner from '../spinner/Spinner';

function Content ({deeds, setDeeds, activeFilter}) {
   
   const {getRequest, process, setProcess} = useHttp();

   const getDeedsFromServer = () => {
      getRequest('http://localhost:3001/deeds')
      .then(data => setDeeds(data))
      .then(setProcess('waiting'))
      .catch(e => console.log(e))
   }

   useEffect( ()=> {
      getDeedsFromServer();
   }
 // eslint-disable-next-line
   , []);

   const deleteDeed = useCallback(
      (id) => {
         getRequest(`http://localhost:3001/deeds/${id}`, 'DELETE')
         .catch(err => console.log(err));  
         getDeedsFromServer();     
      }
      // eslint-disable-next-line
   , [getRequest]);

   if (process === "loading") {
      return <Spinner/>;
   } else if (process === "error") {
      return <h5 className="text-center mt-5">Ошибка загрузки</h5>
   } 

   const deedsForRender = activeFilter === 'All'?
      deeds : deeds.filter(item => item.category === activeFilter);

   const element = deedsForRender.map((item) => (
       <TodoListItem key={item.id} 
                     title={item.title} 
                     deleteDeed={() => deleteDeed(item.id)}
                     category={item.category}
                     />
   ))

   return (
      <ul>
         {element}
      </ul>
   
   )
}

export default Content;