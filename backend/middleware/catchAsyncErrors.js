//this fuction or file is used for async error handling such as if someone doesnt write the field which is required then server gets crash to be aware of the error is occured due to required feild is not given we made this handler

module.exports = (theFunc)=>(req,res,next)=>{
    Promise.resolve(theFunc(req,res,next)).catch(next)
}

//hya made Promise hi node chi prebuild class anhe jya made to ek function gheto ani mg tya function la to resolve krto mhanje to tyache solution ani output deto ani te resolve jr hot nasen tr mg error throw karto by catch method of Promise prebuild class ,ata jithe jithe cathasynerrors jhale ahe product router made ta made the func =getallproduct ahe ani tya getallproduct cha end la catch lavle ahe but the cath ethe lihile ahe tithe fakt catch async errors pass kele ahe