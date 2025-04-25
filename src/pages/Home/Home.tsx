import './Home.scss';
import React from "react";
import {Heading, StatsShowcase} from "../../components";

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
            <span>It is a long <b>established fact that a reader</b> will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal <b>distribution of letters</b>, as opposed to using 'Content here, content here', making it look like readable English.</span>
            <StatsShowcase stats={
                [
                    { icon: "CoinsIcon", text: "Reduce costs by 40%." },
                    {icon: "ChartLineUpIcon", text: "Increase customer satisfaction by 30%."},
                    {icon: "ShieldCheckIcon", text: "Trusted by those you know."}
                ]
            }></StatsShowcase>
        </div>
    )
}
