import {Outlet} from "react-router-dom";
import React from 'react';

const App: React.FC = () => {

    return (
        <div>
            <Outlet />
        </div>
    );
}

export default App;