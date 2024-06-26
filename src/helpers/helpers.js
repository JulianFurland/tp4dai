class Helper {
    validarVaciosYMenorTresLetras = (str) =>
    {
        let valido = false;

        if(str !== null && str !== undefined && str !== ""  && str.length >= 3)
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