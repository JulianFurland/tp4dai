class Helper {
    validarVaciosYMenorTresLetras = (variable) =>
    {
        let valido = false;

        if(variable != null  && variable.length > 3)
        {
            valido = true;
        }
        return valido
    }

    validarSintaxis  = (variable) =>
    {
        let valido = false;
        let regExp = /[\w._%+-]+@[\w.-]+\.[\w.]/
        if(variable.match(regExp))
        {
            valido = true;
        }
        return valido
    }

}

export default Helper;