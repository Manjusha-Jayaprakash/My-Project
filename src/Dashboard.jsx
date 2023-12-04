import { Container,Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ImCart} from "react-icons/im";
import { FaRegCreditCard } from "react-icons/fa";
import { GoPersonFill } from "react-icons/go";
import { TiGroup} from "react-icons/ti";
import { MdOutlineNavigateNext } from "react-icons/md";

export const Dashboard = ()=>{
    
    return(
        <Container className="Dashboard">
         <Container className="Dashboard-Home">Dashboard<p className="Dashboard-Home-Content"><Link to="/admin-login/dashboard">Home</Link><MdOutlineNavigateNext/><Link to="/admin-login/dashboard">Dashboard</Link></p>
         <Button className="Settings" ><i class="bi bi-gear-fill"></i></Button>
         </Container>
         <Container className="Dashboard-Topdivs">
            <Container className="fourdivs">
                <Container className="fourdivtop"> <p className="Total-Orders">TOTAL ORDERS</p>
                <p className="zero">0%</p>
                </Container>
                <Container className="fourdivcenter">
            <ImCart/><h5 className="numbers" style={{marginLeft:"60%"}}>381</h5>
                </Container>
                <Container className="fourdivbottom">View more...</Container>
            </Container>
            <Container className="fourdivs">
            <Container className="fourdivtop"><p className="Total-Sales">TOTAL SALES</p>
            <p className="zero">0%</p>
                </Container>
            <Container className="fourdivcenter">
                <FaRegCreditCard/><h5 className="numbers" style={{marginLeft:"45%"} }>98.2K</h5>
            </Container>
            <Container className="fourdivbottom">View more...</Container>
            </Container>
            <Container className="fourdivs">
            <Container className="fourdivtop"><p className="Total-Customers">TOTAL CUSTOMERS</p>
            <p className="zero">0%</p>
                </Container>
            <Container className="fourdivcenter">
<GoPersonFill/><h5 className="numbers" style={{marginLeft:"60%"} }>815</h5>

            </Container>
            <Container className="fourdivbottom">View more...</Container>
            </Container>
            <Container className="fourdivs">
            <Container className="fourdivtop"><p className="People-Online">PEOPLE ONLINE</p>
            <p className="zero">0%</p>
                </Container>
            <Container className="fourdivcenter"><TiGroup/><h5 className="numbers" style={{marginLeft:"80%"}}>0</h5></Container>
            <Container className="fourdivbottom">View more...</Container>
            </Container>
         </Container>
        </Container>
    );
};