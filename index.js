const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
const port = 4040

const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World! picture uploader is ready (or not)!!!')
})

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    console.log('>>>req.file>>>', req.file)
    let pictureToUpload = req.file.path
    const result = await cloudinary.uploader.upload(pictureToUpload, {
      folder: 'wildcarbon/',
    })
    return res.status(200).json(result)
  } catch (error) {
    console.log('>>>ERROR>>>', error.message)
    return res.status(400).json({ error: error.message })
  }
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
