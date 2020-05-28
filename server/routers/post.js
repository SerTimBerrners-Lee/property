const fileUpload = require('express-fileupload');
const deletePost = require('./deletePost');
const nodemailer = require("nodemailer");

module.exports = (app, db, fs) => {
    // Получить посты по сооношению
    app.use(fileUpload());
    app.get('/api/get/posts/:ratio', (req, res) => {
        let ratio = req.params.ratio;

        db.query('SELECT * FROM posts WHERE ratio=?', [ratio], (err, result) => {
            if(err) throw err

            res.send(result)
        })
    })

    app.post('/api/add/post/', (req, res) => {
        let title = req.body.title;
        let text = req.body.text;
        var arr = [];
        let ratio = req.body.ratio;
        let coordinate = req.body.coordinate;
        let price = req.body.price;

        if(req.files) {
            let promis = new Promise((resolve, reject) => {
                Object.values(req.files).map((el, index, array) => {
                    el.mv('./static/image/' + el.name, function(error) {
                        if(error) {
                            throw error
                        }
                    });
                    arr.push({href: `/image/${el.name}`})
                    if(index == array.length - 1) resolve()
                })
            })

            promis.then(() => toSend())
        } else {
            toSend()
        }

        function toSend() {
            db.query('INSERT INTO posts (name, text, image, ratio, coordinate, price) VALUES (?, ?, ?, ?, ?, ?)', [title, text, JSON.stringify([...arr]), ratio, coordinate, price], (err, result) => {
                if(err) throw err

                res.send({id: result.insertId, name: title, text, image: JSON.stringify([...arr]), ratio, coordinate, price})
            } )
        }
    })

    //Удаляем пост по id
    app.delete('/api/delete/post/:id', (req, res) => {
        deletePost.deletePost([Number(req.params.id)], db, fs)
        res.send({id: Number(req.params.id)})
    })

    // Получаем пост по id
    app.get('/api/get/post/:id', (req, res) => {
        let id  = req.params.id;

        db.query('SELECT * FROM posts WHERE id=?', [id], (err, result) => {
            if(err) throw err

            res.send(result)
        })
    })
    // Отправляем сообщение на почту. Тест.
    app.post('/api/send-mail/post/', (req, res) => {
        let data = req.body;
        let trans = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'david.perov60@gmail.com',
                pass: '1q2w3e4r5t0987654321'
            }
        })

        trans.sendMail({
            from: '"Сайт недвижимости" <david.perov60@gmail.com>',
            to: "david.perov60@gmail.com",
            subject: `${data.name} Прошел тест на сайте!`,
            html: `<div>
                    <div
                        style="padding: 10px;
                        margin: 10px;
                        border-radius: 2px;">
                        <h2>${data.name} Оставил контакт:  </h2>
                            <p style="font-size: large;">${data.emails}</p>

                    </div>
                    <div
                        style="padding: 10px;
                        margin: 10px;
                        border-radius: 2px;">
                        <h2> ${data.name} Заполнил следующие пункты :  </h2>
                            <p style="font-size: large;">Выбранный тип: ${data.one}</p>
                            <p style="font-size: large;">Количество комнат: ${data.two}</p>
                            <p style="font-size: large;">Цель: ${data.three}</p>
                            <p style="font-size: large;">Способ оплаты: ${data.four}</p>

                    </div>
                    </div>
                    `
        }, (err, result) => {
            if(err) throw err

        })
        res.send(data)
    })

    app.post('/api/send-mail/modal/raport/', (req, res) => {
        let data = req.body;
        let trans = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'david.perov60@gmail.com',
                pass: '1q2w3e4r5t0987654321'
            }
        })

        trans.sendMail({
            from: '"Сайт недвижимости" <david.perov60@gmail.com>',
            to: "david.perov60@gmail.com",
            subject: "Новая заявка с сайта!",
            html: `<div>
                    <div
                        style="padding: 10px;
                        background: #ffdd57;
                        margin: 10px;
                        border-radius: 2px;">
                        <h2>Имя и данные отправителя:  </h2> <p style="font-size: large;">Имя: ${data.name}</p> <p style="font-size: large;"> Данные: ${data.emails}</p>
                        </div>
                    </div>

                    <div
                    style="padding: 10px;
                    background: #ffdd57;
                    margin: 10px;
                    border-radius: 2px;">
                        <h2>${data.name} хочет:  </h2><p style="font-size: large;"> ${data.options}</p>
                        </div>
                    ${data.discription ? `
                        <div
                        style="padding: 10px;
                        background: #ffdd57;
                        margin: 10px;
                        border-radius: 2px;">
                        <h2>${data.name} оставил сообщение:  </h2><p style="font-size: large;"> ${data.discription}</p>
                        </div>`
                        :
                    ''
                }

                    </div>
                    `
        }, (err, result) => {
            if(err) throw err

        })
        res.send(data)
    })
    // Add post
    app.post('/api/add-news', (req, res) => {
      db.query('INSERT INTO news (title, text) VALUES(?, ?)', [req.body.title, req.body.text], (err, result) => {
        if(err) throw err

        res.send({id: result, title: req.body.title, text: req.body.text})
      })
    })
    // Get All Posts
    app.get('/api/get/news/', (req, res) => {
      db.query('SELECT * FROM news', (err, result) => {
        if(err) throw err

        res.send(result)
      })
    })
    // Delete News BY Id
    app.delete('/api/delete-news/:id', (req, res) => {
      let id = req.params.id;

      db.query('DELETE FROM news WHERE id=?', [id], (err, result) => {
        if(err) throw err
        res.send('delete')
      })
    })
    // Select News three col
    app.get('/api/news/get-col/:number', (req, res) => {
      let num = Number(req.params.number)
      db.query('SELECT * FROM news ORDER BY id DESC LIMIT 3', [num], (err, result) => {
        if(err) throw err

        res.send(result)
      })
    })
}

