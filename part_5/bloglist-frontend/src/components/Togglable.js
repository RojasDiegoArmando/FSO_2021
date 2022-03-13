import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
    const [displayForm, setDisplayForm] = useState(false)
    const hideWhenVisible = { display: displayForm ? 'none' : '' }
    const showWhenVisible = { display: displayForm ? '' : 'none' }

    const toggleVisibility = () => setDisplayForm(!displayForm)

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })
    return (
        <>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>Cancel</button>
            </div>
        </>

    )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Togglable