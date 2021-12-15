import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import ConfirmMessage from './ConfirmMessage.js';

const Confirm = props => {
    return new Promise(resolve => {
        let el = document.createElement('div');

        const handleResolve = result => {
            unmountComponentAtNode(el);
            el = null;
            resolve(result);
        };

        render(<ConfirmMessage {...props} onClose={handleResolve}/>, el);
    })
}

export default Confirm;