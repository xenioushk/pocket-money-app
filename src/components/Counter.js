import { useState } from "react"

const Counter = () => {
  const [counter, setCounter] = useState(0)

  const onClick = (e) => {
    // alert("clicked")

    // console.log(e)
    var value = document.getElementById("counter").innerHTML
    // console.log(e.target.id)

    if (e.target.id === "like") {
      // value = parseInt(value) + 1
      // setCounter(value)

      setCounter((prev) => prev + 1)
    } else if (e.target.id === "dislike") {
      setCounter((prev) => (prev <= 0 ? 0 : prev - 1))

      // value = value <= 0 ? 0 : parseInt(value) - 1
      // setCounter(value)
    }
  }

  return (
    <div>
      <h2>Simple Counter</h2>
      <div id="counter">{counter}</div>
      <button onClick={onClick} id="like">
        Like
      </button>
      <button onClick={onClick} id="dislike">
        Dislike
      </button>
    </div>
  )
}

export default Counter
