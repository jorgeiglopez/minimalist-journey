export default function Image({post: { imageUrl, caption }}) {
    return <img
        className="w-full object-cover"
        src={imageUrl}
        alt={caption}
        style={{height: "600px"}}
    />;
}
