import multer from 'multer';
import path from 'path';

const Storage = multer.diskStorage({
  destination: (_req, _file, cb) =>{
    cb(null, path.resolve('/public'))
  },


  filename:  (_req, file, cb) => {
  const time = new Date().getTime();

  cb(null, '${time}_${file.originalname}')
  }
});