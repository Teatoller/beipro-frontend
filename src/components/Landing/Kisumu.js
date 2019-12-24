import React from "react";
import "../css/styles.css";

const Kisumu = () => {
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
              <td>105.00</td>
              <td>112.00</td>
              <td>108.00</td>
              <td>50.00</td>
              <td>100.00</td>
              <td>100.00</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Total Kenya</td>
              <td>000.00</td>
              <td>000.00</td>
              <td>110.00</td>
              <td>58.00</td>
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
export default Kisumu;
