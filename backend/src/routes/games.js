const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const auth = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {

 const page = parseInt(req.query.page) || 1
 const limit = parseInt(req.query.limit) || 20
 const offset = (page - 1) * limit
 console.log("THIS IS req: ", req.query);
 const games = await pool.query(
  `SELECT * FROM games
   ORDER BY created_at DESC
   LIMIT $1 OFFSET $2`,
  [limit, offset]
 )

 const total = await pool.query("SELECT COUNT(*) FROM games")

 res.json({
  data: games.rows,
  total: parseInt(total.rows[0].count),
  page,
  totalPages: Math.ceil(total.rows[0].count / limit)
 })

})

router.get("/:id", async (req, res) => {
 console.log("THIS IS req: ", req.params);
 const game = await pool.query(
  "SELECT * FROM games WHERE id=$1",
  [req.params.id]
 )

 if (game.rows.length === 0) {
  return res.status(404).json({ error: "Game not found" })
 }

 res.json(game.rows[0])
})

router.post("/favorite/:id", auth, async (req, res) => {
  await pool.query(
    "INSERT INTO user_favorites(user_id, game_id) VALUES($1,$2)",
    [req.user.sub, req.params.id]
  );
  res.json({ message: "Added to favorites" });
});

module.exports = router;