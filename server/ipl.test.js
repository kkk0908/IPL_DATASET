var ipl=require("./ipl")
const matches =require("./../dataset/matches.json")
const deliveries =require("./../dataset/deliveries.json")


/************************** FIRST FUNCTION TESTING************************** */

describe("matchesPerYear",()=>{
	test("Matches length should be one or greater than one",()=>{
		expect(matches.length).not.toBe(0)
	})
	test("Matches should not be null",()=>{
		expect(matches).not.toBeNull()
	})
    
	test("Return value should be defined",()=>{
		expect(ipl.matchesPerYear1(matches)).toBeDefined()
	})
    
	test("Function should be defined.",()=>{
		expect(ipl.matchesPerYear1).toBeDefined()
	})
    
	const sampleMatches=[{"season":"2008"},{"season":"2008"},{"season":"2009"}]
	test("Checking for desired result ",()=>{
        
		expect(ipl.matchesPerYear1(sampleMatches)).toEqual({ "2008": 2, "2009": 1 })
	})        
})

/************************** SECOND FUNCTION TESTING ************************** */

describe("matchesWonPerTeamPerYear",()=>{
	test("Matches length should be one or greater than one",()=>{
		expect(matches.length).not.toBe(0)
	})
	test("Matches should not be null",()=>{
		expect(matches).not.toBeNull()
	})
    
	test("Return value should be defined",()=>{
		expect(ipl.matchesWonPerTeam1(matches)).toBeDefined()
	})
    
	test("Function should be defined.",()=>{
		expect(ipl.matchesWonPerTeam1).toBeDefined()
	})
    
	const sampleMatches=[{"season":"2017","winner":"Sunrisers Hyderabad"},{"season":"2017","winner":"Rising Pune Supergiant"},{"season":"2009","winner":"Royal Challengers Bangalore"}]
	test("Checking for desired result ",()=>{
        
		expect(ipl.matchesWonPerTeam1(sampleMatches)).toStrictEqual({
			"Sunrisers Hyderabad": { "2017": 1 },
			"Rising Pune Supergiant": { "2017": 1 },
			"Royal Challengers Bangalore": { "2009": 1 }
		})
	})        
})

/****************************** FUNCTION-3 TESTING ****************************** */

describe("extraRunsconceded",()=>{
	test("Matches length should be one or greater than one",()=>{
		expect(matches.length).not.toBe(0)
	})

	test("Deliveries length should be one or greater than one",()=>{
		expect(deliveries.length).not.toBe(0)
	})
    
	test("Matches should not be null",()=>{
		expect(matches).not.toBeNull()
	})

	test("Deliveries should not be null",()=>{
		expect(deliveries).not.toBeNull()
	})
    
	const year="2016"
	test("Year should not be null",()=>{
		expect(year).not.toBeNull()
	})

    
	test("Return value should be defined",()=>{
	 	expect(ipl.extraRunConceded1(matches,deliveries,year)).toBeDefined()
	})
    
	test("Function should be defined.",()=>{
		expect(ipl.extraRunConceded1).toBeDefined()
	})
    
	const sampleMatches=[
		{"id":"586","season":"2016"},
		{"id":"618","season":"2016"},
		{"id":"634","season":"2016"}]
        
	const sampleDeliveries=[
		{"match_id":"586","bowling_team":"Rising Pune Supergiants","extra_runs":"0"},
		{"match_id":"618","bowling_team":"MC Henriques","extra_runs":"0"},
		{"match_id":"620","bowler":"DJ Bravo","extra_runs":"0"}
	]

	test("Checking for desired result ",()=>{
        
		expect(ipl.extraRunConceded1(sampleMatches,sampleDeliveries,year)).toEqual({ "Rising Pune Supergiants": 0, "MC Henriques": 0 })
	})        
})


/*************************** FUNCTION 4 TESTING ******************************/


describe("topTenEconomicalBowler",()=>{
	test("Matches length should be one or greater than one",()=>{
		expect(matches.length).not.toBe(0)
	})

	test("Deliveries length should be one or greater than one",()=>{
		expect(deliveries.length).not.toBe(0)
	})
    
	test("Matches should not be null",()=>{
		expect(matches).not.toBeNull()
	})

	test("Deliveries should not be null",()=>{
		expect(deliveries).not.toBeNull()
	})
    
	const year="2015"
	test("Year should not be null",()=>{
		expect(year).not.toBeNull()
	})

    
	 test("Return value should be defined",()=>{
	 	expect(ipl.topTenEconomicalBallers1(deliveries,matches)).toBeDefined()
	 })
    
	test("Function should be defined.",()=>{
		expect(ipl.topTenEconomicalBallers1).toBeDefined()
	})
    
	const sampleMatches=[
		{"id":"586","season":"2015"},
		{"id":"618","season":"2015"},
		{"id":"634","season":"2015"}]
        
	const sampleDeliveries=[
		{"match_id":"586","bowler":"I Sharma","is_super_over":"0","wide_runs":"0","bye_runs":"0","legbye_runs":"0","noball_runs":"0","penalty_runs":"0","batsman_runs":"0","extra_runs":"0","total_runs":"0"},
		{"match_id":"618","bowler":"Mohammed Shami","is_super_over":"0","wide_runs":"0","bye_runs":"0","legbye_runs":"0","noball_runs":"0","penalty_runs":"0","batsman_runs":"1","extra_runs":"0","total_runs":"1"},
		{"match_id":"620","bowler":"P Kumar","is_super_over":"0","wide_runs":"0","bye_runs":"0","legbye_runs":"0","noball_runs":"0","penalty_runs":"0","batsman_runs":"4","extra_runs":"0","total_runs":"4"}
	]

	test("Checking for desired result ",()=>{
        
		expect(ipl.topTenEconomicalBallers1(sampleMatches,sampleDeliveries,year)).toEqual([ [ "I Sharma", 0 ], [ "Mohammed Shami", 6 ] ])
	})        
})










