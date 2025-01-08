export default function MetaData({title, value} : {title : String, value: String}){
    return <div className="metadata">
        <h3>{title} : </h3>
        <p> {value}</p>
    </div>   
}