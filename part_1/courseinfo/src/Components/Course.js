import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({ courses }) => {
    return (
        <div>
            {courses.map(course => {
                return (
                    <div>
                        <Header header={course.name} />
                        <Content parts={course.parts} />
                        <Total parts={course.parts} />
                    </div>
                )
            })}
        </div>
    )
}

export default Course