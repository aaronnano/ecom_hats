export const Circle = ({ color, className, value, size = 28 }) => {
    return (
        <div className={`flex justify-center items-center mr-3 bg-black text-white rounded-full`}
        style={{ backgroundColor: color, width: `${size}px`, height: `${size}px` }}>
            <div className={className}>{value}</div>
        </div>
    )
}