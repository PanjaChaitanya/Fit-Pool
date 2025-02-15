export const exerciseOptions =  {
    method: 'GET',
	headers: {
		'x-rapidapi-key': '92978a2a4amshcc8d4cd1102d78ep1d900bjsnf46e6dcc3dbe',
		'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
	}
}

export const fetchData = async (url,options) =>{

    const response = await fetch(url,options)
    const data = await response.json();

    return data

}