import { useEffect } from 'react';
import useHttp from '../../hooks/http.hook';
import Spinner from '../spinner/Spinner';


function Filters ({setActiveFilter, filters, setFilters}) {

   const {getRequest, process, setProcess} = useHttp();

   useEffect(()=>{
      getRequest('http://localhost:3001/filters')
      .then(data => setFilters(data))
      .catch(e => console.log(e))
      setProcess('weiting');
   // eslint-disable-next-line
   }, [])

   if (process === "loading") {
      return <Spinner/>;
   } else if (process === "error") {
      return <h5 className="text-center mt-5">Ошибка загрузки</h5>
   }

   const changeActiveFilter = (filter) => {
      setActiveFilter(filter);
   }

   const renderFilter = (arr) => {
      if(arr.length === 0) {
         return <h5>No filters</h5>
      }
      return arr.map((item) => {
         return <button key={item.name} type="button" 
                        id={item.name}  className="btn btn-warning mb-4"
                        onClick={() => changeActiveFilter(item.name)}
                >{item.name} 

                </button>
      })
   }

   const button = renderFilter(filters);

   return (
      <div className="btn-group-vertical" role="group" aria-label="Vertical button group">
         {button}
      </div>
   )
}

export default Filters;