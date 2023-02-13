import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useHttp from '../../hooks/http.hook';
import { useCallback} from 'react';
import { v4 as uuidv4 } from 'uuid';

function TodoAddForm({displayWindow, setDisplayWindow}) {
   const {getRequest} = useHttp();


   const deleteTodoAddForm = () => {
      setDisplayWindow('d-none');
   }

   const handleFormSubmit = useCallback(
      (values, formAPI) => {
         let newDeed = {...values};
         newDeed.id = uuidv4();
         getRequest(`http://localhost:3001/deeds`, 'POST', JSON.stringify(newDeed) )
         .catch(err => console.log(err));  
         setDisplayWindow('d-none');
         formAPI.resetForm();
         formAPI.setSubmitting(false); 
      }
    // eslint-disable-next-line
      , [getRequest])
     
   return (
      <Formik
         initialValues={{
            title: '',
            description: '',
            category: ''
         }}
         validationSchema = {Yup.object({
            title: Yup.string()
            .min(2, 'Минимум два символа')
            .required('Обязательное поле'),
            description: Yup.string()
            .min(2, 'Минимум два символа')
            .required('Обязательное поле'),
            category: Yup.string()
            .matches(/[^.]/, 'Выберите категорию')
            .required('Обязательное поле')
         })}
         onSubmit = {(values, formAPI) => {
            handleFormSubmit(values, formAPI);
            
         }}
         >
            <Form className={` ${displayWindow} z-1 bg-light position-absolute top-50 start-50 translate-middle border p-4 shadow-lg rounded`}>

                  <label htmlFor="title" className="form-label">Title
                  </label>
                  <Field
                     required
                     type="text" 
                     name="title" 
                     className="form-control" 
                     id="title" 
                     placeholder="Type new deed"
                     />
                   
                  <ErrorMessage className='text-danger' name='title' component='div'/>                     

                  <label htmlFor="description" className="form-label">Description
                  </label>
                  <Field
                     required
                     name="description" 
                     className="form-control" 
                     id="text" 
                     placeholder="Type description"
                     as='textarea'
                    
                     />
                  <ErrorMessage className='text-danger'  name='description' component='div'/>  

                <label htmlFor="category" className="form-label">Choose category
                </label>
                <Field
                    required
                    className="form-select" 
                    id="category" 
                    name="category"
                    as='select'
                    >
                    <option >...</option>
                    <option value='Shopping List'>Shopping List</option>
                    <option value='Homework'>Homework</option>
                    <option value='Bussines'>Bussines</option>
                    <option value='Child'>Child</option>
                    <option value='Hobbi'>Hobbi</option>
                    <option value='Ho.bbi'>Ho.bbi</option>
                </Field>
                <ErrorMessage className='text-danger' name='category' component='div'/>
                

            <button type="submit" className="btn btn-danger">OK</button>
            <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
            <button onClick={deleteTodoAddForm} type="button" className="btn-close btn-close" aria-label="Close"/>
         </span>


            </Form>
        </Formik>
   )
}

export default TodoAddForm;