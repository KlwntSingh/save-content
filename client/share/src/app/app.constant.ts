export const CONSTANT = {
    base : "http://34.211.241.105:4000"
}

export const APP_CONSTANTS = {
    TOKEN_KEY_NAME : 'token',
    AUTHORIZATION_TOKEN_NAME : 'authorization'
}

export const BROWSER = {
    APP_HOME : "/room"
}

export const API = {
    VALIDATE : CONSTANT.base + "/share/room/validate",
    GET_ROOM_CONTENT : CONSTANT.base + "/share/room/content/files",
    UPLOAD_ROOM_CONTENT : CONSTANT.base + "/share/room/content/file"
}