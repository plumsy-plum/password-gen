import { useCallback, useEffect, useRef, useState } from "react"



function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPaassword] = useState("")
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += '0123456789'
    if(charAllowed) str += "!@#$%^&*()[{}_+-"

    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPaassword(pass)

  },[length, numberAllowed, charAllowed, setPaassword])

  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])



  useEffect(() => {
    passwordGenerator()
  },[length, numberAllowed, charAllowed,passwordGenerator])


  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg
     px-4 py-3 my-8 bg-gray-800 text-center ">
      <h1 className="text-white text-center my-3">Password
         generator</h1>
      <div className="flex shadow rounded-lg
       overflow-hidden mb-4 text-orange-600">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3  bg-white"
          placeholder="password"
          readOnly
          ref={passwordRef}
        />
        <button onClick={copyPassword} className="outline-none bg-blue-700 text-white
        px-3 py-0.5 shrink-0    
             transition duration-200 ease-in-out 
             hover:scale-110 hover:bg-indigo-500 
             active:scale-95">copy</button>
          
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label className="text-orange-600">Lenght: {length}</label>
            <div className="flex items-center gap-x-1 mx-1 text-orange-600">
              <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberCheck"
              onChange={() => 
                setNumberAllowed((prev) => !prev)
              }
              />
              <label htmlFor="numberCheck">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1 text-orange-600">
              <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterCheck"
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
              />
              <label htmlFor="characterCheck">characters</label>
            </div>
          </div>
        </div>
        </div>
    </>
  )
}

export default App
