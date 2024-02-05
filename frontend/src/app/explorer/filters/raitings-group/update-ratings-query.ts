export function updateRatingsQuery(currentRatings: string, newRatings: string) {
	console.log(currentRatings)
	console.log(newRatings)

	const ratingsArray = currentRatings ? String(currentRatings).split('|') : []

	const ratingsIndex = ratingsArray.indexOf(newRatings)

	if (ratingsIndex !== -1) {
		ratingsArray.push(newRatings)
	} else {
		ratingsArray.splice(ratingsIndex, 1)
	}

	return ratingsArray.join('|')
}
