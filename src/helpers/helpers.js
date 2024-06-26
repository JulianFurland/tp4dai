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

    validarMail = (mail) =>
    {
        let valido = false;
        let regExp = /[\w._%+-]+@[\w.-]+\.[\w.]/
        if(mail.match(regExp))
        {
            valido = true;
        }
        return valido
    }

}

export default Helper;