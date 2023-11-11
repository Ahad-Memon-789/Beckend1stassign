import { Box, Button, CircularProgress, Paper, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import EditSharpIcon from '@mui/icons-material/EditSharp';

export default function Courses() {
    const [courses, setCourses] = useState([])
    const [loader, setLoader] = useState(true)
    const getCourses = () => {

        axios.get('http://localhost:5000/course')
            .then((responce) => {

                console.log(responce.data.data)
                setCourses([...responce.data.data])
                setLoader(false)
            })
            .catch((err) => {
                console.log(err.message)
                setLoader(false)
            })
    }



    useEffect(() => {
        getCourses()
    }, [])
    const navigate = useNavigate()
    const addCommentsNavigate = () => {
        navigate('/addproject')
    }
    const putComment = (id) => {
        navigate(`/addproject/${id}`)
    }
    const params = useParams()
    const deleteComment = (id) => {
        params.id = id
        axios.delete(`http://localhost:5000/course/${params.id}`)
            .then((res) => {
                console.log(res.data.data)

                getCourses()
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
    return (
        <>
            {loader ? (
                <div className="flex justify-center items-center bg-black" style={{ height: '100vh' }}>
                    <CircularProgress />
                </div>
            ) : (
                <>
                    <Box className="">

                        <div className="d-flex justify-content-between bg-dark sticky-top mx-4 mt-3 " style={{ width: "95vw", padding: "20px", border: '2px solid rgb(240 , 0 , 0)' }}>
                            <Typography variant="h3" className="text-danger">Courses</Typography>
                            <Button onClick={addCommentsNavigate} variant="contained" color="error">ADD COURSES</Button>
                        </div>

                    </Box>
                    <table className="table table-dark table-striped table-hover overflow-auto text-center mt-3 border-2 border-danger mx-4 " style={{ cursor: "pointer", width: "95vw", border: '2px solid rgb(240 , 0 , 0)' }}>
                        <thead>
                            <tr className="table-dark fs-4" >
                                <th style={{ color: 'red' }}>COURSE NAME</th>
                                <th style={{ color: 'red' }}>SHORT NAME</th>
                                <th style={{ color: 'red' }}>COURSE FEE</th>
                                <th style={{ color: 'red' }}>COURSE DELETE OR EDIT</th>
                            </tr>
                        </thead>
                        <tbody>

                            {courses.map((x, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{x.courseName}</td>
                                        <td>{x.ShortName}</td>
                                        <td>{x.courseFee}</td>
                                        <td>
                                            <Button className='me-2 mt-2 text-danger' variant='contained' onClick={() => deleteComment(x._id)} color='inherit' endIcon={<DeleteSharpIcon />}>Delete</Button>
                                            <Button variant='contained' className="mt-2 text-primary" onClick={() => { putComment(x._id) }} color='inherit' endIcon={<EditSharpIcon />}>Edit</Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </>
            )
            }

        </>
    )
}