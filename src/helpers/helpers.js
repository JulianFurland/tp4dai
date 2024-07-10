class Helper {
    validarVaciosYMenorTresLetras = (str) => {
        let valido = false;
        if(str !== null && str !== undefined && str !== ""  && str.length >= 3)
        {
            valido = true;
        }
        return valido
    }

    validarMail = (mail) => {
        let valido = false;
        let regExp = /[\w._%+-]+@[\w.-]+\.[\w.]/
        if(mail.match(regExp))
        {
            valido = true;
        }
        return valido
    }

    validarFecha = (dateStr) => {
        let result = {
            success: false,
            date: undefined
        };
        let dateObj = new Date(dateStr);
        if (!isNaN(dateObj.getTime())) {
            result.success = true;
            result.date = dateObj;
        }
        return result;
    }

    strToInt = (str) => {
        let result = {
            success: false,
            intValue: undefined
        };
        let intValue = parseInt(str, 10);
    
        if (!isNaN(intValue) && Number.isFinite(intValue)) {
            result.success = true;
            result.intValue = intValue;
        }
        return result;
    }
}

export default Helper;