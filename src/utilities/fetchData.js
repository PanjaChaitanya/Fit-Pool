export const exerciseOptions =  {
    method: 'GET',
	headers: {
		'x-rapidapi-key': 'b07efdb2c9mshdeb5ad6975222c4p1876bbjsnd16da10de447',
		'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
	}
}

export const fetchData = async (url,options) =>{

    const response = await fetch(url,options)
    const data = await response.json();

    return data

}