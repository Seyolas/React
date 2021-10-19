import React, { useState, useContext, useEffect } from 'react'


const AppContext = React.createContext()
const API_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_ACCESS_KEY}`;

const AppProvider = ({ children }) => {
  
  const [query,setQuery]=useState('kill');
  const [loading,setLoading] = useState(true);
  const [movies,setMovies]=useState([]);
  const [alert,setAlert] = useState({show:false,msg:''});

  const fetchData = async (url)=>{
    setLoading(true);
    const data = await fetch(url);
    const response = await data.json();
    console.log(response);
    if (response.Error === 'Too many results.' && response.Response==='False') {
     
      setAlert({show:true,msg:'too many results'});
    }
    else if (response.Response==='False') {
      setLoading(false);
      setAlert({show:false});
      // setAlert({show:true,msg:'No matches'});
    }
    else{
      setMovies(response.Search);
      setLoading(false);
      // setAlert({show:false,msg:''});

    }

  }




  useEffect(() => {
  
    fetchData(`${API_URL}&s=${query}`);
  

  }, [query])

  return <AppContext.Provider value={{movies,query,setQuery,alert,setAlert, loading}}>
      {children}</AppContext.Provider>

}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }


