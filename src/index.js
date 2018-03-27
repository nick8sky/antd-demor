import React from 'react';
import ReactDOM from 'react-dom';
import Bundle from './component/Bundle';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const App = (props) => (
    <Bundle load={() => import('./App')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


