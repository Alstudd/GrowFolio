// react-router-dom imports
import { Form, NavLink } from "react-router-dom";

// library imports
import { TrashIcon } from "@heroicons/react/24/solid";

function Navbar({ userName }) {
  return (
    <nav>
      <NavLink to="/" aria-label="home">
      <img src="/growfolio-lightmode.png" alt="logo" width={40} className="rounded-md" />
      <span className="text-3xl">GrowFolio</span>
      </NavLink>
      {userName && (
        <Form
          method="post"
          action="logout"
          onSubmit={(event) => {
            if (!confirm("Delete User and all data?")) {
              event.preventDefault();
            }
          }}
        >
          <button type="submit" className="bg-[#00b386]">
            <span>Delete User</span>
            <TrashIcon width={20} height={20} />
          </button>
        </Form>
      )}
    </nav>
  );
}

export default Navbar;
