import { db } from '../db.js';

export const bookticket  = async(req,res)=>{
     console.log(req.body);
    try {
        const q = "insert into bookseat(bookid , seatstand , seatno, eventid,userid)  values(?,?,?,?,?);"
       const result=  await db.query(q,[req.body.bookid,req.body.stand, req.body.seats,req.body.eventid,req.body.userid]);
       res.status(200).json({success: "successfully"});
    console.log(result);
    } catch (error) {
        console.log(error)
    }
} 
export const getbooking =async(req, res)=>{
    try {

        const q = "select e.*,b.* from events e join bookseat b on b.eventid = e.id where b.bookid =?";
        const result= await db.query(q,[req.params.id]);
        res.status(200).json(result[0]);
    } catch (error) {
        
    }
}
export const history =async(req, res)=>{
    try {

        const q = "select e.*,b.* from events e join bookseat b on b.eventid = e.id where b.userid =?";
        const result= await db.query(q,[req.params.id]);
        res.status(200).json(result[0]);
    } catch (error) {
         res.status(500).json(error);
    }
}
