import React from "react";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line
import Chart from "chart.js/auto";
import { Col, Row, Typography } from "antd";

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName, timePeriod }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  const getDate = (date) => {
    const milliseconds = date * 1000;
    const dateObject = new Date(milliseconds);
    if (timePeriod === "3h" || timePeriod === "24h") {
      const shortTimeOptions = {
        hours: "2-digit",
        minutes: "2-digit",
        seconds: "2-digit",
      };
      return date ? dateObject.toLocaleString("en-GB", shortTimeOptions) : "";
    }
    const options = {
      day: "numeric",
      month: "short",
      year: "2-digit",
    };
    return date ? dateObject.toLocaleString("en-GB", options) : "";
  };

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinPrice.push(coinHistory.data.history[i].price);
    coinTimestamp.push(getDate(coinHistory.data.history[i].timestamp));
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        borderColor: "#0071BD",
        backgroundColor: "#0071BD",
      },
    ],
  };
  const options = {
    responsive: true,
    scales: {
      x: {
        reverse: true,
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="current-change">
            {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line options={options} data={data} />
    </>
  );
};

export default LineChart;
