const getSearch = (response, options) => {
    let search = {}

    search.totalItems = parseInt(response.items.$.total)
    search.results = response.items.item.map(e=>processSearchItem(e))

    return search
}

const processSearchItem = (searchItem) => {
    return {
        id: searchItem.$.id,
        type: searchItem.$.type,
        name: searchItem.name[0].$.value,
        yearPublished: parseInt(searchItem.yearpublished[0].$.value)
    }
}

module.exports = {getSearch}