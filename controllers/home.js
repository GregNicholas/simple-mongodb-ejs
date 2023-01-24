const Items = require("../models/Item")
const Boards = require("../models/Board")

module.exports = {
    getIndex: async (req, res) => {
        try {
            const items = await Items.find()
            const boards = await Boards.find()
            res.render("index.ejs", {itemList: items, boards: boards})
        }catch(err) {
            return res.status(500).send(err)
        }
    },
    createBoard: async (req, res) => {
        const columns = req.body.columns.map(column => {
            return {name: column, tasks: []}
        })
        console.log(req.body.columns, req.body.boardName)
        const newBoard = new Boards(
            {
                name: req.body.boardName,
                columns: columns,
            }
        )
        try {
            await newBoard.save()
            console.log(newBoard)
            res.redirect('/')
        }catch(err) {
            return res.status(500).send(err)
            res.redirect('/')
        }
    },
    createItem: async (req, res) => {
        const newItem = new Items(
            {
                nameInput: req.body.nameInput,
                qtyInput: req.body.qtyInput,
                description: req.body.description
            }
        )
        try {
            await newItem.save()
            res.redirect('/')
        }catch(err) {
            return res.status(500).send(err)
            res.redirect('/')
        }
    }
}