import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import  jwt  from 'jsonwebtoken';
export const register = async (req, res) => {
  try {
   console.log("requested data " , req.body);
    const q = 'SELECT * FROM users WHERE email = ? OR username = ?';
    const data = await db.query(q, [req.body.email, req.body.username]);
  console.log(data);
    if (data[0].length) {
      return res.status(409).json({ error: 'User already exists' });
    }


    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const insertQuery = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
    const insertValues = [req.body.email, req.body.username, hash];
    
    const result=await db.query(insertQuery, insertValues);
// console.log(result);
    return res.status(200).json({ message: 'User has been created' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const login = async(req, res) => {
  // Implement login logic
  const q = 'SELECT * FROM users WHERE email = ?';

  const data= await  db.query(q, [req.body.email]);
   console.log(data[0][0].password);

  if (data[0].length == 0) {
        return res.status(404).json("User not found");
      }
  //   console.log(data);
      const iscorrect = bcrypt.compareSync(req.body.password, data[0][0].password);
    console.log(iscorrect);
        
      if (!iscorrect) {
        return res.status(400).json("Wrong email or password");
      }
    
      const token = jwt.sign({ id: data[0][0].id }, "dinesh234");
      const { password, ...other } = data[0][0];

      res.cookie("access_token", token, {
         httpOnly:true,
      }).status(200).json(other); 
};


export const logout = (req, res) => {
  res.clearCookie("access_token" ,{
   sameSite: "none",
   secure: true,

  }).status(200).json("usern logout successfully !!")


};
export const contact = async(req,res)=>{
  const q ="insert into contact (name,email,message) values(?,?,?)";

try {
   await db.query(q,[req.body.name ,req.body.email,req.body.message]);
      res.status(200).json("contact successfully");
} catch (error) {
   console.log(error );

}
}