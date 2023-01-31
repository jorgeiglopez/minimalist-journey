export default function Image({ src, caption }) {
    return <img className="w-full object-cover" src={src} alt={caption} style={{height: "600px"}}/>;
}
