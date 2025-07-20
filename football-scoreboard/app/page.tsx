"use client"
import { useState } from "react";
import { Score } from "./interfaces/score.interface";
import StartMatch from "./startMatch";
import CurrentMatch from "./currentMatch";
import Summary from "./summary";

export enum View{
  startMatch,
  currentMatch,
  summary
}

export default function Page() {
  const [currentView, setCurrentView] = useState<View>(View.startMatch)
  const [allMatches, setAllMatches] = useState<Score[]>([])

  const [currentMatch, setCurrentMatch] = useState<Score | null>(null)
  return <>
    {currentView == View.startMatch?
     <StartMatch setView={setCurrentView} setCurrentMatch={setCurrentMatch}/>
    :
      currentView == View.currentMatch? 
        <CurrentMatch setView={setCurrentView} allMatches={allMatches} setAllMatches={setAllMatches} setCurrentMatch={setCurrentMatch} currentMatch={currentMatch}/>
      :
      <Summary setView={setCurrentView} allMatches={allMatches}/>
    }
  </>
}
