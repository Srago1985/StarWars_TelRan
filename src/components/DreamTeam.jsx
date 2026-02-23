import Friend from "./Friend.jsx";
import {friends} from "../utils/constants.js";

const DreamTeam = () => {
    return (
        <section className="float-right w-1/2 border rounded-b-3xl grid grid-cols-3 gap-3">
            <h2 className="col-span-3 text-center text-2xl">Dream team</h2>
            {friends.map((friend, i) => <Friend friend={friend} key={friend} pos={i + 1}/>)}
        </section>
    )
}

export default DreamTeam;