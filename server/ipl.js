
function matchesPerYear1(matches) {
	return matches.reduce((years, match) => {
		years[match.season] = years[match.season] + 1 || 1
		return years
	}, {})
}
module.exports.matchesPerYear1 = matchesPerYear1

function matechesPerYear2(matches) {
	return matches.reduce((years, match) => {
		if (match.season in years) {
			years[match.season] = years[match.season] + 1
		} else {
			years[match.season] = 1
		}
		return years
	}, {})
}
module.exports.matechesPerYear2 = matechesPerYear2

function matechesPerYear3(matches) {
	return matches.reduce((years, match) => {
		if (years.hasOwnProperty(match.season)) {
			years[match.season] = years[match.season] + 1
		} else {
			years[match.season] = 1
		}
		return years
	}, {})
}
module.exports.matechesPerYear3 = matechesPerYear3

function matchesWonPerTeam1(matches) {
	var years = matches.reduce((years, match) => {
		if (!years[match.season]) {
			years[match.season]=0
		}

		return years
	},{})
    
	const matchesWonPerTeam = matches.reduce((team, match) => {
		if (!team[match.winner]) {
			team[match.winner] = {
				"2008": 0,
				"2009": 0,
				"2010": 0,
				"2011": 0,
				"2012": 0,
				"2013": 0,
				"2014": 0,
				"2015": 0,
				"2016": 0,
				"2017": 0
			}
			// team[match.winner]=years
			team[match.winner][match.season] += 1
		} else {
			team[match.winner][match.season] = team[match.winner][match.season] + 1 || 1
		}
		return team
	}, {})
	//return matchesWonPerTeam
	return years
}
module.exports.matchesWonPerTeam1 = matchesWonPerTeam1

function extraRunConceded1(matches, deliveries, year) {
	const ids = matches.reduce((id, match) => {
		if (match.season == year) {
			id.push(match.id)
		}
		return id
	}, [])

	const extraRuns = deliveries.reduce((extraRunsResult, match) => {
		if (ids.includes(match["match_id"])) {
			extraRunsResult[match.bowling_team] =
        extraRunsResult[match.bowling_team] + Number(match.extra_runs) || Number(match.extra_runs)
		}
		return extraRunsResult
	}, {})
	return extraRuns
}
module.exports.extraRunConceded1 = extraRunConceded1

function topTenEconomicalBallers1(matches, deliveries, year) {
	const ids = matches.reduce((ids, match) => {
		if (match.season == year) {
			ids.push(match.id)
		}
		return ids
	}, [])
	const bowler = deliveries.reduce((bowler, match) => {
		if (ids.includes(match.match_id)) {
			if (!bowler[match.bowler]) {
				bowler[match.bowler] = [
					Number(match.total_runs) + Number(match.legbye_runs) - Number(match.bye_runs),
					1
				]
			} else {
				bowler[match.bowler][0] +=
          Number(match.total_runs) + Number(match.legbye_runs) - Number(match.bye_runs)
				bowler[match.bowler][1] += 1
			}
		}
		return bowler
	}, {})

	const result = Object.entries(bowler).reduce((a, b) => {
		var runs = b[1][0]
		var overs = b[1][1] / 6
		var economy = runs / overs
		a[b[0]] = economy
		//a.push([b[0],economy])
		return a
	}, {})

	const result1 = Object.entries(result)
	result1.sort(function(a, b) {
		return a[1] - b[1]
	})
	return result1.slice(0, 10)
}

module.exports.topTenEconomicalBallers1 = topTenEconomicalBallers1

function totalRunPerBatsmans(deliveries) {
	const m = deliveries.reduce((a, b) => {
		a[b.batsman] = a[b.batsman] + parseInt(b.batsman_runs) || parseInt(b.batsman_runs)
		return a
	}, {})

	const result = Object.entries(m)

	result.sort(function(a, b) {
		return b[1] - a[1]
	})
	return result.slice(0, 10)
}

module.exports.totalRunPerBatsmans = totalRunPerBatsmans

function topDotBallPlayer(delieveries) {
	const dotBalls = delieveries.reduce((dotBalls, match) => {
		if (match.batsman_runs == "0") {
			dotBalls[match.batsman] = dotBalls[match.batsman] + 1 || 1
		}
		return dotBalls
	}, {})
	const result = Object.entries(dotBalls)
	result.sort(function(a, b) {
		return b[1] - a[1]
	})
	return result[0]
}
module.exports.topDotBallPlayer = topDotBallPlayer

function dotPerYear(delieveries, matches) {
	//const dotsPerYearBatsman={}
	const years = matches.reduce((years, match) => {
		if (years.includes(match.season) == false) {
			years.push(match.season)
		}
		return years
	}, [])
	const dotsPerYearBatsman = years.reduce((dotsPerYear, year) => {
		const ids = matches.reduce((ids, match) => {
			if (match.season == year) {
				ids.push(match.id)
			}
			return ids
		}, [])
		//return ids
		const dotBalls = delieveries.reduce((dotBalls, match) => {
			if (ids.includes(match.match_id)) {
				if (match.batsman_runs == "0") {
					dotBalls[match.batsman] = dotBalls[match.batsman] + 1 || 1
				}
			}
			return dotBalls
		}, {})
		const result = Object.entries(dotBalls)
		result.sort(function(a, b) {
			return b[1] - a[1]
		})
		if (!dotsPerYear[year]) {
			dotsPerYear[year] = result[0]
		}
		return dotsPerYear
	}, {})

	return dotsPerYearBatsman
}

module.exports.dotPerYear = dotPerYear
