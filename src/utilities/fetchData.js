export const exerciseOptions =  {
    method: 'GET',
	headers: {
		'x-rapidapi-key': 'e783bdbba4msh2fbef7658a8d007p1676c9jsnc6a216b27aaf',
		'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
	}
}

export const fetchData = async (url,options) =>{

    const response = await fetch(url,options)
    const data = await response.json();

    return data

}