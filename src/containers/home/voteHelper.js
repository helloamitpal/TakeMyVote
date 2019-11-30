const synthesizeData = (list) => {
    const arr = [];

    list.forEach(({ choices, ...rest }) => {
        const votes = choices.map(({ votes }) => (votes));
        const totalVotes = votes.reduce((total, val) => (total+(val || 0)));
        const choicesArr = [];
        choices.forEach(({ votes, ...restChoice }) => {
            choicesArr.push({
                ...restChoice,
                votes,
                votePercentage: Math.ceil((votes/totalVotes) * 100)
            });
        });

        arr.push({
            ...rest,
            choices: choicesArr
        });
    });

    return arr;
};

export { synthesizeData };
