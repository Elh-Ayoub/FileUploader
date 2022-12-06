import multer from 'multer';
import fs from "fs";
 
export const upload = (dir = "uploads") => {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }

    const storage = multer.diskStorage({
        destination : (req , file , cb) => {
            cb(null , dir)
        },
        filename : (req , file , cb) => {
            let filename = file.originalname;
            let i = 1;
            while(fs.existsSync(dir + "/" + filename)){
                filename = `${file.originalname.split('.')[0]}(${i}).${file.originalname.split('.')[1]}`;
                i++;
            }
            cb(null, filename)
        }
    });
    
    return multer({
       storage : storage,
    });
}
