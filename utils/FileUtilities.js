

module.exports.getDateAsName = function(name){
    let recommendedName = Date();
    if(name){
        recommendedName += name;
    }
    return recommendedName;
}