import React from 'react'

const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16,
        textAlign: 'center'
    }

    return (
        <div style={footerStyle}>
            <br />
            <em>Note app, Department of Computar Sicence, University of Helsinki 2021</em>
        </div>
    )
}

export default Footer