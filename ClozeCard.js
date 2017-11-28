module.exports.ClozeCard = function ClozeCard(text, cloze){
    if (!(this instanceof ClozeCard)){
        return new ClozeCard(text,cloze);
    }
    if (!text.includes(cloze)){
        throw "Error: cloze does not appear in input text";
    }
    else{
        this.cloze = cloze;
        this.fullText = text
        this.partial = text.replace(cloze, "...");

    }
    
}

