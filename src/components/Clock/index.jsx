import "./Clock.css";
import { useEffect, useState } from 'react'



const Clock = () => {

    const [segundos, setSegundos] = new useState(0);
    const [minutos, setMinutos] = new useState(0); 

    useEffect(() =>{
        const intervaloSegundo = setInterval(() => {
        setSegundos(segundoAnterior => {
            if (segundoAnterior == 59){
                setMinutos(minutoAnterior => (minutoAnterior + 1) % 60);
                return 0;
            } else {
                return segundoAnterior + 1;
            }
        }
        )}, 1000);

        return () => clearInterval(intervaloSegundo)
    }, []);
    
    return(
        <div className="clock">
            <div id="minutos" className="rectangle">
                <p>{minutos}</p>
            </div>
            <div id="colon">
                <div className="circle"></div>
                <div className="circle"></div>
            </div> 
            <div id="segundos" className="rectangle">
                <p>{segundos}</p>
            </div>
        </div>
    );
};

export default Clock;