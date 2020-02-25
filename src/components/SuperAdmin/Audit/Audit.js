import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios";
import Nav from "../../Landing/Nav";
import Footer from "../../Landing/Footer";
import Spinner from "../../../spinner/Spinner";
import Pagination from "../../Pagination";

class Audit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      audits: [],
      activePage: "1",
      itemCountPerPage: "12"
    };
  }

  componentDidMount() {
    this.getAuditsData();
  }

  getAuditsData = () => {
    axios.get(`/audits`, {}).then(response => {
      const auditData = response.data;
      this.setState({
        audits: auditData,
        loading: false
      });
    });
  };

  handleViewClick = e => {
    const { history } = this.props;

    e.preventDefault();
    const attribute = e.currentTarget;
    const auditid = attribute.getAttribute("auditid");
    localStorage.setItem("auditid", auditid);

    history.push("/auditview");
  };

  render() {
    const { audits, loading } = this.state;

    const beiproAudit = audits.map((item, index) => {
      return (
        <tr key={item.id}>
          <td className="audit">{index + 1}</td>
          <td className="audit">{item.event}</td>
          <td className="audit">{item.auditable_type}</td>
          <td className="audit">{item.auditable_id}</td>
          <td className="audit">{item.old_values}</td>
          <td className="audit">{item.new_values}</td>
          <td className="audit">{item.tags}</td>
          <td className="audit">
            <button
              className="btn btn-sm btn-outline-info"
              type="button"
              auditid={item.id}
              onClick={this.handleViewClick}
            >
              View
            </button>
          </td>
        </tr>
      );
    });

    const { activePage, itemCountPerPage } = this.state;
    // Get current items
    const indexOfLastItem = activePage * itemCountPerPage;
    const indexOfFirstItem = indexOfLastItem - itemCountPerPage;
    const currentItems = beiproAudit.slice(indexOfFirstItem, indexOfLastItem);

    // Change page

    const paginate = pageNumber => {
      this.setState({
        activePage: pageNumber
      });
    };

    return (
      <div>
        <Nav />

        <div className="container">
          <div className="row">
            <span>{loading ? <Spinner /> : null}</span>
            <div className="col-sm">
              <h6>Admin details</h6>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Event</th>
                    <th scope="col">Auditable_type</th>
                    <th scope="col">Auditable_id</th>
                    <th scope="col">Old_values</th>
                    <th scope="col">New_values</th>
                    <th scope="col">Tags</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>{currentItems}</tbody>
              </table>
            </div>
          </div>
          <Pagination
            itemCountPerPage={itemCountPerPage}
            totalItems={beiproAudit.length}
            paginate={paginate}
          />
        </div>

        <Footer />
      </div>
    );
  }
}
Audit.propTypes = {
  history: PropTypes.shape().isRequired
};
export default Audit;
