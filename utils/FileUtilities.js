

module.exports.getDateAsName = function(name, name2){
    let recommendedName = Date();
    if(name2){
        recommendedName += " " + name2.replace("/","-");
    }
    if(name){
        recommendedName += " " + name;
    }
    return recommendedName;
}