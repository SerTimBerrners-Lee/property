const passwordHash = require('password-hash')
const DP = require('./deletePost');

module.exports = (app, db, fs) => {

    // ДОБАВИТЬ СЕКЦИЮ
    app.post('/api/post/sections/', (req, res) => {
        let body = JSON.parse(JSON.stringify(req.body))
        let data;
        Object.keys(body).map(e => {
            data = JSON.parse(e)
            db.query('INSERT INTO sections (name) VALUES (?)', [data.title], (err, result) => {
                if(err) throw err
                res.send({id: result.insertId, title: data.title})
            })
        })
    })

    //ПОЛУЧАЕМ ВСЕ СЕКЦИИ 
    app.get('/api/get/sections/', (req, res) => {
        db.query('SELECT * FROM sections', (err, result) => {
            if(err) throw err
            res.send(result)
        })
        
    })

    // ПРОВЕРКА АДМИНА 
    app.post('/api/checked/admin/', (req, res) => {
        let body = JSON.parse(JSON.stringify(req.body))
        let data;
        Object.keys(body).map(e => {
            data = JSON.parse(e)
            let name = data.name;
            let password = data.password;
            db.query('SELECT * FROM user WHERE name=?', [name], (err, result) => {
                if(err) throw err
                if(passwordHash.verify(password, result[0].password) && result[0].active == 1) {
                    res.send({type: 'success', message: result[0].name})
                } else {
                    res.send({type: 'error', message: 'Пароль не верный'})
                }
            })
        })
    })
    // ДОБАВЛЕНИЕ ПОЛЬЗОАВАТЕЛЯ 
    app.post('/api/add/admin/', (req, res) => {
        let name = req.body.name;
        let password = passwordHash.generate(req.body.password)
        db.query('INSERT INTO user (name, password) VALUES (?, ?)', [name, password], (err, result)=>{
            if(err) throw err
            res.send('Пользователь добавлен!')
        } )
    })

    // Удалить секцию по ID
    app.get('/api/post/sections/del/:id', (req, res) => {
        let id = req.params.id
        db.query('DELETE FROM sections WHERE id=?', [id], (err, result) => {
            if(err) throw err 

            // Удаляем все подсекции у этой секции 
            let promis = new Promise((resolve, reject) => {
                db.query('SELECT id FROM posts_section WHERE ratio=?', [id], (_, r) => {
                    if(_) throw _
                    // Удаляем посты и изображения
                    r.forEach((e, inds, ads) => {
                        db.query('SELECT id FROM posts WHERE ratio=?', [e.id], (error, resultImage) => {
                            if(error) throw error
                            resultImage.forEach((idImage, indexer, arrsaar) => {
                               
                                DP.deletePost([Number(idImage.id)], db, fs)
                            })
    
                        })
                        if(inds === ads.length - 1) resolve()
                    })
                })
            })

            promis.then(() => {
                db.query('DELETE FROM posts_section WHERE ratio=?', [id], (e, resulters) => {
                    if(e) throw e
                })
            })
            res.send(result)
        })
    })

    // Получить все подсекции
    app.get('/api/get/posts_section/', (req, res) => {
        db.query('SELECT * FROM posts_section', (err, result) => {
            if(err) throw err
            res.send(result)
        })
    })

    // ДОБАВЛЯЕМ ПОДКАТАЛОГ 
    app.post('/api/set/posts_section', (req, res) => {
        let body = JSON.parse(JSON.stringify(req.body));
        let data;

        Object.keys(body).forEach((el, index) => {
            data = JSON.parse(el)

            let name = data.name;
            let ratio = data.ratio;
            db.query('INSERT INTO posts_section (name, ratio) VALUES (?, ?)', [name, ratio], (er, result) => {
                if(er) throw er 
                res.send({id: result.insertId, name: name, ratio: ratio})
            })
        })
    })
    // ОБНОВЛЕНИЕ 
    app.post('/api/upload/posts_section', (req, res) => {
        let body = JSON.parse(JSON.stringify(req.body));
        let data;

        Object.keys(body).forEach((el, index) => {
            data = JSON.parse(el)
            let name = data.name;
            let id = data.id;
            db.query('UPDATE posts_section SET name=? WHERE id=?', [name, id], (err, result) => {
                if(err) throw err 

                res.send({name, id})
            })
        })
    })
    // DELETE ALL POSTS_SECTION
    app.post('/api/delete/posts_section', (req, res) => {
        let body = JSON.parse(JSON.stringify(req.body));
        let data;

        Object.keys(body).map((el) => {
            data = JSON.parse(el)
            let id = Number(data.id);

            db.query('SELECT id FROM posts WHERE ratio=?', [id], (error, resultImage) => {
                if(error) throw error
                resultImage.forEach((idImage) => {
                    DP.deletePost([Number(idImage.id)], db, fs)
                })

                db.query('DELETE FROM posts_section WHERE id=?', [id], (err, result) => {
                    if(err) throw err 
    
                    res.send({id: id})
                })

            })
        })
    })
}
