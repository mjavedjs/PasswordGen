import { useCallback, useEffect, useRef} from "react";
import { useState } from "react"  
import { use } from "react"

function App(){
  const [length,setlength] = useState(10);
  const [num,setnum] = useState(false);
  const [char,setchar] = useState(false);
  const [password,setpassword]= useState('');

  const passwordRef = useRef(null);

  const PasswordGen =  useCallback(()=>{
     let password = "";
     let string = "ABC EFGHIJKLMNOPQRSTVWXYZabcdefghijkmnopqsuvwxyz";
     if(num){ string +='0123456789'};
      if(char){ string += '!@#%^&*-_+=~'}
    
      for(let i=1; i<length; i++){
         let char = Math.floor(Math.random() * string.length + 1);
          password += string.charAt(char);
          setpassword(password)
      }
  },[length,num,char,setpassword]);

  // callback end herer

  useEffect(()=>{
    PasswordGen()
  },[length,num,char,PasswordGen]);

const copyPassword = () => {
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0, 10)
   window.navigator.clipboard.writeText(password);
}
return(
  <>   
 <div className="w-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-2xl px-5 py-5 mt-20 max-w-2xl mx-auto shadow-lg">
  <h1 className="text-center text-3xl font-bold text-white mb-10 tracking-tight">
    🔐 Password Generator
  </h1> 

  <div className="bg-white max-w-md mx-auto shadow-xl rounded-xl px-6 py-5 flex items-center gap-4">
    <input
      type="text"
      value={password}
      className="flex-1 outline-none py-3 px-4 bg-gray-100 text-gray-800 rounded-lg text-lg font-medium tracking-wide"
      placeholder="Generated password"
      readOnly
      ref={passwordRef}
    />
    <button onClick={copyPassword}
      className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md active:scale-95">
      Copy
    </button>
  </div>

  <div className="flex flex-wrap justify-center gap-8 text-sm items-center mt-10">
    
    {/* Password Length Slider */}
    <div className="flex items-center gap-2">
      <label className="text-white font-semibold text-base">Length:</label>
      <input
        type="range"
        min={8}
        max={100}
        value={length}
        onChange={(e)=>{setlength(e.target.value)}}
        className="cursor-pointer w-44 accent-blue-500"
      />
      <span className="text-blue-400 font-bold text-lg">{length}</span>
    </div>

    {/* Include Numbers Checkbox */}
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={num}
        onChange={() => setnum((prev) => !prev)}
        className="accent-blue-600 w-4 h-4"
      />
      <label className="text-white font-medium">Include Numbers</label>
    </div>

    {/* Include Special Characters Checkbox */}
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={char}
        onChange={() => setchar((prev) => !prev)}
        className="accent-blue-600 w-4 h-4"
      />
      <label className="text-white font-medium">Include Symbols</label>
    </div>
  </div>
</div>


  </>
)
}
 
export default App



