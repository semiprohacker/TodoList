// for a single function in a module u can make module.export = funcn name but in case of may funcion its like this show below   amd since most modules jave various functions this is the default wa of doing it.
//module.export can be replaced jst by export cause its a shortcut for exporting modules since its done so frequently.
exports.getDate =  function (){    

    const date = new Date()

    const options = {weekday:"long",day:"2-digit",month:"long",year:"numeric"};
    return (date.toLocaleDateString("en-us",options)) ;

    

}
