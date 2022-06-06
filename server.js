const express = require('express')
const app = express()

app.get('/:x', (req,res) => {
	res.sendFile('/index.html', { root: __dirname })
})

app.listen(3000)