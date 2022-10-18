const getHot = (response) => {

    return response.items.item.map(e=>processHotItem(e))

}

const processHotItem = (hotItem) => {
    return {
        id: hotItem.$.id,
        rank: parseInt(hotItem.$.rank),
        thumbnail: hotItem.thumbnail[0].$.value,
        name: hotItem.name[0].$.value,
        yearPublished: parseInt(hotItem.yearpublished[0].$.value)
    }
}

module.exports = {getHot}