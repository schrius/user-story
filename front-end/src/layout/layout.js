import {Topbar} from '../components'
import React from 'react';

const Main = props => {
    const { children } = props;
    return (
        <div>
            <Topbar />
            <main>
                {children}
            </main>
        </div>
    )
}

export default Main;