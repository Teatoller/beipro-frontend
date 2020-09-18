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

export const EldGraphs = () => {
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

  const eldData = frontOffices.filter(object => object.location === "Eldoret");
  return (
    <>
      <h1 className="h6">Eldoret</h1>
      <span>{loading ? <Spinner /> : null}</span>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={eldData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="diesel" stroke="#FFC200" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="petrol" stroke="#FF0000" />
          <Line type="monotone" dataKey="kerosene" stroke="#4a9540" />
          <Line type="monotone" dataKey="ido" stroke="#42fa5e" />
          <Line type="monotone" dataKey="fo" stroke="#494c4f" />
          <Line type="monotone" dataKey="lpg" stroke="#50a6e1" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
export default EldGraphs;
