import React from 'react';
import { Route } from "react-router-dom";
import { withRouter } from 'react-router-dom'; 
import Layout from './Layout/Layout';
import Notes from './components/Notes';
import Labels from './components/Labels';
export const HomeRoute = "/";
export const LabelsRoute = "/labels";
class Routing extends React.Component {
    render() {
        return (
            <Layout>
                <Route path={HomeRoute} exact component={Notes} />
                <Route path={LabelsRoute} component={Labels} />
            </Layout >
        );
    }
}
export default withRouter(Routing);