import { useState } from "react";

function App() {
  const [src, setSrc] = useState("");
  const [OCRText, setOCRText] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = async (e: any) => {
    const tempSrc = URL.createObjectURL(new File(e.target.files, "image"));
    setSrc(tempSrc || "");

    setLoading(true);

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("crossdomain", "true");
    const data = await (await (await fetch(tempSrc)).blob()).arrayBuffer();
    console.log("data :::: ", data);
    const body = JSON.stringify({ picture: tempSrc });
    const timeBeforeTranslate = Date.now();
    fetch("/api/translate", {
      body,
      headers,
      method: "post",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(
          `${Date.now() - timeBeforeTranslate}ms - Result ::: `,
          result
        );
        setOCRText(result.text);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="wrapper">
      <h1>TRANSLANG</h1>
      <div className="contentWrapper">
        <div className="inputImageWrapper">
          <h2>Select the image</h2>
          <p>Touch in the image to change this one</p>
          <input
            type="file"
            id="img-selector"
            className="img-selector"
            accept="image/x-png,image/gif,image/jpeg"
            onChange={onChange}
          />
          <label className="label-img-selector" htmlFor="img-selector">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                src ||
                "http://beepeers.com/assets/images/commerces/default-image.jpg"
              }
              alt="any-image"
            />
          </label>
        </div>
        <div className="translated">
          <h2>Translated text</h2>
          <p className="translated-text">{loading ? "Reading..." : OCRText || "nothing to show"}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
