import { useContext, useEffect } from "react";
import { CountdownContainer, Separator } from "./styles";
import { CyclesContext } from "../..";
import { differenceInSeconds } from "date-fns";

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    handleSecondsPassed,
  } = useContext(CyclesContext);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0; // tempo em minutos convertido para segundos
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0; // segundo atual
  const minutesAmount = Math.floor(currentSeconds / 60); // quantos minutos tem dentro do segundo atual
  const secondsAmount = currentSeconds % 60; //quantos segundo tem no restante da divisão acima, os segundos que não fecharam um minuto
  const minutes = String(minutesAmount).padStart(2, "0"); //adiciona o "0" no restante dos minutos (09:00)
  const seconds = String(secondsAmount).padStart(2, "0"); //adiciona o "0" no restante dos segundos (00:09)

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [activeCycle, minutes, seconds]);

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle?.startDate
        );

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished();
          handleSecondsPassed(totalSeconds);
          clearInterval(interval);
          // setActiveCycleId(null);
        } else {
          handleSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    activeCycle,
    activeCycleId,
    totalSeconds,
    markCurrentCycleAsFinished,
    handleSecondsPassed,
  ]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>

      <Separator>:</Separator>

      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}
