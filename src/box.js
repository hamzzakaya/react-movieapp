import "./box.css";

function Box({
  title,
  year,
  poster = "https://s3.cloud.ngn.com.tr/kitantik/images/2022-07-16/1br9qfyl5nunxlr1r0t.jpg",
}) {
  return (
    <div className="box">
      <img src={poster} />
      <span className="span1">{title.substring(0, 25)}...</span>
      <span className="span2">{year}</span>
    </div>
  );
}
export default Box;
