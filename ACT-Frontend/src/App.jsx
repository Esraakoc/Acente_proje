import { useSelector } from "react-redux"

function App() {

  const userInfo = useSelector((state) => state.user.userInfo[0]);

  return (
    <>
      Merhaba {userInfo.name}
    </>
  )
}

export default App