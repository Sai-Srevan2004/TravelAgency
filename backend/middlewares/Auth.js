module.exports = (req, res, next) => {
    try {
        const token = req.header("Authorization").split(" ")[1];

        if (token && token === `${process.env.ADMIN_TOKEN}`) {
            next(); // Proceed to the next middleware or controller
        } else {
            res.status(403).json({ error: "Unauthorized" });
        }
    } catch (error) {
        console.log(error.message)
    }
};
