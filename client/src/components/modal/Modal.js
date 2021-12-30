import React from "react";
import ReactDom from "react-dom";
import './Modal.css'

export default function Modal({children, open, toggle}) {
    // renders nothing if open is false
    if (!open) return null

    return ReactDom.createPortal(
        <>
            <div className='overlay' />
            <div className='modalContainer'>
                {children}
                <button onClick={() => toggle()} className='cancelButton'>Cancel</button>
            </div>
        </>,
        document.getElementById('portal')
    )
}