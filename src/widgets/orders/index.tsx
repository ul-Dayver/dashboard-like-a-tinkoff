import React from "react";
//import { observer } from 'mobx-react'
import myStore, { TOrder} from "../../store"
import { createWidget } from "../../dashboard/widgets";

const Order = React.memo(function Order(props: TOrder) {
  return (
    <tr>
      <td>{props.address}</td>
      <td>{props.counterparty}</td>
      <td>{props.amount}</td>
    </tr>
  )
})

function Orders (){
  return (
    <table style={{color: "#fff"}}>
      <thead>
        <tr><th>Адрес</th><th>Контрагент</th><th>Сумма</th></tr>
      </thead>
      <tbody>
        { myStore.orders.map((order: TOrder) => <Order key={order.uid} {...order}/>) }
      </tbody>
    </table>
  )
}

export default createWidget("Заказы", { width: 550 }, Orders)