//rcb csk mi
function topTenHighestBatsman(deliveries,matches){

    
	const teams=deliveries.filter((team)=>{
		return (team.batting_team=="Royal Challengers Bangalore" && team.bowling_team=="Mumbai Indians") || (team.batting_team=="Royal Challengers Bangalore" && team.bowling_team=="Chennai Super Kings") 
	})
	
	const years=matches.reduce((years,match)=>{
		if(years.indexOf(match.season)==-1){
			years.push(match.season)
                
		}
		return years
	},[])
    
	const runsOfBatsmanPerYear=years.reduce((years,year)=>{
        
        const matchId=matches.reduce((ids,match)=>{
			if(match.season==year){
				ids.push(match.id)
			}
			return ids
		},[])
		//return matchId
        
		const runsOfBatsman=teams.reduce((batsmans,match)=>{
			if(matchId.includes(match.match_id)){

          
				batsmans[match.batsman]=batsmans[match.batsman] + Number(match.batsman_runs) || Number(match.batsman_runs)
			}
			return batsmans

		},{})
        
		const result=Object.entries(runsOfBatsman)
		result.sort(function(a,b){
			return b[1]-a[1]
		})
        years[year]=result.slice(0,10)
        return years
        
    },{})
    return runsOfBatsmanPerYear
         
    
	

    

}
module.exports.topTenHighestBatsman=topTenHighestBatsman