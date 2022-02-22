// Nav 바 -> 1차 완성
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navigation() {
  return (
    <div className="Navigation">
    <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="forum">MangoBeer🥭</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="forum">Forum</Nav.Link>
                <Nav.Link href="token">Token</Nav.Link>
                <Nav.Link href="nft">NFT</Nav.Link>
                <NavDropdown title="MY" id="basic-nav-dropdown">
                <NavDropdown.Item href="mypage">MyPage</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/">Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    </div>
  );
}

export default Navigation;
