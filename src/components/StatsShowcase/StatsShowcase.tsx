import './StatsShowcase.scss';
import * as Icons from '../../icons';

type IconName = keyof typeof Icons;

interface StatItem {
    icon: IconName;
    text: string;
}

interface StatsShowcaseProps {
    stats: StatItem[];
    className?: string;
}

export default function StatsShowcase({ stats, className }: StatsShowcaseProps) {
    return (
        <div className={`stats ${className || ""}`}>
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
