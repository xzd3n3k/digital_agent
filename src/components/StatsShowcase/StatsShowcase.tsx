import './StatsShowcase.scss';
import * as Icons from '../../icons';

type IconName = keyof typeof Icons;

interface StatItem {
    icon: IconName;
    text: string;
}

export default function StatsShowcase({stats}: {stats: StatItem[]}) {
    return (
        <div className="stats">
            {stats.map((stat, index) => {
                const IconComponent = Icons[stat.icon];

                return (
                    <div key={index} className="stat-item">
                        <IconComponent className="stat-icon" />
                        <span><b>{stat.text}</b></span>
                    </div>
                );
            })}
        </div>
    )
}
