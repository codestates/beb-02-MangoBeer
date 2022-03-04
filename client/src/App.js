import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Navigation from './components/nav';
import Forum from './pages/forum';
import TransferToken from './pages/transferToken';
import TransferNft from './pages/transferNft';
import MyPage from './pages/myPage';
import Login from './pages/login';
import WriteContents from './pages/writeContents';
import CreateNFT from './pages/createNft';
import ViewContents from './pages/viewContents';
import ServerPage from './pages/serverPage';

function App() {
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");

  return (
    <BrowserRouter>
    <div className="App">
      <Navigation username={username} address={address} />
        <Routes>
          <Route exact path="/" element={<Login username={username} setUsername={setUsername} address={address} setAddress={setAddress} />} />
          <Route exact path="/forum" element={<Forum username={username} address={address} />} />
          <Route exact path="/token" element={<TransferToken username={username} address={address}/>} />
          <Route exact path="/nft" element={<TransferNft username={username} address={address}/>} />
          {  username === 'server'?
          <Route exact path='/mypage' element={<ServerPage username={username} address={address}/>} />
          :
          <Route exact path='/mypage' element={<MyPage username={username} address={address}/>} />
          }
          <Route exact path='/writeContents' element={<WriteContents username={username} address={address}/>} />
          <Route exact path='/mintNft' element={<CreateNFT username={username} address={address} />} />
          <Route exact path='/viewContents' element={<ViewContents username={username} address={address} />} />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
