
var fs=require("fs")
const matchesData=fs.readFileSync("./../dataset/matches.json","utf8")
const matches=JSON.parse(matchesData)
const deliveriesData=fs.readFileSync("./../dataset/deliveries.json","utf8")
const deliveries=JSON.parse(deliveriesData)
var ipl=require("./ipl")
var test=require("./test1")



/***************************************************** batsman per year  run */

const totalRunPerBatsmans = (ipl.totalRunPerBatsmans(deliveries))
//console.log(totalRunPerBatsmans)

/******************************* FUNCTION 1 **************************** */
const matchesPerYear1=(ipl.matchesPerYear1(matches))
//console.log(matchesPerYear1)

// const matechesPerYear2=(ipl.matechesPerYear2(matches))
// console.log(matechesPerYear2)

// const matechesPerYear3=(ipl.matechesPerYear3(matches))
// console.log(matechesPerYear3)

const matchesWonPerTeam1=ipl.matchesWonPerTeam1(matches)
//console.log(matchesWonPerTeam1)
// fs.writeFile("./../client/matchesWonPerTeam.json",JSON.stringify(matchesWonPerTeam1,null,4),finished)
// function finished(err){
// 	console.log("dumped")
// }
//console.log(matchesWonPerTeam1)
var year3="2016"
const extraRunConceded1=ipl.extraRunConceded1(matches,deliveries,year3)
//console.log(extraRunConceded1)

const topTenEconomicalBallers1=ipl.topTenEconomicalBallers1(matches,deliveries,"2015")
//console.log(topTenEconomicalBallers1)

const topDotBallPlayer=ipl.topDotBallPlayer(deliveries)
//console.log(topDotBallPlayer)
const dotPerYear=ipl.dotPerYear(deliveries,matches)
//console.log(dotPerYear)
const topTenHighestBatsman=test.topTenHighestBatsman(deliveries,matches)
//console.log(topTenHighestBatsman)

function highestBatsmanAverage(matches,deliveries){
     
	const ids=matches.reduce((id,match)=>{
		if(match.season=="2012"){
			id.push(match.id)
		}
		return id
	},[])

	var batsman_runs=deliveries.reduce((deliveries,delivery)=>{
		//console.log("hii")
		if(ids.includes(delivery["match_id"]) && delivery["batting_team"]=="Kolkata Knight Riders"){
           
			deliveries[delivery.batsman]=deliveries[delivery.batsman]+Number(delivery["batsman_runs"]) || Number(delivery["batsman_runs"])
		}
		return deliveries
	},{})
	batsman_runs=Object.entries(batsman_runs)
	batsman_runs.sort((a,b)=>{
		return b[1]-a[1]
	})
	console.log(batsman_runs)
}

//highestBatsmanAverage(matches,deliveries)
//console.log(matches)
function matchesWon(matches){
	  
	const matchesWon=matches.reduce((matches,match)=>{
		 
		if(!matches[match.winner]){
			matches[match.winner]={}
			matches[match.winner][match.season]=1
		}
		else{
			matches[match.winner][match.season]=matches[match.winner][match.season]+1||1
		}
		return matches
	},{})
	console.log(matchesWon)
}
matchesWon(matches)