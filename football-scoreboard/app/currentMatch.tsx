import { Dispatch, SetStateAction, useState } from "react";
import { View } from "./page";
import { Score } from "./interfaces/score.interface";

function insertScore(score:Score, allScores:Score[]){
    let copied = [...allScores]
    for(let i= 0; i<copied.length; i++){
        if(copied[0].awayGoal + copied[0].homeGoal <= score.awayGoal+ score.homeGoal){
            copied = [
                ...copied.slice(0,i),
                score,
                ...copied.slice(i)
            ]
            return copied
        }
    }
    copied.push(score)
    return copied
}

export default function CurrentMatch(props:{setView:Dispatch<SetStateAction<View>>,allMatches:Score[] , setAllMatches:Dispatch<SetStateAction<Score[]>>, setCurrentMatch:Dispatch<SetStateAction<Score|null>>, currentMatch:Score|null}){
    

    const {setView, setAllMatches, setCurrentMatch, currentMatch, allMatches} = props;

    return <>
    {currentMatch &&<>
    <label data-testid="homeTeamName">{currentMatch.homeTeam}</label>
    <input  data-testid="homeTeamGoal" type="number" min={0} value={currentMatch.homeGoal} onChange={(e)=>{setCurrentMatch({...currentMatch,homeGoal:Number(e.target.value)})}}></input>
    <label data-testid="awayTeamName">{currentMatch.awayTeam}</label>
    <input  data-testid="awayTeamGoal" type="number" min={0} value={currentMatch.awayGoal} onChange={(e)=>{setCurrentMatch({...currentMatch,awayGoal:Number(e.target.value)})}}></input>
    <h1 data-testid="scoreLabel">{currentMatch.homeTeam}:{currentMatch.homeGoal} {currentMatch.awayTeam}:{currentMatch.awayGoal}</h1>
    <button data-testid="endMatch" onClick={() => {
        setView(View.startMatch)
        if(currentMatch){
            setAllMatches(insertScore(currentMatch,allMatches))
        }
        }}>End match</button>
        </>
    }</>
}