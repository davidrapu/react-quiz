import { useEffect } from "react";


export default function Timer({dispatch, state}){
    const time = `${(Math.floor(state.secondsRemaining / 60)).toString().padStart(2,"0")}:${(state.secondsRemaining % 60).toString().padStart(2, "0" )}`
    useEffect(() => {
        const timer = setInterval(() => {
            if (state.secondsRemaining <= 0){
                dispatch({type: 'setStatus', payload: 'finish'})
            }else{
                dispatch({type: 'reduceTimer'})
            }
        }, 1000)

        return () => {
            clearInterval(timer)
        }
    })
    return (
      <p>
        {time}
      </p>
    );
}