import React from 'react'
import { Outlet, useSearchParams } from 'react-router-dom';
import { getInvoices } from '../data.js'

import QueryNavLink from '../components/QueryNavLink.js'; 


const Invoices = () => {
  let invoices = getInvoices();
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <div style={{ display: "flex" }}>
      <nav style={{ font: "18px normal", borderRight: "1px solid black", borderBottom: "1px solid black", padding: "1rem", color: '#764abd' }}>
        <input
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
        {
          invoices
          .filter((invoice) => {
            let filter = searchParams.get("filter");
            if (!filter) return true;
            let name = invoice.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((invoice, index) => (
            <QueryNavLink
              style={({ isActive }) => { return { display: "block", margin: "1rem", color: isActive ? '#f0aa' : 'inherit', textDecoration: 'none' } }}
              to={`/invoices/${invoice.number}`}
              key={`${invoice.number}`}
            >
              {`${invoice.name}`}
            </QueryNavLink>
          ))}
      </nav>
      <Outlet />
    </div >
  )
}

export default Invoices