const validator = require("validator")

exports.checkEmpty = (config) => {
    let isError = false
    const error = []
    for (const key in config) {
        if (validator.isEmpty(config[key] ? toString(config[key]) : "")) 
        {
            isError = true
            error.push(`${key} is missing`)
        }
    }
    return { isError, error }
}

