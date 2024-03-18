import {db} from "../db.js"


export const getEvents= async(req,res)=>{
    try {
        // const cat = req.query.cat;
        const query =  "SELECT * FROM events";
        const [data] = await db.query(query);
        //  const [img] ='select img from events';
        //  const eventData = {
        //   details:data,
        //   images: img,
        // };
    
        // console.log('Data:', data);
        return res.status(200).json(data);
      } catch (error) {
        console.error('Query error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    
}
export const getEvent = async(req, res)=>{
    try {
        const q = "select * from events where id =?";
       const [data]= await db.query(q,[req.params.id]);
      //  console.log(data);
       res.status(200).json(data);
     if(data){
        res.status(200).json(data);
     }
        
    } catch (error) {
        
    }
}