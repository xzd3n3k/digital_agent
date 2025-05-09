import './Home.scss';
import React from "react";
import { Heading, StatsShowcase } from "../../components";

export default function Home() {

    return (
        <div className="home-container">
            <div>
                <Heading>Solving problems. Thousands at a time</Heading>
                <span>
                    It is a long <b>established fact that a reader</b> will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal <b>distribution of letters</b>, as opposed to using 'Content here, content here', making it look like readable English.
                </span>
            </div>
            <StatsShowcase className="stats-showcase" stats={
                [
                    { icon: "CoinsIcon", text: "Reduce costs by 40%." },
                    { icon: "ChartLineUpIcon", text: "Increase customer satisfaction by 30%." },
                    { icon: "ShieldCheckIcon", text: "Trusted by those you know." }
                ]
            }></StatsShowcase>
        </div>
    )
}
