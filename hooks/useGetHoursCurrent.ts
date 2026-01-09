// import { useState, useEffect } from 'react';
import dayjs from "dayjs";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";


export function useGetHoursCurrent() {
    let saludo = ''; 
    dayjs.extend(utc);
    dayjs.extend(timezone);
    // Para que todas las instancias de dayjs usen la zona horaria local por defecto
    // Intenta poner tu zona horaria específica aquí para probar
    const MI_ZONA = "America/Santiago"; // o "America/Argentina/Buenos_Aires"

    const horaActual = dayjs().tz(MI_ZONA).hour();
    if (horaActual >= 6 && horaActual < 12) {
		saludo = "Buenos días";
	} else if (horaActual >= 12 && horaActual < 19) {
		saludo = "Buenas tardes";
	} else {
		saludo = "Buenas noches";
	}

    return {horaActual, saludo};
}