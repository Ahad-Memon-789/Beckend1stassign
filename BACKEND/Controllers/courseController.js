const courseModel = require("../models/courseModel");

// const courses = [
//     {
//         id: 1,
//         courseName: "Web Development",
//         ShortName: "Web Dev",
//         courseFee: 1000
//     },
//     {
//         id: 2,
//         courseName: "Graphic Designing",
//         ShortName: "Graphic Design",
//         courseFee: 800
//     },
//     {
//         id: 3,
//         courseName: "Mobile App Development",
//         ShortName: "App Dev",
//         courseFee: 1200
//     },
//     {
//         id: 4,
//         courseName: "Data Science",
//         ShortName: "Data Sci",
//         courseFee: 1500
//     },
//     {
//         id: 5,
//         courseName: "Network Security",
//         ShortName: "Sec. Net",
//         courseFee: 1100
//     },
//     {
//         id: 6,
//         courseName: "Python Programming",
//         ShortName: "Python",
//         courseFee: 900
//     },
//     {
//         id: 7,
//         courseName: "Java Development",
//         ShortName: "Java Dev",
//         courseFee: 1100
//     },
//     {
//         id: 8,
//         courseName: "Digital Marketing",
//         ShortName: "Digi. Mktg",
//         courseFee: 850
//     },
//     {
//         id: 9,
//         courseName: "Machine Learning",
//         ShortName: "ML",
//         courseFee: 1400
//     },
//     {
//         id: 10,
//         courseName: "Database Management",
//         ShortName: "DB Management",
//         courseFee: 950
//     },
//     {
//         id: 11,
//         courseName: "Front-end Development",
//         ShortName: "Front-end Dev",
//         courseFee: 1000
//     },
//     {
//         id: 12,
//         courseName: "Back-end Development",
//         ShortName: "Back-end Dev",
//         courseFee: 1050
//     },
//     {
//         id: 13,
//         courseName: "UI/UX Design",
//         ShortName: "UI/UX",
//         courseFee: 900
//     },
//     {
//         id: 14,
//         courseName: "Artificial Intelligence",
//         ShortName: "AI",
//         courseFee: 1300
//     },
//     {
//         id: 15,
//         courseName: "Software Testing",
//         ShortName: "Testing",
//         courseFee: 950
//     },
//     {
//         id: 16,
//         courseName: "Cybersecurity",
//         ShortName: "Cybersec",
//         courseFee: 1200
//     },
//     {
//         id: 17,
//         courseName: "Cloud Computing",
//         ShortName: "Cloud",
//         courseFee: 1100
//     },
//     {
//         id: 18,
//         courseName: "Game Development",
//         ShortName: "Game Dev",
//         courseFee: 1050
//     },
//     {
//         id: 19,
//         courseName: "Data Analytics",
//         ShortName: "Data Analytics",
//         courseFee: 1100
//     },
//     {
//         id: 20,
//         courseName: "DevOps",
//         ShortName: "DevOps",
//         courseFee: 1150
//     },
//     {
//         id: 21,
//         courseName: "Digital Illustration",
//         ShortName: "Illus. Design",
//         courseFee: 800
//     },
//     {
//         id: 22,
//         courseName: "Blockchain Development",
//         ShortName: "Blockchain",
//         courseFee: 1250
//     },
//     // Add more courses here...
// ];

const courseController = {
    get: async (req, res) => {
        try {
            let { pageNo, pageSize } = req.query
            console.log(pageNo, pageSize);
            let skipCount = (pageNo - 1) * pageSize
            const result = await courseModel.find().limit(pageSize).skip(skipCount)
            res.send({
                isSuccessfull: true,
                message: "Data Founded",
                data: result
            })
        } catch (error) {
            res.send({
                isSuccessfull: true,
                message: "No Data Found :(",
                data: error
            })
        }
    },
    getbyid: async (req, res) => {

        try {
            let id = req.params.id

            let result = await courseModel.findById(id)
            res.send({
                isSuccessfull: true,
                data: result,
                message: "",
            })
            // let obj = courses.find((x) => x.id == id)


        } catch (error) {
            res.send({
                isSuccessfull: false,
                data: null,
                message: "No Data Found",
            })
        }
    },
    add: async (req, res) => {
        try {
            let { courseName, ShortName, courseFee } = req.body
            let obj = { courseName, ShortName, courseFee }

            let errArr = []

            if (!obj.courseName) {
                errArr.push('Required Full courseName')
            }
            if (!obj.ShortName) {
                errArr.push('Required Short courseName')
            }
            if (!obj.courseFee) {
                errArr.push('Required courseFee')
            }

            if (errArr.length > 0) {
                res.send({
                    isSuccessfull: false,
                    message: "Validation Error! :(",
                    data: errArr,
                })
            } else {
                const course = new courseModel(obj)
                const result = await course.save()
                res.send({
                    isSuccessfull: true,
                    message: 'Data Added Successfully',
                    data: result
                })
            }
        } catch (error) {
            res.send({
                isSuccessfull: false,
                message: 'Data not Added',
                data: error
            })
        }

    },
    edit: async (req, res) => {
        try {
            const id = req.params.id;
            const { courseName, ShortName, courseFee } = req.body;
            const obj = { courseName, ShortName, courseFee }
            let errArray = []
            // const coursesIndex = courses.findIndex((x) => x.id == id);
            if (!obj.courseName) {
                errArray.push("course name is required")
            }
            if (!obj.ShortName) {
                errArray.push("course Shortname is required")
            }
            if (!obj.courseFee) {
                errArray.push("course CourseFee is required")
            }
            if (errArray.length > 0) {
                res.send({
                    isSuccessfull: false,
                    data: errArray,
                    message: "validation error finded!:(",
                })
            }
            const result = await courseModel.findByIdAndUpdate(id, obj)

            // courses[coursesIndex] = { id: id, data: obj };
            res.send({
                isSuccessfull: true,
                data: obj,
                message: "course with ID ${ id } has been updated",
            })
        } catch (error) {
            res.send({
                isSuccessfull: false,
                data: null,
                message: "course with ID ${ id } has not been updated",
            })
        }


    },
    del: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await courseModel.findByIdAndDelete(id)
            res.send({
                isSuccessfull: true,
                data: result,
                message: "Data Deleted"
            })
            // // const obj = courses.findIndex(x => x.id == id)
            // courses.splice(obj, 1)
        } catch (error) {
            res.send({
                isSuccessfull: false,
                data: null,
                message: "Data not Deleted"
            })
        }
    }
}


module.exports = courseController