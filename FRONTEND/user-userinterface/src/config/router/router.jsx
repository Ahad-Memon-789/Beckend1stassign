import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddProject from '../../AddProject'
import Project from '../../Project'

export default function AppRouter() {
    return (

        <Router>
            <Routes>
                <Route path='addproject' element={<AddProject />} />
                <Route path='addproject/:id' element={<AddProject />} />
                <Route path='/' element={<Project />} />
            </Routes>
        </Router>

    )
}