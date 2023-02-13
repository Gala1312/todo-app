import { useState, useCallback } from 'react';

function useHttp() {
   const [process, setProcess] = useState('waiting');

   const clearError = useCallback(() => {
      setProcess('waiting')
   }, [])

   const getRequest = useCallback(
      async (url, method = 'GET', body = null, headers = {'Content-Type':'application/json'}) => {

         setProcess('loading');
         try {
            let result = await fetch (url, {method, body, headers});
            if (!result.ok) {
               throw new Error(`Could not fetch ${url}, status: ${result.status}`);
            }
            const data = await result.json();
            return data;

         } catch(e) {
            setProcess('error');
            throw e;
         }
      }
      , [])
      return {process, setProcess, getRequest, clearError}

}

export default useHttp;