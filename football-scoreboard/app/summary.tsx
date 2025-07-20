import { Dispatch, SetStateAction } from "react";
import { View } from "./page";
import { Score } from "./interfaces/score.interface";

export default function Summary(props:{setView:Dispatch<SetStateAction<View>>, allMatches:Score[]}){
    const {allMatches, setView} = props
    return <>
        <ul data-testId="scoreList">
            {allMatches.map((el)=>{return <li>{el.homeTeam} {el.homeGoal} - {el.awayTeam} {el.awayGoal}</li>})}
        </ul>
        <button onClick={()=>{setView(View.startMatch)}}>Return from summary</button>
    </>
}