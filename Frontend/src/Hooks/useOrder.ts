import { formatToMoney } from "helpers/formatToMoney";
import { useEffect, useState } from "react"
import { ILista } from "types-yola";

interface props {
 list: ILista
}

export const useOrder = ({list}: props) => {
 const [subTotal, setSubTotal] = useState(0);
 const [delivery, setDelivery] = useState(0);

  const getSubTotal = (data:ILista) => {
   let result =  data.itemsLista.reduce((acc, curr) => {
     const mountPerProduct = curr.cantidades.reduce((accq, q) => {
       return accq + q.cantidad * q.precio
     }, 0)

     return acc + mountPerProduct
   }, 0)

   return formatToMoney(result)
 }

 const getDelivery = (subTotal:number): number => {
  if(subTotal <= 30) return 2;
  return 0;
 }

 const getMountTotal = (subTotal:number,delivery:number) => {
   return formatToMoney(subTotal + delivery)
 }

 useEffect(()=>{
  if(list) setSubTotal(getSubTotal(list))
 },[list])

 useEffect(()=>{
  setDelivery(getDelivery(subTotal))
 },[subTotal])



 return {
  subTotal,
  delivery,
  total: getMountTotal(subTotal, delivery)
 }
}