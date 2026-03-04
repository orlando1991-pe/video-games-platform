const pool = require("./src/config/db.js")

const genres = [
 "RPG",
 "Action",
 "Adventure",
 "Shooter",
 "Strategy",
 "Indie",
 "Horror",
 "Platform"
]

const images = [

"https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg",
"https://images.igdb.com/igdb/image/upload/t_cover_big/co1rgi.jpg",
"https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.jpg",
"https://images.igdb.com/igdb/image/upload/t_cover_big/co1tmu.jpg",
"https://images.igdb.com/igdb/image/upload/t_cover_big/co1ntf.jpg",
"https://images.igdb.com/igdb/image/upload/t_cover_big/co2lbd.jpg",
"https://images.igdb.com/igdb/image/upload/t_cover_big/co2wyy.jpg",
"https://images.igdb.com/igdb/image/upload/t_cover_big/co1vcf.jpg",
"https://images.igdb.com/igdb/image/upload/t_cover_big/co1q1f.jpg",
"https://images.igdb.com/igdb/image/upload/t_cover_big/co1y9d.jpg"
]

const titles = [

"The Witcher",
"Cyberpunk",
"Elden Ring",
"God of War",
"Dark Souls",
"Hollow Knight",
"Resident Evil",
"Call of Duty",
"Assassins Creed",
"Final Fantasy",
"Red Dead Redemption",
"Metal Gear",
"Battlefield",
"Far Cry",
"Mass Effect",
"Diablo",
"Skyrim",
"Dragon Age",
"Persona",
"Street Fighter"

]

function random(arr){
 return arr[Math.floor(Math.random()*arr.length)]
}

async function seed(){

 for(let i=1;i<=120;i++){

  const title = `${random(titles)} ${i}`

  const genre = random(genres)

  const image = random(images)

  const rating = (Math.random()*3 + 7).toFixed(1)

  await pool.query(

   `
   INSERT INTO games
   (title,genre,image_url,rating)
   VALUES($1,$2,$3,$4)
   `,

   [title,genre,image,rating]

  )

 }

 console.log("120 games inserted")

 process.exit()
}

seed()