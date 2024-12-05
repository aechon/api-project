import { useState } from "react";

function CreateTimeAppPage() {

  const [minutes, setMinutes] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const time = JSON.parse(end.split(':')[0]-start.split(':')[0])*60 + JSON.parse(end.split(':')[1]-start.split(':')[1]);
    setMinutes(time);
    console.log(start);
    console.log(end);
  }

  return (
    <>
        <h1 className='timeapp'>Get minutes between:</h1>
        <form onSubmit={handleSubmit}>
            <input type="time" onChange={(e) => setStart(e.target.value)}></input>
            <input type="time" onChange={(e) => setEnd(e.target.value)}></input>
            <button>calculate!</button>
        </form>
        <p>{minutes} minutes.</p>
    </>
  );
}

export default CreateTimeAppPage;