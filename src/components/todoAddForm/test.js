import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
// import { useHttp } from '../../hooks/http.hook';
import { activeFilterChanged, fetchFilters } from './filterSlice';
import Spinner from '../spinner/Spinner';


const WritersFilters = () => {
   const { filters, filtersLoadingStatus, activeFilter } = useSelector(state => state.filterReducer);
   const dispatch = useDispatch();
   // const { request } = useHttp();

   useEffect( () => {
      dispatch(fetchFilters());
       // eslint-disable-next-line
   }, []);

   if (filtersLoadingStatus === "loading") {
      return <Spinner/>;
   } else if (filtersLoadingStatus === "error") {
      return <h5 className="text-center mt-5">Ошибка загрузки</h5>
   }

   const renderFilters = (arr) => {
      if (arr.length === 0) {
         return <h5 className="text-center mt-5">Фильтры не найдены</h5>
      }
      return arr.map( ({name, className, label}) => {
         const btnClass = classNames('btn', className, {
            'active': name === activeFilter
         });

         return <button onClick={()=>dispatch(activeFilterChanged(name))}  
                        className={btnClass} key={name} id={name}>{label}
                </button>
      } )
   }
  const button = renderFilters(filters);
    
  return (
      <div className="card shadow-lg mt-4">
          <div className="card-body">
              <p className="card-text">Отфильтруйте героев по элементам</p>
              <div className="btn-group">

               {button}
                 
              </div>
          </div>
      </div>
  )
}
export default WritersFilters;


// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

// const WritersFilters = () => {
  
//    const dispatch = useDispatch();
//    const { writers, filtersAll, filters } = useSelector(state => state)
 
//    const writerDownload = () => {
//      dispatch(writersFetched(filtersAll));
//    }
 
//    const button = filters.map( (item, i) => {
//      const check = writers.find( (obj) => (
//        obj.element === item.name
//      ))
     
//        return(
//          !check ? null :
//          <button onClick={()=>dispatch(writerFilter(item.name))}  
//                  className={item.color} key={i}>{item.name}
//          </button>
//        )  
//      })
 
 
//    return (
//        <div className="card shadow-lg mt-4">
//            <div className="card-body">
//                <p className="card-text">Отфильтруйте героев по элементам</p>
//                <div className="btn-group">
 
//                    <button onClick={writerDownload}
//                            className="btn btn-outline-dark active">Все
//                    </button>
 
//                    {button}
                  
//                </div>
//            </div>
//        </div>
//    )
//  }
//  export default WritersFilters;