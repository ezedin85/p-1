require('dotenv').config()

function requireAuth() {
    return async (req, res, next) => {

        const { authorization } = req.headers
        if (!authorization) return res.status(401).json({ error: 'authorization token required' })
        
        const token = authorization.split(' ')[1]

        try {
            if (token !== process.env.CUSTOM_TOKEN) throw Error('request is not authorized')
            next()
        } catch (err) {
            return res.status(401).json({ error: err.message })
        }
    }
}

module.exports = requireAuth