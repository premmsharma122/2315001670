const getWeightValue = (categoryType) => {
    if (categoryType === 'Placement') return 3;
    if (categoryType === 'Result') return 2;
    if (categoryType === 'Event') return 1;
    return 0; 
};

const arrangeByPriorityAndDate = (rawEntries) => {
    if (!rawEntries || !Array.isArray(rawEntries)) return [];

    
    return [...rawEntries].sort((firstItem, secondItem) => {
        const scoreFirst = getWeightValue(firstItem.Type);
        const scoreSecond = getWeightValue(secondItem.Type);

       
        if (scoreFirst !== scoreSecond) {
            return scoreSecond - scoreFirst; 
        }

       
        return new Date(secondItem.Timestamp) - new Date(firstItem.Timestamp);
    });
};

module.exports = { arrangeByPriorityAndDate };