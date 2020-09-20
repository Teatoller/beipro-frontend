import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import axios from "../../axios";
import BearerToken from "../../services/BearerToken";
import { Spinner } from "../../spinner/Spinner";

export const KsmGraphs = () => {
  const [loading, setLoading] = useState(false);
  const [, setErrors] = useState(false);
  const [frontOffices, setFrontOffices] = useState([]);

  const getFrontofficeData = () => {
    setLoading(true);
    const config = BearerToken();

    try {
      axios.get(`/depotprices`, config).then(response => {
        if (response) {
          const { data } = response;
          setFrontOffices(data);
          setLoading(false);
        }
      });
    } catch (err) {
      setErrors(err.response.request.response);
      setLoading(false);
    }
  };
  useEffect(() => {
    getFrontofficeData();
  }, []);

  const ksmData = frontOffices.filter(object => object.location === "Kisumu");
  return (
    <>
      <h1 className="h6 text-center text-secondary">Kisumu</h1>
      <span>{loading ? <Spinner /> : null}</span>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={ksmData}
          margin={{
            top: 1,
            right: 1,
            left: -15,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: "10px", marginTop: "8px" }}
            label={{ value: "OMC's", position: "Bottom", dy: 10 }}
          />
          <YAxis
            label={{ value: "ksh/lt", position: "insideLeft", angle: -90, dx: 15 }}
            tick={{ fontSize: "10px", marginTop: "8px" }}
          />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="diesel" stroke="#FFC200" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="petrol" stroke="#FF0000" strokeDasharray="4 1 1 4" />
          <Line type="monotone" dataKey="kerosene" stroke="#4a9540" />
          <Line type="monotone" dataKey="ido" stroke="#42fa5e" />
          <Line type="monotone" dataKey="fo" stroke="#494c4f" strokeDasharray="4 2 4 1 1" />
          <Line type="monotone" dataKey="lpg" stroke="#50a6e1" strokeDasharray="3 4 5 2" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
export default KsmGraphs;
