import { NavLink, useLocation } from "react-router-dom";

const QueryNavLink = ({ to, ...props })  => {
  let location = useLocation();
  console.log(location);
  return <NavLink to={to + location.search} {...props} />;
}

export default QueryNavLink