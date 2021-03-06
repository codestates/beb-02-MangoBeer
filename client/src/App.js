import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navigation from './components/nav';
import Forum from './pages/forum';
import TransferToken from './pages/transferToken';
import TransferNft from './pages/transferNft';
import MyPage from './pages/myPage';
import Login from './pages/login';
import WriteContents from './pages/writeContents';
import CreateNFT from './pages/createNft';
import ViewContents from './pages/viewContents';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navigation />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/forum" element={<Forum />} />
          <Route exact path="/token" element={<TransferToken />} />
          <Route exact path="/nft" element={<TransferNft />} />
          <Route exact path='/mypage' element={<MyPage />} />
          <Route exact path='/writeContents' element={<WriteContents />} />
          <Route exact path='/mintNft' element={<CreateNFT />} />
          <Route exact path='/viewContents' element={<ViewContents />} />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
