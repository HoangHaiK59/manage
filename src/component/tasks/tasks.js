import React from 'react';
import { useUpdateTitle, useVerify } from '../../utils';
import { Loading } from '../content/loading/loading';
import { connect } from 'react-redux';

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

const Tasks = ({title, handleVerify, ...props}) => {
    useUpdateTitle(title);
    useVerify(() => handleVerify(props.loginStatus.authResponse.accessToken));
    const response = useFetch('111876070200048', props.loginStatus.authResponse.accessToken);
    if(response )
    return <div>
        <p>{response.id}</p>
    </div>
    else return <Loading />
}

const mapState = state => ({
    loginStatus: state.facebook.loginStatus
});

const mapDispatch = dispatch => ({

})

export default connect(mapState, mapDispatch) (Tasks);