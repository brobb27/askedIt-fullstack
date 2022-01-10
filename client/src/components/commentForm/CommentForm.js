import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserProvider'

function CommentForm() {
    // context info needed
    const { user: {username } } = useContext(UserContext)

    // init comment
    const initComment = {
        header: username,
        answer: ''
    }
    
    // state handler for comment
    const [comment, setComment] = useState(initComment)

    //handle change function
    function handleChange(e) {
        const {name, value} = e.target
        setComment(prevComment => ({
            ...prevComment,
            [name]: value
        }))
    }

    return (
        <div>
            <form>
                <textarea
                    placeholder='Enter your answer here'
                    type='text'
                    name='answer'
                    value={comment.answer}
                    onChange={handleChange}
                    className='commentInput'
                    required
                />
                <button className='answerButton'>answer</button>
            </form>
        </div>
    )
}

export default CommentForm
