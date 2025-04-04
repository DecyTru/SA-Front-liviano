import {POLITICAS_USO_URL, POLITICAS_PRIVACIDAD_URL, EMPRESAS_RELACIONADAS_URL} from "../libs/Constants.js";

export  function Footer() {
    return (
        <>
            <div id="footer" className="bg-[#2D6DF6] text-white py-5 text-center w-[100%] p-[300px]">
                <p className={'text-[10px]'}>Para resolver dudas, comentarios y sugerencias, comunícate a la línea de atención en Medellín al 604
                    4378888, en Bogotá al 601 4278888 y en Cali al 602 4378888; al 01 8000 51 8888 en el resto del país
                    o al #888 sin costo desde tu celular. Se recomienda ver esta página con Internet Explorer 10 (o
                    versiones superiores), Mozilla Firefox o Google Chrome a una resolución mínimo de 1024 x 768.
                    Copyright c 2014. SURA, una marca Suramericana. Todos los derechos reservados. Entiéndase
                    Suramericana como Administrador de Carteras Colectivas Suramericana S.A., Seguros Generales
                    Suramericana S.A. y Seguros de Vida Suramericana S.A.</p>
                <div className={"flex justify-center gap-5 mt-5 text-[10px]"}>
                    <a href={POLITICAS_USO_URL} target="_blank" rel="noreferrer" className={"hover:text-blue-200 underline"}>Políticas de uso y seguridad</a>
                    <div className={'w-0.5 h-3 bg-white'}></div>
                    <a href={POLITICAS_PRIVACIDAD_URL} target="_blank" rel="noreferrer" className={"hover:text-blue-200 underline"}>Políticas de Privacidad Ley de Datos Personales</a>
                    <div className={'w-0.5 h-3 bg-white'}></div>
                    <a href={EMPRESAS_RELACIONADAS_URL} className={"hover:text-blue-200 underline"}>Empresas Relacionadas</a>
                </div>
            </div>
        </>
    );
}


