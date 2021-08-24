export const api = 'http://localhost:2000/api'
export const generatePictureUrl = (fileName) => {
    return `http://localhost:2000/public/${fileName}`;
}