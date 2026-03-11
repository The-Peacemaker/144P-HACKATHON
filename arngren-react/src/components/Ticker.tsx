interface TickerProps {
    texts: string[]
}

export default function Ticker({ texts }: TickerProps) {
    const items = [...texts, ...texts, ...texts, ...texts, ...texts]

    return (
        <div className="ticker">
            <div className="ticker-track">
                {items.map((text, i) => (
                    <span className="ticker-item" key={i}>
                        {text}
                        <span style={{ color: 'var(--accent-color)', margin: '0 1rem' }}>/</span>
                    </span>
                ))}
            </div>
        </div>
    )
}
