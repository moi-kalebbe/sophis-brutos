export default function BrutoBadge({ children = "BRUTO" }: { children?: React.ReactNode }) {
    return (
        <span className="inline-block bg-gradient-to-r from-accent-gold/20 to-accent-gold/10 px-2 py-0.5 rounded-md font-bold text-accent-gold border border-accent-gold/30 shadow-sm">
            {children}
        </span>
    );
}
