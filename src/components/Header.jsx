
import '../styles/NavBar.css'
import { VscAccount, VscBroadcast } from "react-icons/vsc";
import { AppBar } from '@mui/material';
import Preview from './Previews'
import {
  MDBBtn,
} from 'mdb-react-ui-kit';




const Header =  () => {
    return(
      <main>
      <header className='header1'>
        <nav >
          < >
              <h1 className='mb-3'>{<VscBroadcast/>}Podcast and chill</h1>
              
<div className='p-5 text-center bg-light'>
<MDBBtn tag="a" outline size="lg">
<VscAccount/>
</MDBBtn>
</div></>
</nav>
</header></main>
)
}

export default Header;