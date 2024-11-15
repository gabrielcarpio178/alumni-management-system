import express from 'express'
import {connectToDatabase} from '../lib/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import { unlink } from 'node:fs';

const router = express.Router();
const JWT_KEY = "alumniItech"

router.post('/register', async (req, res)=>{
    const lastname = req.body.lastname;
    const firstname = req.body.firstname;
    const middlename = req.body.middlename;
    const gender = req.body.gender;
    const birthday = req.body.birthday;
    const course = req.body.course;
    const contactnumber = req.body.contactnumber;
    const batch = req.body.batch;
    const email = req.body.email;
    const student_id = req.body.student_id;
    const password = req.body.password;
    if(student_id.toString().length===11){
        try {
            const db = await connectToDatabase()
            const [stundets_row] = await db.query(`SELECT * FROM students WHERE email = '${email}' OR student_id = '${student_id}' OR contact_num = '0${contactnumber}'`)
            if(stundets_row.length > 0) {
                return res.status(201).json({message : "user already existed"})
            }
    
            const [admin_row] = await db.query(`SELECT * FROM user WHERE email = '${email}'`)
            if(admin_row.length > 0) {
                return res.status(201).json({message : "user already existed"})
            }
    
            const hashPassword = await bcrypt.hash(password, 10)
            await db.query(`INSERT INTO students(firstname, middlename, lastname, gender, birthday, course, batch, contact_num, student_id, email, password) VALUES ('${firstname}','${middlename}','${lastname}','${gender}','${birthday}','${course}', '${batch}', '0${contactnumber}','${student_id}', '${email}','${hashPassword}')`);
            return res.status(201).json({message: "user created successfully"})
    
        } catch(err) {
            return res.status(500).json(err.message)
        }
    }
    
    return res.status(201).json({message: "Student id must be 11 digits"})
});
router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const db = await connectToDatabase();
        const [student_rows] = await db.query(`SELECT s.*, c.course AS course_name FROM students AS s INNER JOIN course AS c ON s.course = c.id WHERE s.email = '${email}'`);
        if (student_rows.length > 0) {
            var isMatch = await bcrypt.compare(password, student_rows[0].password);
            if(isMatch){
                if(student_rows[0].status===1){
                    const token = jwt.sign({ id: student_rows[0].id }, JWT_KEY, { expiresIn: '24h' });
                    return res.status(200).json({student: student_rows[0] ,token, role: "student" });
                }
                return res.status(200).json({message: 'deactived account'})
            }
        }
        const [rows_admin] = await db.query(`SELECT * FROM user WHERE email = '${email}'`);
        if (rows_admin.length > 0) {
            var isMatch = await bcrypt.compare(password, rows_admin[0].password);
            if(isMatch){
                const token = jwt.sign({ id: rows_admin[0].id }, JWT_KEY, { expiresIn: '24h' });
                return res.status(200).json({token, role: "admin" });
            }
        }

        return res.status(401).json({message : "wrong password"})
    } catch (error) {
        return res.status(500).json(error.message)
    }
});


router.get('/course/:search', async (req, res)=>{
    const search = req.params.search;
    let search_sql = `SELECT * FROM course ORDER BY id DESC`;
    if(search !== 'all'){
        search_sql = `SELECT * FROM course WHERE course LIKE '%${search}%' ORDER BY id DESC`;
    }
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query(search_sql);
        if(rows.length !== 0){
            return res.status(200).json({rows});
        }
        return res.status(200).json({message: "not found"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "server error"})
    }
})


const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    // console.log(req.headers['authorization'])
    try {
        if(!token) {
            return res.status(403).json({message: "No Token Provided"})
        }
        const decoded = jwt.verify(token, JWT_KEY)
        req.userId = decoded.id;
        next();
    }  catch(err) {
        return res.status(500).json({message: "server error"})
    }
}

router.put('/profile/update', verifyToken, async (req, res)=>{
    console.log(req.body);
    console.log(req.body.file);
})

router.get('/student/:id', verifyToken, async (req, res)=>{
    const id = req.params.id;
    try {
        const db = await connectToDatabase();
        const [student] = await db.query(`SELECT * FROM students WHERE id = ${id}`)
        return res.status(200).json({student});
    } catch (error) {
        return res.status(500).json(error.message)
    }
})



router.post('/admin/addCourse', verifyToken, async (req, res)=>{
    const course = req.body.course;
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query(`SELECT * FROM course WHERE course = '${course}'`);
        if(rows.length !== 0){
            return res.status(200).json({message: "course is use"});
        }
        await db.query(`INSERT INTO course (course) VALUES ('${course}')`);
        return res.status(200).json({message: "add success"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "server error"})
    }
});


router.put('/admin/editCourse', verifyToken, async (req, res)=>{
    const id = req.body.id;
    const course = req.body.course;
    try{
        const db = await connectToDatabase();
        const [rows] = await db.query(`SELECT * FROM course WHERE course = '${course}'`);
        if(rows.length !== 0){
            return res.status(200).json({message: "course is use"});
        }
        await db.query(`UPDATE course SET course='${course}' WHERE id = ${id}`);
        return res.status(200).json({message: 'update success'});
    }catch(error){
        console.log(error);
        return res.status(500).json({message: 'server error'})
    }
})

router.delete('/admin/deleteCourse', verifyToken, async (req, res)=>{
    const id = req.body.id;
    try {
        const db = await connectToDatabase();
        await db.query(`DELETE FROM course WHERE id = ${id}`);
        return res.status(200).json({message: 'delete success'});
    } catch (error) {
        return res.status(500).json({message: 'server error'});
    }
})

