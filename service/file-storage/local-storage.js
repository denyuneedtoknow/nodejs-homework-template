import path from "path"
import fs from "fs/promises"
import Users from "../../repository/users"


class LocalStorage {
    constructor(file, user) {
        this.userId = user.id
        this.filename = file.filename
        this.filePath = file.path
        this.folderAvatars = process.env.FOLDER_FOR_AVATARS
    }
    async save() {
        //folder for  avatar
        const destination = path.join(this.folderAvatars, this.userId)
        //create folder if it doesn't exist
        await fs.mkdir(destination, { recursive: true })
        //removing file from UPLOAD_DIR into destination
        await fs.rename(this.filePath, path.join(destination, this.filename)) //avatars/userId/filename
        //makes path for database, bc path to file doesn't match with path for API
        const avatarUrl = path.normalize(path.join(this.userId, this.filename)) // / userId / filename
        // saving new path to file
        await Users.updateAvatar(this.userId, avatarUrl)

        return avatarUrl

    }

}

export default LocalStorage