import { Dispatch, SetStateAction, useState } from "react"
import { View } from "./page"
import { Score } from "./interfaces/score.interface"

export default function StartMatch(props:{setView:Dispatch<SetStateAction<View>>, setCurrentMatch:Dispatch<SetStateAction<Score|null>>}){
    const {setView, setCurrentMatch} = props
    const [homeTeam, setHomeTeam] = useState("")
    const [awayTeam, setAwayTeam] = useState("")

    return(<form>
      <label>Home Team</label>
      <input data-testid="homeTeamName" type="text" value={homeTeam} onChange={(e)=>{setHomeTeam(e.target.value)}}></input>
      <label>Away Team</label>
      <input data-testid="awayTeamName" type="text" value={awayTeam} onChange={(e)=>{setAwayTeam(e.target.value)}}></input>
      <button data-testid="startGame" disabled={!homeTeam || !awayTeam} onClick={(e)=> {
        e.preventDefault()
        setCurrentMatch({homeTeam, awayTeam,homeGoal:0, awayGoal:0 }as Score);
        setView(View.currentMatch)
        }}>Start Match</button>
        <button data-testid="viewSumarry" onClick={(e)=>{
            e.preventDefault()
            setView(View.summary)
        }}>Get Sumary</button>
    </form>)
}