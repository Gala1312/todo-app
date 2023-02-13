import './TodoListItem.css';

function TodoListItem ({title, deleteDeed}) {
   return (
      <li className='card align-items-center flex-row mb-4 shadow-lg'>

         <button type='button' className="h-25 me-2 badge border rounded-pill bg-warning">
         <i className="bi bi-check2"></i>
         </button>

         <div className="card-body p-1 text-break">
            <p className="card-text ">{title}</p>
         </div>

         <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
            <button onClick={deleteDeed} type="button" className="btn-close btn-close" aria-label="Close"/>
         </span>
      
      </li>
   )
}

export default TodoListItem;