import {Outlet} from "react-router-dom";
import React from 'react';

const App: React.FC = () => {

    return (
        <div className="bg-blue-100">
            <h1>Wypożyczalnia Samochodów</h1>

            <main>
                <Outlet/>
            </main>

            <footer>
                <p>Informacje kontaktowe</p>
            </footer>
        </div>
    );
}

export default App;