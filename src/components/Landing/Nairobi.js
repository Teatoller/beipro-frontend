import React, { PureComponent } from "react";
import axios from "../../axios";
import "../css/styles.css";

class Nairobi extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      frontoffices: []
    };
  }

  componentDidMount() {
    this.getFrontofficeData();
  }

  getFrontofficeData = () => {
    try {
      axios.get(`/depotprices`, {}).then(response => {
        const data = response.data;
        this.setState({
          frontoffices: data
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { frontoffices } = this.state;

    /**
     * Steps
     * 1. Filter and create array for Nairobi location
     * 2. Separate the Nairobi location prices by company.
     * 3. Sort each company front office prices by id decending i.e big to small
     * 4. Extract the most recent addition/latest which will be the one with the highest id
     * 5. Create a combined array for Nairobi Location front offices.
     * 6. iterate the front office and product fields using the new combined array
     *
     */

    /**
     * Step 1: Filter and create array for Nairobi location
     */
    const nairobiFront = frontoffices.filter(object => object.location === "Nairobi");

    /**
     * Step 2. Separate the Nairobi location prices by company.
     */

    const vivonrb = nairobiFront.filter(object => object.name === "Vivo Energy");
    const totalnrb = nairobiFront.filter(object => object.name === "Total Kenya");
    const olanrb = nairobiFront.filter(object => object.name === "Oil Libya");
    const kenolnrb = nairobiFront.filter(object => object.name === "Kenol Kobil");
    const hashnrb = nairobiFront.filter(object => object.name === "Hashi Energy");
    const galananrb = nairobiFront.filter(object => object.name === "Galana");

    /**
     * 3. Sort each company front office prices by id decending i.e big to small
     * 4. Extract the newest or most recent entry.
     * 5. Create a new combined array
     */

    // new combined array
    const nrbprices = [];

    const sortbyid = vivonrb.sort((c1, c2) => (c1.id > c2.id ? 1 : -1)).pop();
    nrbprices.push(sortbyid);

    const sortbynrb = totalnrb.sort((c1, c2) => (c1.id > c2.id ? 1 : -1)).pop();
    nrbprices.push(sortbynrb);

    const sortbyola = olanrb.sort((c1, c2) => (c1.id > c2.id ? 1 : -1)).pop();
    nrbprices.push(sortbyola);

    const sortbykenol = kenolnrb.sort((c1, c2) => (c1.id > c2.id ? 1 : -1)).pop();
    nrbprices.push(sortbykenol);

    const sortbyhashi = hashnrb.sort((c1, c2) => (c1.id > c2.id ? 1 : -1)).pop();
    nrbprices.push(sortbyhashi);

    const sortbygal = galananrb.sort((c1, c2) => (c1.id > c2.id ? 1 : -1)).pop();
    nrbprices.push(sortbygal);

    /**
     * Step 6. iterate the front office and product fields using the new combined array
     */
    // console.log("combined array..", nrbprices);

    const nrbItems = nrbprices.map(item => {
      // { item }
      console.log("lala salama..", item);

      return (
        <tr>
          <td>#testing</td>
          <td>item.name</td>
          <td>item.diesel</td>
          <td>item.petrol</td>
          <td>item.kerosene</td>
          <td>item.ido</td>
          <td>item.fo</td>
          <td>item.lpg</td>
        </tr>
      );
    });

    console.log("..........", nrbItems);

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
              <tbody>{nrbItems}</tbody>
            </table>
          </div>
        </main>

        <footer className="footer-register">
          <span>Beipro &copy;2018</span>
        </footer>
      </div>
    );
  }
}
export default Nairobi;
