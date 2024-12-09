"use strict";
/* -------------------------------------------------------
    EXPRESSJS - Query Handler 
------------------------------------------------------- */
// Middleware: Filter Search Sort Pagination

module.exports = async (req, res, next) => {

    //^ FILTERING - SEARCHING - SORTING - PAGINATION ^\\
    // console.log(req.query)

    //^ FILTERING
    // URL?filter[fieldName1]=value1&filter[field2]=value2
    //* id ler filter yapilir
    //! filter direk eşiti getirir
    const filter = req.query?.filter || {};


    //^ SEARCHING
    // URL?searc[fieldName1]=value1&search[field2]=value2
    //! contains icereni getirir
    // {title: 'test 5 title'} -> {title: {$regex: 'text 5 title', $options: 'i'}} -->> arama yapabilmek icin bu sekle ceviriyoruz search u 
    // options: i case sensitive no
    // const search = req.query?.search || {};
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
    // for (let key in search){
    //   search[key] = {$regex: search[key], $options: 'i'}
    // };

    // const search = Array.of(req.query?.search) || [];

    // const searchQuery = {
    //     $or: search.map(item =>  ({
    //                     title: {
    //                         $regex: item,
    //                         $options: 'i'
    //                     }
    //                 })).concat(search.map(item =>  ({
    //                     content: {
    //                         $regex: item,
    //                         $options: 'i'
    //                     }
    //                 })))
    // }

    //^ SORTING
    // URL?sort[fieldName1]=value1&sort[field2]=value2
    const sort = req.query?.sort || {};

    //^ PAGINATION
    // URL?page=value&limit=20
    //? LIMIT
    // limit sayisal degerler alir ama query den string gelebilir onu engellemek icin Number yapiyoruz
    let limit = Number(req.query?.limit);
    limit = limit > 0 ? limit : Number(process.env?.PAGE_SIZE) || 20;
    //? PAGE
    let page = Number(req.query?.page);
    page = page > 0 ? page : 1;
    //? SKIP
    let skip = Number(req.query?.skip)
    skip = skip > 0 ? skip : ((page - 1) * limit);

    // const data = await BlogPost.find().populate('categoryId');

    res.getModelList = async function (Model, populate = null) {

        // return await Model.find({ ...filter, ...search }).sort(sort).limit(limit).skip(skip).populate(populate)
        return await Model.find({ ...filter, ...searchQuery }).sort(sort).limit(limit).skip(skip).populate(populate)

    }
    
    //! bir cikti output verecegi icin res, filter search sort page limit lenmiş data

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