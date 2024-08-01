const bionicConvertor = (inputText)=> {
    return inputText.split(' ').map(word => {
        const midPoint = Math.ceil(word.length/2);
        const firstHalf = word.substring(0, midPoint);
        const secondHalf = word.substring(midPoint);
        
        return `<b>${firstHalf}</b>${secondHalf}`;
    }).join(' ');
}

export default bionicConvertor