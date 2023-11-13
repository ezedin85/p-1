// 0, 30000, 50000, 70000
// IF 0 lt - 30000
// IF 30000 - gte 30000 - lt - 50000
// IF 50000 - gte 50000 - lt - 70000
// IF 70000 - gte 70000

function getMultiplePriceRange(selectedPrices) {
    let priceQuery = []

    if (selectedPrices.includes('0'))
        priceQuery.push({ price: { $lt: 40000 } })
    if (selectedPrices.includes('40000'))
        priceQuery.push({ price: { $gte: 40000, $lt: 60000 } })
    if (selectedPrices.includes('60000'))
        priceQuery.push({ price: { $gte: 60000, $lt: 80000 } })
    if (selectedPrices.includes('80000'))
        priceQuery.push({ price: { $gte: 80000, $lt: 100000 } })
    if (selectedPrices.includes('100000'))
        priceQuery.push({ price: { $gte: 100000 } })

    return priceQuery
}

const getPriceRange = (price) => {
    let priceQuery = []

    if (price < 40000)
        priceQuery.push({ price: { $lt: 40000 } })
    else if (price >= 40000 && price < 60000)
        priceQuery.push({ price: { $gte: 40000, $lt: 60000 } })
    else if (price >= 60000 && price < 80000)
        priceQuery.push({ price: { $gte: 60000, $lt: 80000 } })
    else if (price >= 80000 && price < 100000)
        priceQuery.push({ price: { $gte: 80000, $lt: 100000 } })
    else if (price >= 100000)
        priceQuery.push({ price: { $gte: 100000 } })
    return priceQuery
}

module.exports = {
    getMultiplePriceRange,
    getPriceRange
}