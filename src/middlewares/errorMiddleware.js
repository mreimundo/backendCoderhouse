const HTTP_STATUS = require("../constants/apiConstants.js")
const { apiErrorResponse } = require("../utils/apiUtils.js")

const errorMiddleware = (error, req, res, next) => {
    const response = apiErrorResponse(error.description || error.message, error.details || error);
    return res.status(error.status || HTTP_STATUS.SERVER_ERROR).json(response);
};

module.exports = errorMiddleware