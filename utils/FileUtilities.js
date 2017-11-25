

module.exports.getDateAsName = function(name, name2){
    let recommendedName = Date();
    if(name){
        recommendedName += " " + name;
    }
    if(name2){
        recommendedName += " " + name2.replace("/","-");
    }
    return recommendedName;
}