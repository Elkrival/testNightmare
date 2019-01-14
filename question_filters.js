module.exports = async function dynamicQuestionFilter(masterArray, type) {
    if(type === 'hidden') {
        let hidden = await masterArray.filter(el => el.hasOwnProperty('hidden') === true ? true : false);
        return hidden;
    }
    else {
        let typeFilter = await masterArray.filter(el =>el.type === type ? true : false);
        return typeFilter;
    }
}