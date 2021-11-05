import createHttpError from "http-errors"

export const HostOnly = async (req, res, next) => {
    if(req.author.role === "Admin"){
        next() 
    }else{
        next(createHttpError(403, "Host only :["))
    }
}