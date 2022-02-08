import React from "react";
import millify from "millify";
import { Collapse, Col, Typography, Avatar } from "antd";
import HTMLReactParser from "html-react-parser";

import { useGetExchangesQuery } from "../../services/exchangesApi";
import Loader from "../Loader";

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();

  console.log(data);

  if (isFetching) return <Loader />;

  // Function to order the array of Exchanges by decreasing 24h trade volume on BTC //S
  function compare(a, b) {
    const rankA = a.trust_score_rank;
    const rankB = b.trust_score_rank;

    let comparison = 0;
    if (rankA > rankB) {
      comparison = +1;
    } else if (rankA < rankB) {
      comparison = -1;
    }
    return comparison;
  }

  // Get rid of Invalid Data //
  const noNull = data.filter((item) => item.trust_score_rank !== null);
  const dataSortedAnFiltered = noNull.sort(compare).slice(0, 50);

  // console.log(dataSortedAnFiltered, "sorted data");

  return (
    <div className="container-padding">
      <div className="exchanges-row row-title">
        <div className="exchanges-col col-title">Exchanges</div>
        <div className="exchanges-col col-title">Trust Score Rank</div>
        <div className="exchanges-col col-title">Trust Score</div>
        <div className="exchanges-col col-title">24h Trade Volume</div>
      </div>
      <div>
        {dataSortedAnFiltered.map((exchange, i) => (
          <Col span={24} key={exchange.id}>
            <Collapse>
              <Panel
                showArrow={false}
                header={
                  <div className="exchanges-row">
                    <div className="exchanges-col">
                      <Text>
                        <strong>{i + 1}.</strong>
                      </Text>
                      <Avatar className="exchange-image" src={exchange.image} />
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </div>
                    <div className="exchanges-col">
                      {exchange.trust_score_rank}
                    </div>
                    <div className="exchanges-col">{exchange.trust_score}</div>
                    <div className="exchanges-col">
                      ${millify(exchange.trade_volume_24h_btc)}
                    </div>
                  </div>
                }
              >
                {HTMLReactParser(
                  exchange.description ||
                    `Company established in ${exchange.country}. ${exchange.name} was created in ${exchange.year_established}.`
                )}
                <p>
                  You can get more information on the{" "}
                  <a
                    href={exchange.url}
                    target="_blank"
                    rel="noreferrer"
                  >{`${exchange.name} website`}</a>
                  .
                </p>
              </Panel>
            </Collapse>
          </Col>
        ))}
      </div>
    </div>
  );
};

export default Exchanges;
