import React from 'react';
import { useUpdateTitle, useVerify } from '../../utils';
import { Loading } from '../content/loading/loading';

const useFetch = (pageID, access_token) => {
    const [response, setResponse] = React.useState(null);
    React.useEffect(() => {
        window.FB.api(
            `/${pageID}`,
            'GET',
            {
                access_token: access_token,
                fields: ["roles{tasks}"]
            },
            function(response) {
                console.log(response);
                setResponse(response);
            }
        )
    },[pageID,access_token]);
    return response;
}

const Tasks = ({title, loginStatus, handleVerify}) => {
    useUpdateTitle(title);
    useVerify(() => handleVerify(loginStatus.authResponse.accessToken));
    const response = useFetch('111876070200048', loginStatus.authResponse.accessToken);
    if(response )
    return <div>
        <p>{response.id}</p>
    </div>
    else return <Loading />
}

export default Tasks;