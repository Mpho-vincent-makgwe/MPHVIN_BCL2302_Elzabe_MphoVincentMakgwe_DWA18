// import { useState } from 'react';
import { supabase } from '../Services/Supabase';
import { Auth } from "@supabase/auth-ui-react"
import {ThemeSupa} from "@supabase/auth-ui-shared"
import { backdropClasses } from '@mui/material';

const AuthForm = ()=>{
    return (
    <Auth 
    style={backdropClasses}
        supabaseClient={supabase}
        view="sign_in"
        appearance={{ theme: ThemeSupa }}
        theme="dark"
        showLinks={true}
        providers={['google', 'github', 'facebook', ]}
        redirectTo="http://http://localhost:5173/"
      />
    )
}

export default AuthForm;