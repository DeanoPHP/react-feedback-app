import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'This item is feedback item 1',
            rating: 10,
        },
        {
            id: 2,
            text: 'This item is feedback item 2',
            rating: 7,
        },
        {
            id: 3,
            text: 'This item is feedback item 3',
            rating: 3,
        },
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    }); 

    // Delete feedback
    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    // Update feedback
    const updateFeedback = (id, updateItem) => {
        setFeedback(feedback.map((item) => item.id === id ? {
            ...item, ...updateItem } : item )
        )
        setFeedbackEdit({
            item: {},
            edit: false,
        })
    }

    // Adding new feedback to UI
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }

    // Set item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true,
        })
    }

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext