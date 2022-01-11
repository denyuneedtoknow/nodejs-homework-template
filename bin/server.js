import { mkdir } from ' fs/promises'
import app from '../app'
import db from '../lib/db'
const PORT = process.env.PORT || 3030

db.then(() => {
  app.listen(PORT, () => {
    await mkdir(process.env.UPLOAD_DIR, { recursive: true })
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}).catch(err => {
  console.log(`Server is not running. Error: ${err.message}`)
})
