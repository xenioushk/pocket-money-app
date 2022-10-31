import React from "react"

function Page(props) {
  // useEffect(() => {
  //   document.title = props.title + " | Pocket Money Web Application"
  //   window.scroll(0, 0)
  // }, [])

  return <>{props.children}</>
}

export default Page
