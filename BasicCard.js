console.log("Basic was Exported");

module.exports.BasicCard = function BasicCard(front,back){
    if (!(this instanceof BasicCard)){
        return new BasicCard(front,back);
    }
    this.front = front;
    this.back = back;
};