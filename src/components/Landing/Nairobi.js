import React from "react";
import "../css/styles.css";

const Nairobi = () => {
  return (
    <div>
      <main>
        <div className="price-list">
          <table>
            <thead>
            <tr>
              <th>#</th>
              <th>Company</th>
              <th>Diesel</th>
              <th>Petrol</th>
              <th>Kerosene</th>
              <th>Ido</th>
              <th>Fuel Oil</th>
              <th>Lpg</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>1</td>
              <td>Vivo Energy</td>
              <td>100.00</td>
              <td>100.00</td>
              <td>100.00</td>
              <td>100.00</td>
              <td>100.00</td>
              <td>100.00</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Total Kenya</td>
              <td>100.00</td>
              <td>100.00</td>
              <td>100.00</td>
              <td>100.00</td>
              <td>100.00</td>
              <td>100.00</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Kenol Kobil</td>
              <td>100.00</td>
              <td>100.00</td>
              <td>100.00</td>
              <td>100.00</td>
              <td>100.00</td>
              <td>100.00</td>
            </tr>
            </tbody>
          </table>
        </div>
      </main>

      <footer className="footer-register">
        <span>Beipro &copy;2018</span>
      </footer>
    </div>
  );
};
export default Nairobi;
