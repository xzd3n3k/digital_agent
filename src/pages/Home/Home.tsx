import './Home.scss';
import React from "react";
import {Heading} from "../../components";

export default function Home() {
    console.log("\n\n{\\__/}\n" +
        "( • - •)\n" +
        "💶< \\  u want this money? spend it wisely though okay, good");
    console.log("\n\n{\\__/}\n" +
        "( • .•)\n" +
        "/ >💶 alright here");
    console.log("\n\n{\\__/}\n" +
        "( o .o)  💸\n" +
        "/ > >");
    console.log("\n\n{\\__/}\n" +
        "( ò .ó)\n" +
        "/ > >  the fuck did I just say-");

    return (
        <div className="home-container">
            <Heading>Solving problems. Thousands at a time</Heading>
        </div>
    )
}
