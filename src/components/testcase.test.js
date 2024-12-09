import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Homepage from './FikaWelcome.js';
import Login from "./Login.js";
import Register from "./Register.js";
import JoinSpace from "./JoinSpace.js";
import NavBar from './NavBar.js';
import AccountPage from './AccountPage.js';
import EditSpaces from './EditSpaces.js';
// import Draw from './Draw.js';
import Gallery from './Gallery.js';
import EditArts from './EditArts.js';
import ViewArt from './ViewArt.js';

beforeAll(() => {
  // Mock sessionStorage before tests run
  sessionStorage.setItem("user", JSON.stringify({ userid: "12345", username: "testuser" }));
});

afterAll(() => {
  sessionStorage.clear();
});

test('renders welcome message', () => {
  render(
    <BrowserRouter>
      <Homepage />
      <Login />
      <Register />
      <JoinSpace />
      <NavBar />
      <AccountPage />
      <EditSpaces />
      {/* <Draw /> */}
      <Gallery />
      <EditArts />
      <ViewArt />
    </BrowserRouter>
  );

  // ทดสอบที่นี่
});