import React, { memo, useCallback } from "react";
import { Col } from "antd";
import { useDispatch } from "react-redux";
import { Offer } from "@spanic/react-interview-components";
import { changeSelectedQty } from "../../../store/offers-slice";

export default memo(function OfferWrapper({ qty, offer }) {
  const dispatch = useDispatch();

  const handleChangeQty = useCallback((newQty) => {
    dispatch(changeSelectedQty({ id: offer.id, newQty }));
  }, [dispatch, offer.id]);

  return (
    <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
      <Offer
        data={offer}
        multiple={true}
        selectedQty={qty}
        onChangeQty={handleChangeQty}
      />
    </Col>
  );
});