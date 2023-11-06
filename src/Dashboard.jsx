import { Container,Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ImCart} from "react-icons/im";
import { FaRegCreditCard } from "react-icons/fa";
import { GoPersonFill } from "react-icons/go";
import { TiGroup} from "react-icons/ti";

export const Dashboard = ()=>{
    
    return(
        <Container className="Dashboard">
         <Container className="Dtop">Dashboard<p className="Home"><Link to="/anotherpage">Home</Link><i class="bi bi-arrow-right"></i><Link to="/anotherpage">Dashboard</Link></p>
         <Button className="Settings" ><i class="bi bi-gear-fill"></i></Button>
         </Container>
         <Container className="Dtop2">
            <Container className="fourdivs">
                <Container className="fourdivtop"> <p>TOTAL ORDERS</p>
                <p className="zero">0%</p>
                </Container>
                <Container className="fourdivcenter">
            <ImCart/><h5 className="numbers">381</h5>
                </Container>
                <Container className="fourdivbottom"></Container>
            </Container>
            <Container className="fourdivs">
            <Container className="fourdivtop"><p>TOTAL SALES</p>
            <p className="zero">0%</p>
                </Container>
            <Container className="fourdivcenter">
                <FaRegCreditCard/><h5 className="numbers">98.2K</h5>
            </Container>
            <Container className="fourdivbottom"></Container>
            </Container>
            <Container className="fourdivs">
            <Container className="fourdivtop"><p>TOTAL CUSTOMERS</p>
            <p className="zero">0%</p>
                </Container>
            <Container className="fourdivcenter">
<GoPersonFill/><h5 className="numbers">815</h5>

            </Container>
            <Container className="fourdivbottom"></Container>
            </Container>
            <Container className="fourdivs">
            <Container className="fourdivtop"><p>PEOPLE ONLINE</p>
            <p className="zero">0%</p>
                </Container>
            <Container className="fourdivcenter"><TiGroup/><h5 className="numbers" style={{marginLeft:"150px"}}>0</h5></Container>
            <Container className="fourdivbottom"></Container>
            </Container>
         </Container>
        </Container>
    );
};