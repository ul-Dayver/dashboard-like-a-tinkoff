import { makeObservable, observable, runInAction } from "mobx"

export type TOrderItem = {
  uid:1,
  title: string,
  qty: number, 
  price: number, 
  amount: number
}

export type TOrder = {
  uid: number,
  address: string, 
  amount: number, 
  counterparty: string,
  items: TOrderItem[]
}

class Store {
  orders: TOrder[] = []

  constructor() {
    makeObservable(this, {
      orders: observable
    })

    async function request() {
      const response = await fetch("/orders.json");
      if (response.ok) 
        return await response.json();
      return []
    }
    request().then(orders => {
      runInAction(() => this.orders = orders)
    })
  }
}

const myStore = new Store()

export default myStore 