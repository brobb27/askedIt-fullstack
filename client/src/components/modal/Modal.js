import React from "react";
import ReactDom from "react-dom";
import './Modal.css'
import { AiOutlineClose } from 'react-icons/ai'

export default function Modal({children, open, toggle}) {
    // renders nothing if open is false
    if (!open) return null

    return ReactDom.createPortal(
        <>
            <div className='overlay' />
            <div className='modalContainer'>
                <button onClick={() => toggle()} className='cancelButton'><AiOutlineClose /></button>
                {children}
            </div>
        </>,
        document.getElementById('portal')
    )
}