router.put('/admin/user_statsUpdate', verifyToken, async (req, res)=>{
    const id = req.body.id;
    const status = req.body.status;
    
    try {
        const db = await connectToDatabase();
        await db.query(`UPDATE students SET status='${status}' WHERE id = '${id}'`);
        return res.status(200).json({message: 'update success'});
    } catch (error) {
        return res.status(500).json({message: 'server error'})
    }
});

router.get('/admin/alumnilist/:search', verifyToken, async (req, res)=>{
    const search = req.params.search;
    let sql = "SELECT s.*, c.course FROM students AS s INNER JOIN course AS c ON s.course = c.id ORDER BY s.id DESC";
    
    if(search!=='all'){
        sql = `SELECT s.*, c.course FROM students AS s INNER JOIN course AS c ON s.course = c.id WHERE s.firstname LIKE '%${search}%' OR s.middlename LIKE '%${search}%' OR s.lastname LIKE '%${search}%' OR s.student_id LIKE '%${search}%' ORDER BY s.id DESC`;
    }
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query(sql);
        if(rows.length!==0){
            return res.status(200).json({rows});
        }
        return res.status(200).json({message: 'not found'});
    } catch (error) {
        return res.status(500).json({message: 'server error'})
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error("Incorrect file");
        error.code = "INCORRECT_FILETYPE";
        return cb(error, false);
    }

    cb(null, true);
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const file_extension = file.mimetype.split("/")[1]
      cb(null, `${Date.now()}.${file_extension}`)
    },  
    fileFilter,
    limits: {
        fileSize: 1000000,
    },
})

const upload = multer({storage: storage});

router.post('/admin/gallery', verifyToken ,upload.single("file"), async (req, res)=>{
    const caption = req.body.caption;
    const file = req.file.filename;
    try {
        const db = await connectToDatabase();
        await db.query(`INSERT INTO gallery(caption, image) VALUES ('${caption}','${file}')`);
        return res.status(200).json({message: 'post success'});
    } catch (error) {
        return res.status(500).json({message: 'server error'})
    }
});


router.get('/admin/gallery', async (req, res)=>{
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query(`SELECT id, caption, image, date_upload FROM gallery ORDER BY id DESC`);
        return res.status(200).json({rows});
    } catch (error) {
        return res.status(500).json({message: 'server error'})
    }
});

router.delete('/admin/deleteGallery', verifyToken, async (req, res)=>{
    const id = req.body.id;
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query(`SELECT id, caption, image, date_upload FROM gallery WHERE id = '${id}'`);
        const image = rows[0].image;
        unlink(`uploads/${image}`, (err) => {
            if (err) throw err;
            console.log(`uploads/${image} was deleted`);
        });
        await db.query(`DELETE FROM gallery WHERE id = ${id}`)
        return res.status(200).json({message: 'delete success'});
    } catch (error) {
        return res.status(500).json({message: 'server error'})
    }
});

router.post('/admin/event', verifyToken, upload.single("file"), async (req, res)=>{
    const event = req.body.event;
    const file = req.file.filename;
    const schedule = req.body.schedule;
    const address = req.body.address;
    const description = req.body.description;
    try {
        const db = await connectToDatabase();
        await db.query(`INSERT INTO event(event, schedule, address, description, banner) VALUES ('${event}', '${schedule}', '${address}','${description}','${file}')`);
        return res.status(200).json({message: 'post success'});
    } catch (error) {
        return res.status(500).json({message: 'server error'})
    }
})

router.get('/admin/event/:filter', verifyToken, async (req, res)=>{
    const filter = req.params.filter;
    let sql = "SELECT * FROM event ORDER BY schedule DESC"; 
    if(filter!=='all'){
        sql = `SELECT * FROM event WHERE CAST(schedule AS date) LIKE '${filter}' ORDER BY schedule DESC`; 
    }
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query(sql);
        return res.status(200).json({rows});
    } catch (error) {
        return res.status(500).json({message: 'server error'})
    }
})

router.delete('/admin/deleteEvent', verifyToken, async (req, res)=>{
    const id = req.body.id;
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query(`SELECT banner FROM event WHERE id = '${id}'`);
        const image = rows[0].banner;
        unlink(`uploads/${image}`, (err) => {
            if (err) throw err;
            console.log(`uploads/${image} was deleted`);
        });
        await db.query(`DELETE FROM event WHERE id = ${id}`)
        return res.status(200).json({message: 'delete success'});
    } catch (error) {
        return res.status(500).json({message: 'server error'})
    }
});

router.get('/admin/account', verifyToken, async (req, res)=>{
    try {
        const db = await connectToDatabase();
        const [row] = await db.query('SELECT * FROM user');
        return res.status(200).json({row});
    } catch (error) {
        return res.status(500).json({message: 'server error'})
    }
})

router.put('/admin/account', verifyToken, async (req, res)=>{
    const id = req.body.id;
    const email = req.body.email;
    const password = req.body.password;
    try {
        const db = await connectToDatabase();
        const hashPassword = await bcrypt.hash(password, 10)
        await db.query(`UPDATE user SET email='${email}',password='${hashPassword}' WHERE id = '${id}'`);
        return res.status(200).json({message: 'update success'});
    } catch (error) {
        return res.status(500).json({message: 'server error'});
    }
})

router.get('/events', async (req, res)=>{
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM event');
        return res.status(200).json({rows});
    } catch (error) {
        return res.status(500).json({message: 'server error'});
    }
})

export default router;