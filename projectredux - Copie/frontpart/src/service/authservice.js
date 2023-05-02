const logout=()=>{
    return localStorage.removeItem('user')
}
const getCurrentUser=()=>{
    return JSON.parse(localStorage.getItem('user'))
}
const upDateNewAccessTokenAndRefreshToken=(refreshTokens)=>{
 
    let user=JSON.parse(localStorage.getItem('user'))
   
     user.refreshToken=refreshTokens
     localStorage.setItem("user",JSON.stringify(user))
}
const getUser=()=>{
    return JSON.parse(localStorage.getItem('user'))
}
const setUser=(user)=>{
    return localStorage.setItem('user',JSON.stringify(user))
}
const AuthService={
    logout,getCurrentUser,upDateNewAccessTokenAndRefreshToken,getUser,setUser
}
export default AuthService