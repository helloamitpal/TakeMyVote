const synthesizeQuestionDetails = (data) => {
    const obj = {};

    if (!data || Object.keys(data).length === 0) {
        return obj;
    }
    const { choices, ...rest } = data;
    const votes = choices.map(({ votes }) => (votes));
    const totalVotes = votes.reduce((total, val) => (total+(val || 0)));
    const choicesArr = [];

    choices.forEach(({ votes, ...restChoice }) => {
        choicesArr.push({
            ...restChoice,
            votes,
            votePercentage: Math.round((votes/totalVotes) * 100)
        });
    });

    Object.assign(obj, {
        ...rest,
        choices: choicesArr
    });

    return obj;
};

export { synthesizeQuestionDetails };
