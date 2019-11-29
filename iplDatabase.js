const { Client } = require("pg");
const client = new Client({
	user: "mountblue",
	host: "ipl-1.c3xodypxb4ts.ap-south-1.rds.amazonaws.com",
	database: "ipl",
	password: "mountblue!011q2w",
	port: 5432
})

client.connect()

	.then(() => console.log("Connected Successfully"))
	.then(() => console.log("matches per year"));
client.query("select season,count(id) as Matches from matches group by season order by season")

	.then(a => console.table(a.rows))

client.query("select winner,season,count(season) as matches from matches group by winner,season order by winner,season")
	.then(a => console.table(a.rows))

//client.query("select bowling_team , sum(extra_runs) as Extra_Runs from deliveries where match_id in (select id from matches where season='2016') group by bowling_team, extra_runs order by bowling_team")
client.query("select bowling_team, sum(extra_runs) as Extra_Runs_conceded from deliveries inner join matches  on id=match_id where season='2016' group by bowling_team limit 10")
	.then(a => console.table(a.rows))
client.query("select bowler , sum(total_runs+legbye_runs-bye_runs)*6.0/count(bowler) as economy from deliveries inner join matches on match_id=id where season='2015' group by bowler order by economy asc limit 10 ")
.then(a=>console.table(a.rows))
	
	.catch(e=>console.log(e))
	.finally(() => client.end())
