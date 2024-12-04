import React, { useState } from 'react'

const Login = () => {
    
  return (
    <div>
        <div>
            <h1>Admin Panel</h1>
            <form>
                <div>
                    <p>Email Address</p>
                    <input type="email" placeholder='your@gmail.com' required />
                </div>
                <div>
                    <p>Password </p>
                    <input type="password" placeholder='enter your Passwprd' required />
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login