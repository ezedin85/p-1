const { getPriceRange, getMultiplePriceRange } = require('./helpers')
const { Laptop, Recommendation } = require('./model')

const addLaptop = async (req, res) => {
    try {
        const laptop = await Laptop.create(req.body)
        res.status(201).json(laptop)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getLaptops = async (req, res) => {
    try {
        const laptops = await Laptop.find({}).sort('-createdAt')
        res.status(200).json(laptops)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getLaptop = async (req, res) => {
    const { id } = req.params
    try {
        const laptop = await Laptop.findById(id)
        if (laptop === null) throw Error("no Laptop found")
        res.status(200).json(laptop)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getCaption = async (req, res) => {
    const { messageId } = req.params
    try {
        const laptop = await Laptop.findOne({ messageId }).select("caption")
        if (!laptop) throw Error("No product found with this message ID. It's possible that the product hasn't been published. /help")
        res.status(200).json(laptop)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getFilteredProducts = async (req, res) => {

    const { prices, rams, storages, cores } = req.query

    //converting to an array
    const selectedPrices = prices.split(",")
    const selectedRams = rams.split(",")
    const selectedStorages = storages.split(",")
    const selectedCores = cores.split(",")

    try {
        const laptops = await Laptop.find({
            $or: getMultiplePriceRange(selectedPrices),
            ram: { $in: selectedRams },
            storage: { $in: selectedStorages },
            core: { $in: selectedCores }
        }).select("messageId -_id")
        res.status(201).json(laptops)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getSimilarProducts = async (req, res) => {
    const { id } = req.params
    try {
        //find the selected product data
        let product = await Laptop.findOne({ _id: id }).select("ram storage core price -_id")
        if (!product) throw Error("Product not found")

        //price range
        const minPrice = product.price - 10000
        const maxPrice = product.price + 10000
        const priceRange = { $gte: minPrice, $lte: maxPrice }

        //find similar products
        const similarProds = await Laptop.find({
            _id: { $ne: id }, //don't select the product itself
            $or: [
                { price: priceRange, core: product.core, storage: product.storage, ram: product.ram }, //if everything same
                { price: priceRange, core: { $ne: product.core }, storage: product.storage, ram: product.ram }, //if only core is not same
                { price: priceRange, core: product.core, storage: { $ne: product.storage }, ram: product.ram },
                { price: priceRange, core: product.core, storage: product.storage, ram: { $ne: product.ram } }
            ]
        })

        //send response
        res.status(201).json(similarProds)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//TODO-2 make it strong rest api [eg. ad custom error if(user.exists).]
const addRecommendation = async (req, res) => {
    let recommendation

    try {
        const { userId } = req.body
        const user = await Recommendation.findOne({ userId })

        //if user exits update it else register them
        if (user) {
            recommendation = await Recommendation.findOneAndUpdate(
                { userId },
                req.body,
                { runValidators: true, new: true }
            )
        } else {
            recommendation = await Recommendation.create(req.body)
        }

        res.status(201).json(recommendation)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getUsersToRecommend = async (req, res) => {
    const { price, ram, storage, core } = req.query

    try {
        const usersToRecommend = await Recommendation.find({
            $or: getPriceRange(price),
            core,
            storage,
            ram
        }).select("userId")

        //send response
        res.status(201).json(usersToRecommend)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const userExists = async (req, res) => {
    const userId = req.params.userId
    try {
        const user = await Recommendation.findOne({ userId })
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const setSoldout = async (req, res) => {
    try {
        const id = req.params.id;

        const product = await Laptop.findById(id)

        const updatedItem = await Laptop.findByIdAndUpdate(id, { inStock: !product.inStock }, {
            new: true, // Return the updated document
        });

        if (!updatedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }

        return res.status(200).json(updatedItem);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateValue = async (req, res) => {
    try {
        const messageId = req.params.messageId;
        const updatedItem = await Laptop.findOneAndUpdate({messageId},  req.body , {
            new: true, // Return the updated document
        });

        if (!updatedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }

        return res.status(200).json(updatedItem);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    try {
        const response = await Laptop.deleteOne({ messageId: id })
        if (response.deletedCount === 0) {
            throw Error("Product not found")
        }
        res.status(202).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const searchProduct = async (req, res) => {
    try {
        const { key } = req.params

        const laptops = await Laptop.find(
            {
                "$or": [
                    { name: { $regex: key } },
                    { add_desc: { $regex: key } },
                    { caption: { $regex: key } }
                ]
            }
        );
        return res.status(200).json(laptops);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function d(req, res) {
    const r = await Laptop.deleteMany({})
    console.log(r)
}

module.exports = {
    addLaptop,
    getLaptops,
    getLaptop,
    getCaption,
    getFilteredProducts,
    userExists,
    getSimilarProducts,
    addRecommendation,
    getUsersToRecommend,
    setSoldout,
    searchProduct,
    deleteProduct,
    updateValue,
    d
}