// import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactAutocomplete from 'react-autocomplete';
import { useSearch } from './hooks';

function App() {
  const [value, setValue] = useState('');
  // const [items, setItems] = useState([]);

  const {articles, status, error} = useSearch(value);


  /*
  useEffect(() => {
    axios.get(`https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${value}`)
      .then(function (response) {
        const parsedResponse = [];
        for(let i = 0; i < response.data[1].length; i++) {
          parsedResponse.push({
            id: response.data[3][i],
            label: response.data[1][i],
          })
        }

        setItems(parsedResponse);
        // debugger;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        debugger;
      });    
  }, [value]); // dependencies: [], makes it run once, depencies makes it just to run if the value indicated changed
  // */

  return (
    <>
      <p>Status: {status}</p>
      <p>Error: {error}</p>
      <ReactAutocomplete
        items={articles} // items}
        shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
        getItemValue={item => item.label}
        renderItem={(item, highlighted) =>
          <div
            key={item.id}
            style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
          >
            {item.label}
          </div>
        }
        value={value}
        onChange={e => setValue(e.target.value)}
        onSelect={value => setValue(value)}
      />
    </>
  );
}

export default App;
