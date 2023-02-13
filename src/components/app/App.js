import './App.css';
import TodoList from '../todoList/TodoList';
import Filters from '../filters/Filters';
import TodoAddForm from '../todoAddForm/TodoAddForm';
import { useState } from 'react';

function App() {
   const [displayWindow, setDisplayWindow] = useState('d-none')
   const [deeds, setDeeds] = useState([]);
   const [activeFilter, setActiveFilter] = useState('All');
   const [filters, setFilters] = useState([]);

   const onDisplayWindow = () => {
      setDisplayWindow ('d-block');
   }
  return (
    <main className="app">
      <div className='content'>
         <div className='content__panel'>

            <button onClick={onDisplayWindow} type='button' className='btn btn-danger mb-4'>Add</button>

            <div className='content__panel__filters'>
               <Filters setActiveFilter={setActiveFilter} filters={filters} setFilters={setFilters}/>
            </div>

         </div>
         {displayWindow === 'd-none' ? 
         <TodoList deeds={deeds} setDeeds={setDeeds} activeFilter={activeFilter}/> : 
         <TodoAddForm displayWindow={displayWindow} setDisplayWindow={setDisplayWindow} />}     
      </div>
    </main>
  );
}

export default App;
