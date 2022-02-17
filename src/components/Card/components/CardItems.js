import React from "react";
import { numberWithCommas } from "../../Home/components/NumberFormat";
function CardItems({ cases, deaths, recovered }) {
  return (
    <>
      <tr>
        <td>Cases: </td>
        <td>{numberWithCommas(cases)}</td>
      </tr>
      <tr>
        <td>Deaths: </td>
        <td>{numberWithCommas(deaths)}</td>
      </tr>
      <tr>
        <td>Recovered: </td>
        <td>{numberWithCommas(recovered)}</td>
      </tr>
    </>
  );
}

export default CardItems;
