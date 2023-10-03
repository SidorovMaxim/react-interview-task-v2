import React, { useEffect } from "react";
import { Empty, Row, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffers } from "../../../thunks/offers.thunks";
import styled from "styled-components";
import OfferWrapper from "./OfferWrapper";

export default function OffersList() {
  const dispatch = useDispatch();

  const { offers, offersQty, loading } = useSelector((state) => state.offers);

  useEffect(() => {
    const promise = dispatch(fetchOffers());
    return () => promise.abort();
  }, [dispatch]);

  if (loading) {
    return (
      <SpinContainer>
        <Spin />
      </SpinContainer>
    );
  }

  return offers.length ? (
    <Row gutter={[16, 16]}>
      {offers.map((offer) => (
        <OfferWrapper
          key={offer.id}
          qty={offersQty[offer.id]}
          offer={offer}
        />
      ))}
    </Row>
  ) : (
    <Empty />
  );
}

const SpinContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;
