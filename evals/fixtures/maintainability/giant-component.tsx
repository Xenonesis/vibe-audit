export function CheckoutPage(){
  // fixture sketch: rendering + auth + fetch + pricing + payment + formatting mixed together
  const user:any = {id:'x'};
  function validate(v:any){ return !!v.email; }
  async function load(){ return fetch('/api/cart').then(r=>r.json()); }
  async function pay(total:number){ return fetch('/api/pay',{method:'POST',body:JSON.stringify({total})}); }
  return <main>{user.id}<button onClick={()=>pay(100)}>Pay</button></main>;
}
