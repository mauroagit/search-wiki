import { useEffect, useState } from 'react';
import axios from 'axios';

export const useSearch = (query) => {
    const [state, setState] = useState({
        articles: [],
        status: 'IDLE',
        error: '',
    });

    useEffect(() => {
        axios.get(`https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${query}`)
          .then(function (response) {
            const parsedResponse = [];
            for(let i = 0; i < response.data[1].length; i++) {
              parsedResponse.push({
                id: response.data[3][i],
                label: response.data[1][i],
              })
            }
    
            // setItems(parsedResponse);
            setState({
                articles: parsedResponse,
                status: 'SUCCESS',
                error: '',
            });
            // debugger;
          })
          .catch(function (error) {
            // handle error
            console.log(error);
            setState({
                articles: [],
                status: 'ERROR',
                error: error,
            });
          });    
      }, [query]); // dependencies: [], makes it run once, depencies makes it just to run if the value indicated changed
    
    return state;
}