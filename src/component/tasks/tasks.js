import React from 'react';

const useFetch = (pageID) => {
    const [response, setResponse] = React.useState(null);
    React.useEffect(() => {
        window.FB.api(
            `/${pageID}`,
            'GET',
            {
                access_token: 'accessToken',
                fields: ["roles{tasks}"]
            },
            function(response) {
                console.log(response);
                setResponse(response);
            }
        )
    },[pageID]);
    return response;
}

const Tasks = () => {
    const response = useFetch('111876070200048');
    if(response )
    return <div>
        <p>{response.id}</p>
    </div>
    else return <div>Loading</div>
}

export default Tasks;