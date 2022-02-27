// Nav 바 -> 1차 완성
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navigation({username, address}) {
  const navigate = useNavigate();

  const moving = (here) => {
    navigate('/' + here);
  }

  return (
    <div className="Navigation">
    <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand onClick={() => moving('forum')}>MangoBeer🥭</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link  onClick={() => moving('forum')}>Forum</Nav.Link>
                <Nav.Link  onClick={() => moving('token')}>Token</Nav.Link>
                <Nav.Link  onClick={() => moving('nft')}>NFT</Nav.Link>
                <NavDropdown title="MY" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => moving('mypage')}>MyPage</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/" >Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    </div>
  );
}

export default Navigation;
