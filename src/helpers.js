// 0, 30000, 50000, 70000
// IF 0 lt - 30000
// IF 30000 - gte 30000 - lt - 50000
// IF 50000 - gte 50000 - lt - 70000
// IF 70000 - gte 70000

function getMultiplePriceRange(selectedPrices) {
    let priceQuery = []

    if (selectedPrices.includes('0'))
        priceQuery.push({ price: { $lt: 30000 } })
    if (selectedPrices.includes('30000'))
        priceQuery.push({ price: { $gte: 30000, $lt: 50000 } })
    if (selectedPrices.includes('50000'))
        priceQuery.push({ price: { $gte: 50000, $lt: 70000 } })
    if (selectedPrices.includes('70000'))
        priceQuery.push({ price: { $gte: 70000 } })

    return priceQuery
}

const getPriceRange = (price) => {
    let priceQuery = []

    if (price < 30000)
        priceQuery.push({ price: { $lt: 30000 } })
    else if (price >= 30000 && price < 50000)
        priceQuery.push({ price: { $gte: 30000, $lt: 50000 } })
    else if (price >= 50000 && price < 70000)
        priceQuery.push({ price: { $gte: 50000, $lt: 70000 } })
    else if (price >= 70000)
        priceQuery.push({ price: { $gte: 70000 } })
    return priceQuery
}

module.exports = {
    getMultiplePriceRange,
    getPriceRange
}