const express=require("express");
const { getBooks, getBook, updateBook, addBook, deleteBook } = require("../controllers/booksController");

const router=express.Router();

router.get("/",getBooks);
router.get("/:id",getBook);
router.post("/",addBook);
router.put("/:id",updateBook);
router.delete("/:id",deleteBook);


module.exports=router;