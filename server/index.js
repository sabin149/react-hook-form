const express = require('express')
const app = express()
const cors = require('cors')

let store = require('./placeholder')

app.use(cors())

app.get('/', (req, res) => {
    let { page, limit } = req.query
    if (!page) page = 1
    if (!limit) limit = 10
    page = parseInt(page)
    limit = parseInt(limit)

    let data = [...store]

    // search by any key and value
    if (req.query.search) {
        const [key, value] = req.query.search.split(',')

        const filteredData = store.filter(item => {
            const itemValue = item[key]
            return itemValue && itemValue.toString().toLowerCase().includes(value.toLowerCase())
        })

        data = filteredData
    }

    // sort by any key in asc or desc order
    if (req.query.sort) {
        const [key, order] = req.query.sort.split(',')
        data.sort((a, b) => {
            const comparison = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0
            return order === 'desc' ? comparison * -1 : comparison
        })
    }

    const total = data.length
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const paginatedData = data.slice(startIndex, endIndex)

    return res.json({
        data: paginatedData,
        total,
    })
})

app.listen(4000, () => {
    console.log('App started on port 4000')
})
