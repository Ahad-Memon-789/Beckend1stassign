import { Box, Button, Paper, TextField, Typography } from "@mui/material"
import axios from 'axios'
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"


export default function AddCourses() {
    const [addCourses, setAddCourses] = useState({})
    const navigate = useNavigate()
    const PostCourse = () => {
        // addCourses.postId = 101
        axios.post('http://localhost:5000/course', addCourses)
            .then((res) => {
                console.log(res.data)
                setAddCourses({ ...res.data })
                navigate('/')
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
    const getCourseById = () => {
        axios.get(`http://localhost:5000/course/${params.id}`)
            .then((res) => {
                setAddCourses({ ...res.data.data })
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
    useEffect(() => {
        getCourseById()
    }, [])
    const params = useParams()
    const updateCourse = () => {
        axios.put(`http://localhost:5000/course/${params.id}`, addCourses)
            .then((res) => {
                setAddCourses({ ...res.data })
                navigate('/')
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
    return (
        <>
            <Box className=' d-flex justify-content-center align-items-center' sx={{ height: '100vh', backgroundColor: 'lightgray' }}>
                <Box className="p-5 bg-light border rounded shadow-lg border-primary">
                    <Box>
                        {params.id ? (<Typography variant="body1" className="text-center text-primary" >EDIT COURSES</Typography>) : (<Typography variant="body1" className="text-center text-primary" >ADD COURSES</Typography>)}
                    </Box>
                    <Box className='mt-3'>
                        <TextField variant="filled" color="primary" focused placeholder="Name" value={addCourses.courseName} onChange={(e) => setAddCourses({ ...addCourses, courseName: e.target.value })} />
                    </Box>
                    <Box className='mt-3'>
                        <TextField variant="filled" color="primary" focused placeholder="Short Name" value={addCourses.ShortName} onChange={(e) => setAddCourses({ ...addCourses, ShortName: e.target.value })} />
                    </Box>
                    <Box className='mt-3'>
                    </Box>
                    <TextField variant="filled" color="primary" focused value={addCourses.courseFee} type="number" placeholder="Course Fee" onChange={(e) => setAddCourses({ ...addCourses, courseFee: e.target.value })} />
                    <Box className='mt-3'>
                        {params.id ? (<Button onClick={updateCourse} className="w-100" variant="contained">Edit</Button>) : (<Button onClick={PostCourse} className="w-100" variant="contained">ADD COURSE</Button>)}
                    </Box>
                </Box>
            </Box>
        </>
    )
}