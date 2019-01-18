module.exports = async function parentChildReveal(masterArray, hiddenQuestionsArray) {
    let revealedByArray = []
    const hiddenQuestionMap = await hiddenQuestionsArray.map((hiddenQuestion) =>{
        const revealed = hiddenQuestion.revealed;
        const revealedBy = revealed.split('.answers').map(el => el.split('.answer')).filter((el, index) => index !== 0).map(str => str[0]).join('').split("'")[1]
        revealedByArray.push(revealedBy);
        return { ...hiddenQuestion, revealedBy }
    })
    const noDuplicateRevealed = await Array.from(new Set(revealedByArray));
    revealedByArray = [];
    const parentChildRevealArray = await noDuplicateRevealed.map((id) =>{
        const type = masterArray.find((parent) => id === parent.id).type;
        const children = hiddenQuestionMap.filter((question) => id === question.revealedBy);
        return { id, type, children }
    })
    return parentChildRevealArray
}


