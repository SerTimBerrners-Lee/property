
function deletePost(arr, db, fs) {

    arr.forEach((el, index, arrays) => {
        db.query('SELECT image FROM posts WHERE id=?', [el], (err, result) => {
            if(err) throw err
            if(result.length > 0) {
                let arrImage = JSON.parse(result[0].image)
                arrImage.forEach((image, ind, ars) => {
                    fs.stat('./static'+image.href, (erCode) => {
                        if(!erCode) {
                            fs.unlinkSync('./static'+image.href)
                        }
                    })
                    
                })
            };
            db.query('DELETE FROM posts WHERE id=?', [el], (err, result) => {
                if(err) throw err
            })
        })
    })
}

module.exports = {
    deletePost
}