"use strict";
// Middleware: Filter Search Sort Pagination

module.exports = async (req, res, next) => {

    //^ FILTER
    const filter = req.query?.filter || {};

    //^ SEARCH
    const search = req.query?.search || '';
    let searchQuery = [];
    if(search){
        searchQuery.$or = [
            {
                title: {
                    $regex: search,
                    $options: 'i'
                }
            },
            {
                content: {
                    $regex: search,
                    $options: 'i'
                }
            }
        ]
    }

    //^ SORTING
    const sort = req.query?.sort || {};

    //^ PAGINATION
    //? LIMIT
    let limit = Number(req.query?.limit);
    limit = limit > 0 ? limit : Number(process.env?.PAGE_SIZE) || 20;
    //? PAGE
    let page = Number(req.query?.page);
    page = page > 0 ? page : 1;
    //? SKIP
    let skip = Number(req.query?.skip)
    skip = skip > 0 ? skip : ((page - 1) * limit);

    res.getModelList = async function (Model, populate = null) {

        // return await Model.find({ ...filter, ...search }).sort(sort).limit(limit).skip(skip).populate(populate)
        return await Model.find({ ...filter, ...searchQuery }).sort(sort).limit(limit).skip(skip).populate(populate)

    }
    
    res.getModelListDetails = async function (Model) {
        // const data = await Model.find({...filter, ...search});
        const data = await Model.find({...filter, ...searchQuery});
        
        let details = {
            filter,
            searchQuery,
            sort,
            skip,
            limit,
            page,
            pages: {
                previous: (page > 1 ? page - 1: false),
                current: page,
                next: (page + 1),
                total: Math.ceil(data.length / limit)
            },
            totalRecords: data.length
        }
        if(details.pages.next > details.pages.total){
            details.pages.next = false;
        }

        if (details.totalRecords <= limit) details.pages = false;

        return details;
    }

    next();
}