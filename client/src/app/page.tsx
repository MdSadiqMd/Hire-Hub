import AuthenticationPage from "@/api/auth/page"

export default function Home() {
  const onSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();
    try{
     const res= await axios.post("/api/signup",{
      name:"arjun",
      email:"ejujsj@gmail.com",
      password:"ajjskshsj"
     })
     console.log(res)
    }catch(err){
      console.log(err)
    }
    }
  return (
  <>
    <AuthenticationPage />
  </>
  )
}
