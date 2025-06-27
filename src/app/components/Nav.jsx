import { faHome, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="flex justify-center bg-nav p-4 text-white/70">
      <div className="flex items-center gap-6">
        <Link href="/">
          <FontAwesomeIcon icon={faHome} className="icon mx-2" /> Home
        </Link>
        <Link href="/TicketPage/new">
          <FontAwesomeIcon icon={faTicket} className="icon mx-2" />
          Create New Ticket
        </Link>
      </div>
      
    </nav>
  );
};

export default Nav;
