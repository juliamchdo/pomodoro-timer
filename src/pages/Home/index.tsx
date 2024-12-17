import { Play } from "phosphor-react";
import {
  CountdownButton,
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesInput,
  Separator,
  TaskInput,
} from "./styles";

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            type="text"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
          />

          <datalist id="task-suggestions">
            <option value="banana" />
            <option value="pera" />
            <option value="uva" />
            <option value="foqui" />
          </datalist>

          <label htmlFor="task">durante</label>
          <MinutesInput
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>

          <Separator>:</Separator>

          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <CountdownButton type="submit">
          <Play size={24} />
          Começar
        </CountdownButton>
      </form>
    </HomeContainer>
  );
}
