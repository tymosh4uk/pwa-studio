import React from 'react';
import { Redirect } from 'react-router-dom';
import {useUserContext} from "@magento/peregrine/lib/context/user";

const CommentsPage = () => {
    const [{ isSignedIn }] = useUserContext();

    if(!isSignedIn) {
        return (
            <Redirect to={'/'} />)
    }

    return (
        <div>
            <h1>Comments page</h1>
        </div>
    );
};

export default CommentsPage;
