fetch("./client/matchesPerYear.json")
	.then(function(response) {
		return response.json()
	})
	.then(function(myJson) {
		var keys = Object.keys(myJson)
		var values = Object.values(myJson)
		console.log(keys)
		console.log(values)

		matchesPerYear(keys, values)
	})

function matchesPerYear(keys, values) {
	Highcharts.chart("matchesPerYear", {
		chart: {
			type: "column"
		},
		title: {
			text: "Matches Per Year "
		},
		subtitle: {
			text: "source :  ipl datasets",
			footerFormat: "</table>",
			shared: true,
			useHTML: true
		},
		plotOptions: {
			column: {
				pointPadding: 0.2,
				borderWidth: 0
			}
		},
		series: [
			{
				name: "YEARS",
				data: values
			}
		]
	})
}


/************************************************************************ */


fetch("./client/extraRun.json")
	.then(function(response) {
		return response.json()
	})
	.then(function(myJson) {
		var keys = Object.keys(myJson)
		var values = Object.values(myJson)
		console.log(keys)
		console.log(values)

		extraRuns(keys, values)
	})
function extraRuns(keys, values) {
	Highcharts.chart("extraRun", {
		chart: {
			type: "column"
		},
		title: {
			text: "Extra Runs Conceded By Per Team "
		},
		subtitle: {
			text: "source :  ipl datasets"
		},
		xAxis: {
			categories: keys,

			crosshair: true
		},
		yAxis: {
			min: 0,
			title: {
				text: "RUNS"
			}
		},
		tooltip: {
			headerFormat: "<span style=\"font-size:10px\">{point.key}</span><table>",
			pointFormat:
        "<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td>" +
        "<td style=\"padding:0\"><b>{point.y:.1f} runs </b></td></tr>",
			footerFormat: "</table>",
			shared: true,
			useHTML: true
		},
		plotOptions: {
			column: {
				pointPadding: 0.2,
				borderWidth: 0
			}
		},
		series: [
			{
				name: "TEAMS",
				data: values
			}
		]
	})
}

/********************************************************************* */



fetch("./client/topTenEconomicalBowllers.json")
	.then(function(response) {
		return response.json()
	})
	.then(function(myJson) {
		//console.log(myJson)

		var keys = myJson.map(bowler => {
			return bowler[0]
		})
		console.log(keys)

		
		var values = myJson.map(bowler => {
			return bowler[1]
		} )
		console.log(values)

		topTen(keys, values)
	})
function topTen(keys, values) {
	Highcharts.chart("topTen", {
		chart: {
			type: "column"
		},
		title: {
			text: "Top Ten Economical Bowlers "
		},
		subtitle: {
			text: "source :  ipl datasets"
		},
		xAxis: {
			categories: keys,

			crosshair: true
		},
		yAxis: {
			min: 0,
			title: {
				text: "Economics Of Bowlers"
			}
		},
		tooltip: {
			headerFormat: "<span style=\"font-size:10px\">{point.key}</span><table>",
			pointFormat:
        "<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td>" +
        "<td style=\"padding:0\"><b>{point.y:.3f} economic </b></td></tr>",
			footerFormat: "</table>",
			shared: true,
			useHTML: true
		},
		plotOptions: {
			column: {
				pointPadding: 0.2,
				borderWidth: 0
			}
		},
		series: [
			{
				name: "BOWLERS",
				data: values
			}
		]
	})
}

/********************************************************************************* */



fetch("./client/matchesWonPerTeam.json")
	.then(function(response) {
		return response.json()
	})
	.then(function(myJson) {
		console.log(myJson)
		//const keysArray=Object.entries(myJson)
		myJson = Object.entries(myJson)
		console.log(myJson)
		var teams = myJson.reduce((teams, team) => {
			teams.push(team[0])
			return teams
		}, [])
		var years = myJson.reduce((years, team) => {
			years.push(team[1])
			return years
		}, [])
		console.log(years)
		const values = years.reduce((values, year) => {
			values.push(Object.values(year))
			return values
		}, [])
		console.log(values)
		const keys = Object.keys(years[0])
		console.log(keys)
		var result = []
		for (let i = 0; i < values.length; i++) {
			var a = {
				name: teams[i],
				data: values[i]
			}
			result.push(a)
		}
		console.log(keys)
		console.log(result)
		matchesWonPerTeam(keys, result)
	})
function matchesWonPerTeam(keys, result) {
	Highcharts.chart("matchesWonPerTeam", {
		chart: {
			type: "column"
		},
		//https://youtu.be/PoRJizFvM7s?t=1085
		title: {
			text: "Matches Won Per Team Per Year"
		},
		xAxis: {
			categories: keys
		},
		yAxis: {
			min: 0,
			title: {
				text: "Total WON Matches"
			},
			stackLabels: {
				enabled: true,
				style: {
					fontWeight: "bold",
					color:
            // theme
            (Highcharts.defaultOptions.title.style &&
              Highcharts.defaultOptions.title.style.color) ||
            "gray"
				}
			}
		},
		legend: {
			align: "right",
			x: -30,
			verticalAlign: "top",
			y: 25,
			floating: true,
			backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || "white",
			borderColor: "#CCC",
			borderWidth: 1,
			shadow: false
		},
		tooltip: {
			headerFormat: "<b>{point.x}</b><br/>",
			pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}"
		},
		plotOptions: {
			column: {
				stacking: "normal",
				dataLabels: {
					enabled: true
				}
			}
		},
		series: result
	})
}


