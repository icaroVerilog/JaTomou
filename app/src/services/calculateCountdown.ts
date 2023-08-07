export default class CalculateCountdown {
    execute(data1:any, data2:any) {
        // Convertendo as datas para timestamps em milissegundos
        const timestampData1 = data1.getTime();
        const timestampData2 = data2.getTime();

        if (timestampData2 < timestampData1){
            console.log("a")
        }


        // Calculando a diferença em milissegundos
        const diferencaEmMilissegundos = timestampData2 - timestampData1;

        // Convertendo a diferença em milissegundos para horas e minutos
        const umMinutoEmMilissegundos = 60 * 1000;
        const umaHoraEmMilissegundos = 60 * umMinutoEmMilissegundos;

        const diferencaEmHoras = Math.floor(diferencaEmMilissegundos / umaHoraEmMilissegundos);
        const diferencaEmMinutos = Math.floor((diferencaEmMilissegundos % umaHoraEmMilissegundos) / umMinutoEmMilissegundos);

        var formatedDifference = ""

        if (diferencaEmHoras < 10 && diferencaEmMinutos < 10) {
            formatedDifference = `0${diferencaEmHoras}:0${diferencaEmMinutos}`
        }
        else if (diferencaEmHoras >= 10 && diferencaEmMinutos < 10) {
            formatedDifference = `${diferencaEmHoras}:0${diferencaEmMinutos}`
        }
        else if (diferencaEmHoras < 10 && diferencaEmMinutos >= 10) {
            formatedDifference = `0${diferencaEmHoras}:${diferencaEmMinutos}`
        }
        else {
            formatedDifference = `${diferencaEmHoras}:${diferencaEmMinutos}`
        }

        return formatedDifference
    }
}